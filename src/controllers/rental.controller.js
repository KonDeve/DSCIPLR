import { RentalModel } from '@/models';

const VALID_PAYMENT_METHODS = [
  'cash',
  'check',
  'online_transfer',
  'gcash',
  'maya',
  'bank_deposit',
  'credit_card',
];

const VALID_PAYMENT_STATUSES = [
  'pending',
  'partial',
  'paid',
  'overdue',
  'refunded',
];

export const RentalController = {
  // ── List ──────────────────────────────────────────────────────────────────

  /**
   * Return a paginated, filtered list of rental bookings.
   * @param {Object} filters - see RentalModel.getRentals for options
   * @returns {{ data: Array, count: number, totalPages: number }}
   */
  async getRentals(filters = {}) {
    const { data, error, count, totalPages } = await RentalModel.getRentals(filters);
    if (error) throw new Error(error.message);
    return { data, count, totalPages };
  },

  // ── Detail ────────────────────────────────────────────────────────────────

  /**
   * Return a single rental booking with full related data.
   * @param {string} id - rental_bookings UUID
   */
  async getRentalById(id) {
    if (!id) throw new Error('Rental booking ID is required.');
    const { data, error } = await RentalModel.getRentalById(id);
    if (error) throw new Error(error.message);
    if (!data) throw new Error('Rental booking not found.');
    return data;
  },

  // ── Record Payment ────────────────────────────────────────────────────────

  /**
   * Validate and persist a rental payment.
   * Updates the parent booking's amount_paid and payment_status automatically.
   *
   * @param {Object} opts
   * @param {string}  opts.bookingId      - rental_bookings UUID (required)
   * @param {number}  opts.amount         - payment amount (required, > 0)
   * @param {string}  opts.paymentMethod  - one of VALID_PAYMENT_METHODS (required)
   * @param {string}  opts.paymentDate    - ISO date YYYY-MM-DD (required)
   * @param {string}  opts.referenceNumber - optional reference / check number
   * @param {string}  opts.notes          - optional notes
   * @param {string}  opts.receivedBy     - UUID of the user recording the payment
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
    if (!bookingId) {
      throw new Error('A rental booking reference is required.');
    }
    if (!amount || Number(amount) <= 0) {
      throw new Error('A valid payment amount greater than zero is required.');
    }
    if (!paymentMethod) {
      throw new Error('Payment method is required.');
    }
    if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      throw new Error(
        `Invalid payment method. Accepted values: ${VALID_PAYMENT_METHODS.join(', ')}.`
      );
    }
    if (!paymentDate) {
      throw new Error('Transaction date is required.');
    }

    const { data, error } = await RentalModel.recordPayment({
      bookingId,
      amount: Number(amount),
      paymentMethod,
      paymentDate,
      referenceNumber: referenceNumber || null,
      notes:           notes           || null,
      receivedBy:      receivedBy      || null,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  // ── Summary / Stats ───────────────────────────────────────────────────────

  /**
   * Return aggregate stats for the summary cards.
   * @param {{ from?: string, to?: string }} dateRange - optional ISO date strings
   * @returns {{ totalIncome, pendingTotal, pendingCount, utilizationRate }}
   */
  async getRentalSummary(dateRange = {}) {
    const { data, error } = await RentalModel.getRentalSummary(dateRange);
    if (error) throw new Error(error.message);
    return data;
  },

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Fetch all available rental assets for dropdowns.
   * @returns {Array<{ id, name, asset_type, rental_rate_per_day, rental_rate_per_hour }>}
   */
  async getAssets() {
    const { data, error } = await RentalModel.getAssets();
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Fetch open (active) bookings for a member for the rental reference dropdown.
   * Returns empty array when no memberId is provided.
   * @param {string} memberId - members UUID
   * @returns {Array<{ id, booking_reference, booking_date, total_amount, amount_paid, payment_status, asset }>}
   */
  async getOpenBookingsByMember(memberId) {
    if (!memberId) return [];
    const { data, error } = await RentalModel.getOpenBookingsByMember(memberId);
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Search active members by name for the renter autocomplete field.
   * Returns an empty array when query is shorter than 2 characters.
   * @param {string} query - partial name
   * @returns {Array<{ id, member_id, full_name, member_type }>}
   */
  async searchRenters(query) {
    if (!query || query.trim().length < 2) return [];
    const { data, error } = await RentalModel.searchRenters(query.trim());
    if (error) throw new Error(error.message);
    return data;
  },
};
