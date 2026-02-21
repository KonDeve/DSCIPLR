import { supabase } from '@/config/supabaseClient';

const PAGE_SIZE = 10;

export const RentalModel = {
  // ── Rental Bookings List ──────────────────────────────────────────────────

  /**
   * Fetch a paginated, filtered list of rental bookings.
   * @param {Object} opts
   * @param {number}  opts.page          - 1-based page number (default 1)
   * @param {number}  opts.limit         - rows per page (default PAGE_SIZE)
   * @param {Object}  opts.dateRange     - { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
   * @param {string}  opts.assetType     - rental_assets.asset_type value
   * @param {string}  opts.paymentStatus - payment_status value
   */
  async getRentals({
    page = 1,
    limit = PAGE_SIZE,
    dateRange,
    assetType,
    paymentStatus,
  } = {}) {
    let query = supabase
      .from('rental_bookings')
      .select(
        `
        id,
        booking_reference,
        renter_name,
        rental_amount,
        deposit_amount,
        total_amount,
        amount_paid,
        payment_status,
        booking_status,
        booking_date,
        start_datetime,
        end_datetime,
        date_paid,
        notes,
        member:members ( id, member_id, full_name ),
        asset:rental_assets ( id, name, asset_type )
        `,
        { count: 'exact' }
      )
      .order('booking_date', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (paymentStatus) query = query.eq('payment_status', paymentStatus);
    if (dateRange?.from) query = query.gte('booking_date', dateRange.from);
    if (dateRange?.to)   query = query.lte('booking_date', dateRange.to);
    if (assetType) {
      // Filter via the related asset  (PostgREST foreign table filter)
      query = query.eq('asset.asset_type', assetType);
    }

    const { data, error, count } = await query;
    return {
      data,
      error,
      count,
      totalPages: Math.ceil((count || 0) / limit),
    };
  },

  // ── Single Booking ────────────────────────────────────────────────────────

  /**
   * Fetch a single rental booking with asset info and all payments.
   * @param {string} id - rental_bookings UUID
   */
  async getRentalById(id) {
    const { data, error } = await supabase
      .from('rental_bookings')
      .select(
        `
        *,
        member:members ( id, member_id, full_name, member_type ),
        asset:rental_assets ( id, name, asset_type, description ),
        payments:rental_payments (
          id,
          amount,
          payment_method,
          payment_date,
          reference_number,
          notes
        )
        `
      )
      .eq('id', id)
      .single();
    return { data, error };
  },

  // ── Record Rental Payment ─────────────────────────────────────────────────

  /**
   * Insert a new rental_payments row and update the booking's
   * amount_paid + payment_status in a single logical operation.
   * @param {Object} payload
   * @param {string}  payload.bookingId     - rental_bookings UUID
   * @param {number}  payload.amount        - amount being paid now
   * @param {string}  payload.paymentMethod - payment method
   * @param {string}  payload.paymentDate   - ISO date (YYYY-MM-DD)
   * @param {string}  payload.referenceNumber - optional ref
   * @param {string}  payload.notes         - optional notes
   * @param {string}  payload.receivedBy    - user UUID
   */
  async recordPayment({
    bookingId,
    amount,
    paymentMethod,
    paymentDate,
    referenceNumber,
    notes,
    receivedBy,
  }) {
    // 1. Insert the payment row
    const { data: payment, error: paymentError } = await supabase
      .from('rental_payments')
      .insert({
        booking_id:       bookingId,
        amount:           Number(amount),
        payment_method:   paymentMethod,
        payment_date:     paymentDate,
        reference_number: referenceNumber || null,
        notes:            notes          || null,
        received_by:      receivedBy     || null,
      })
      .select()
      .single();

    if (paymentError) return { data: null, error: paymentError };

    // 2. Re-fetch the booking to compute new amount_paid
    const { data: booking, error: bookingFetchError } = await supabase
      .from('rental_bookings')
      .select('total_amount, amount_paid')
      .eq('id', bookingId)
      .single();

    if (bookingFetchError) return { data: payment, error: bookingFetchError };

    const newAmountPaid = Number(booking.amount_paid) + Number(amount);
    const totalAmount   = Number(booking.total_amount);

    let newPaymentStatus = 'partial';
    if (newAmountPaid >= totalAmount) {
      newPaymentStatus = 'paid';
    } else if (newAmountPaid === 0) {
      newPaymentStatus = 'pending';
    }

    // 3. Update the booking
    await supabase
      .from('rental_bookings')
      .update({
        amount_paid:    newAmountPaid,
        payment_status: newPaymentStatus,
        date_paid:      newPaymentStatus === 'paid' ? paymentDate : null,
        updated_at:     new Date().toISOString(),
      })
      .eq('id', bookingId);

    return { data: payment, error: null };
  },

  // ── Assets Dropdown ───────────────────────────────────────────────────────

  /**
   * Fetch all available rental assets for use in dropdowns.
   */
  async getAssets() {
    const { data, error } = await supabase
      .from('rental_assets')
      .select('id, name, asset_type, rental_rate_per_day, rental_rate_per_hour')
      .eq('is_available', true)
      .order('name', { ascending: true });
    return { data, error };
  },

  // ── Open Bookings for a Member (rental reference dropdown) ────────────────

  /**
   * Fetch active (non-completed, non-cancelled) bookings for a given member.
   * Used to populate the "Rental Reference" dropdown in the payment modal.
   * @param {string} memberId - members UUID
   */
  async getOpenBookingsByMember(memberId) {
    const { data, error } = await supabase
      .from('rental_bookings')
      .select(
        `
        id,
        booking_reference,
        booking_date,
        total_amount,
        amount_paid,
        payment_status,
        asset:rental_assets ( name )
        `
      )
      .eq('member_id', memberId)
      .not('booking_status', 'in', '("completed","cancelled")')
      .order('booking_date', { ascending: false });
    return { data, error };
  },

  // ── Renter / Member Search ────────────────────────────────────────────────

  /**
   * Search active members by name for the renter autocomplete field.
   * @param {string} searchQuery
   */
  async searchRenters(searchQuery) {
    const { data, error } = await supabase
      .from('members')
      .select('id, member_id, full_name, member_type')
      .ilike('full_name', `%${searchQuery}%`)
      .eq('status', 'active')
      .limit(10);
    return { data, error };
  },

  // ── Summary Stats ─────────────────────────────────────────────────────────

  /**
   * Compute aggregate stats for the summary cards.
   * @param {Object} opts
   * @param {string} opts.from - ISO date string
   * @param {string} opts.to   - ISO date string
   */
  async getRentalSummary({ from, to } = {}) {
    let query = supabase
      .from('rental_bookings')
      .select('total_amount, amount_paid, payment_status, rental_asset_id')
      .not('booking_status', 'eq', 'cancelled');

    if (from) query = query.gte('booking_date', from);
    if (to)   query = query.lte('booking_date', to);

    const { data, error } = await query;
    if (error) return { data: null, error };

    const totalIncome  = data
      .filter((r) => r.payment_status === 'paid')
      .reduce((sum, r) => sum + Number(r.total_amount), 0);

    const pendingTotal = data
      .filter((r) => ['partial', 'pending', 'overdue'].includes(r.payment_status))
      .reduce((sum, r) => sum + (Number(r.total_amount) - Number(r.amount_paid)), 0);

    const pendingCount = data.filter((r) =>
      ['partial', 'pending', 'overdue'].includes(r.payment_status)
    ).length;

    const uniqueAssets   = new Set(data.map((r) => r.rental_asset_id)).size;
    const utilizedAssets = new Set(
      data
        .filter((r) => ['paid', 'partial'].includes(r.payment_status))
        .map((r) => r.rental_asset_id)
    ).size;
    const utilizationRate = uniqueAssets > 0
      ? Math.round((utilizedAssets / uniqueAssets) * 100)
      : 0;

    return {
      data: { totalIncome, pendingTotal, pendingCount, utilizationRate },
      error: null,
    };
  },
};
