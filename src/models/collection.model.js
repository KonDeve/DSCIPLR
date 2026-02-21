import { supabase } from '@/config/supabaseClient';

const PAGE_SIZE = 10;

export const CollectionModel = {
  // ── Collections List ──────────────────────────────────────────────────────

  /**
   * Fetch a paginated, filtered list of collection records.
   * @param {Object} opts
   * @param {number}  opts.page          - 1-based page number (default 1)
   * @param {number}  opts.limit         - rows per page (default PAGE_SIZE)
   * @param {Object}  opts.dateRange     - { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
   * @param {string}  opts.category      - collection_type_id UUID
   * @param {string}  opts.paymentMethod - payment_method value
   * @param {string}  opts.status        - status value
   */
  async getCollections({
    page = 1,
    limit = PAGE_SIZE,
    dateRange,
    category,
    paymentMethod,
    status,
  } = {}) {
    let query = supabase
      .from('collections')
      .select(
        `
        id,
        reference_number,
        donor_name,
        is_anonymous,
        amount,
        payment_method,
        status,
        date_received,
        donor_notes,
        member:members ( id, member_id, full_name, member_type ),
        collection_type:collection_types ( id, name, color )
        `,
        { count: 'exact' }
      )
      .order('date_received', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (category)      query = query.eq('collection_type_id', category);
    if (paymentMethod) query = query.eq('payment_method', paymentMethod);
    if (status)        query = query.eq('status', status);
    if (dateRange?.from) query = query.gte('date_received', dateRange.from);
    if (dateRange?.to)   query = query.lte('date_received', dateRange.to);

    const { data, error, count } = await query;
    return {
      data,
      error,
      count,
      totalPages: Math.ceil((count || 0) / limit),
    };
  },

  // ── Collection Detail ─────────────────────────────────────────────────────

  /**
   * Fetch a single collection record with all related data.
   * @param {string} id - collection UUID
   */
  async getCollectionById(id) {
    const { data, error } = await supabase
      .from('collections')
      .select(
        `
        *,
        member:members ( id, member_id, full_name, member_type ),
        collection_type:collection_types ( id, name, color ),
        fund_category:fund_categories ( id, code, name )
        `
      )
      .eq('id', id)
      .single();
    return { data, error };
  },

  // ── Timeline ──────────────────────────────────────────────────────────────

  /**
   * Fetch the full status timeline for a collection.
   * @param {string} collectionId - collection UUID
   */
  async getTimeline(collectionId) {
    const { data, error } = await supabase
      .from('collection_timeline')
      .select(
        `
        id,
        status,
        status_date,
        notes,
        updated_by_user:users ( id, first_name, last_name )
        `
      )
      .eq('collection_id', collectionId)
      .order('status_date', { ascending: true });
    return { data, error };
  },

  /**
   * Append a new timeline entry to a collection.
   * @param {string} collectionId
   * @param {Object} opts
   * @param {string} opts.status
   * @param {string} opts.notes
   * @param {string} opts.updatedBy - user UUID
   */
  async addTimelineEntry(collectionId, { status, notes, updatedBy }) {
    const { data, error } = await supabase
      .from('collection_timeline')
      .insert({
        collection_id: collectionId,
        status,
        notes: notes || null,
        updated_by: updatedBy || null,
      })
      .select()
      .single();
    return { data, error };
  },

  // ── Create Collection ─────────────────────────────────────────────────────

  /**
   * Insert a new collection record and seed its first timeline entry.
   * @param {Object} payload - maps to the `collections` table columns
   */
  async createCollection(payload) {
    const { data, error } = await supabase
      .from('collections')
      .insert(payload)
      .select()
      .single();

    // Seed "Recorded" timeline entry automatically
    if (!error && data) {
      await supabase.from('collection_timeline').insert({
        collection_id: data.id,
        status: 'Recorded',
        notes: 'Collection entry created.',
        updated_by: payload.recorded_by || null,
      });
    }

    return { data, error };
  },

  // ── Update Status ─────────────────────────────────────────────────────────

  /**
   * Update the status of a collection and append a timeline entry.
   * @param {string} id     - collection UUID
   * @param {string} status - new status value
   * @param {Object} opts
   * @param {string} opts.notes      - reason / note for the change
   * @param {string} opts.updatedBy  - user UUID
   */
  async updateStatus(id, status, { notes, updatedBy } = {}) {
    const updatePayload = {
      status,
      updated_at: new Date().toISOString(),
    };

    // Auto-fill clearance date when a check is confirmed cleared
    if (status === 'cleared') {
      updatePayload.date_cleared = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('collections')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (!error) {
      await supabase.from('collection_timeline').insert({
        collection_id: id,
        status,
        notes: notes || null,
        updated_by: updatedBy || null,
      });
    }

    return { data, error };
  },

  // ── Summary Stats ─────────────────────────────────────────────────────────

  /**
   * Compute aggregate statistics for the summary cards.
   * Only counts records with a confirmed/cleared/validated status.
   * @param {Object} opts
   * @param {string} opts.from - ISO date string
   * @param {string} opts.to   - ISO date string
   */
  async getCollectionSummary({ from, to } = {}) {
    let query = supabase
      .from('collections')
      .select('amount, payment_method, member_id, date_received')
      .in('status', ['confirmed', 'cleared', 'validated']);

    if (from) query = query.gte('date_received', from);
    if (to)   query = query.lte('date_received', to);

    const { data, error } = await query;
    if (error) return { data: null, error };

    const totalVolume  = data.reduce((sum, r) => sum + Number(r.amount), 0);
    const activeDonors = new Set(data.map((r) => r.member_id).filter(Boolean)).size;

    const digitalMethods = new Set(['online_transfer', 'credit_card', 'gcash', 'maya']);
    const digitalCount   = data.filter((r) => digitalMethods.has(r.payment_method)).length;
    const digitalMix     = data.length > 0 ? Math.round((digitalCount / data.length) * 100) : 0;
    const avgPerRecord   = data.length > 0 ? totalVolume / data.length : 0;

    return {
      data: { totalVolume, activeDonors, digitalMix, avgPerRecord, totalRecords: data.length },
      error: null,
    };
  },

  // ── Collection Types Dropdown ─────────────────────────────────────────────

  /**
   * Fetch all active collection types for use in dropdowns.
   */
  async getCollectionTypes() {
    const { data, error } = await supabase
      .from('collection_types')
      .select('id, name, color')
      .eq('is_active', true)
      .order('name', { ascending: true });
    return { data, error };
  },

  // ── Donor / Member Search ─────────────────────────────────────────────────

  /**
   * Search active members by name for the donor autocomplete field.
   * @param {string} searchQuery - partial name string
   */
  async searchDonors(searchQuery) {
    const { data, error } = await supabase
      .from('members')
      .select('id, member_id, full_name, member_type')
      .ilike('full_name', `%${searchQuery}%`)
      .eq('status', 'active')
      .limit(10);
    return { data, error };
  },
};
