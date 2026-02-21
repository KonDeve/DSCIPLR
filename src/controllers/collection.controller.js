import { CollectionModel } from '@/models';

const VALID_STATUSES = [
  'recorded',
  'validated',
  'pending_clearance',
  'cleared',
  'syncing',
  'confirmed',
  'rejected',
  'refunded',
];

const VALID_PAYMENT_METHODS = [
  'cash',
  'check',
  'online_transfer',
  'credit_card',
  'gcash',
  'maya',
  'bank_deposit',
];

export const CollectionController = {
  // ── List ──────────────────────────────────────────────────────────────────

  /**
   * Return a paginated, filtered list of collections.
   * @param {Object} filters - see CollectionModel.getCollections for options
   * @returns {{ data: Array, count: number, totalPages: number }}
   */
  async getCollections(filters = {}) {
    const { data, error, count, totalPages } = await CollectionModel.getCollections(filters);
    if (error) throw new Error(error.message);
    return { data, count, totalPages };
  },

  // ── Detail ────────────────────────────────────────────────────────────────

  /**
   * Return a single collection with full related data.
   * @param {string} id - collection UUID
   */
  async getCollectionById(id) {
    if (!id) throw new Error('Collection ID is required.');
    const { data, error } = await CollectionModel.getCollectionById(id);
    if (error) throw new Error(error.message);
    if (!data) throw new Error('Collection record not found.');
    return data;
  },

  // ── Timeline ──────────────────────────────────────────────────────────────

  /**
   * Return the ordered status timeline for a collection.
   * @param {string} collectionId - collection UUID
   */
  async getTimeline(collectionId) {
    if (!collectionId) throw new Error('Collection ID is required.');
    const { data, error } = await CollectionModel.getTimeline(collectionId);
    if (error) throw new Error(error.message);
    return data;
  },

  // ── Record New Collection ─────────────────────────────────────────────────

  /**
   * Validate and persist a new collection record.
   * @param {Object} opts
   * @param {string}  opts.donorName        - free-text donor name (if not a member)
   * @param {string}  opts.memberId         - UUID of the member record (optional)
   * @param {string}  opts.collectionTypeId - UUID of the collection type
   * @param {number}  opts.amount           - contribution amount in PHP
   * @param {string}  opts.paymentMethod    - one of VALID_PAYMENT_METHODS
   * @param {string}  opts.dateReceived     - ISO date string (YYYY-MM-DD)
   * @param {string}  opts.donorNotes       - optional message from the donor
   * @param {string}  opts.internalNotes    - optional internal note
   * @param {string}  opts.recordedBy       - UUID of the user saving the record
   * @param {string}  opts.eventId          - UUID of an associated event (optional)
   */
  async recordCollection({
    donorName,
    memberId,
    collectionTypeId,
    amount,
    paymentMethod,
    dateReceived,
    donorNotes,
    internalNotes,
    recordedBy,
    eventId,
  }) {
    // Validation
    if (!donorName && !memberId) {
      throw new Error('A donor name or linked member is required.');
    }
    if (!amount || Number(amount) <= 0) {
      throw new Error('A valid contribution amount greater than zero is required.');
    }
    if (!collectionTypeId) {
      throw new Error('Account category (collection type) is required.');
    }
    if (!paymentMethod) {
      throw new Error('Payment method is required.');
    }
    if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      throw new Error(
        `Invalid payment method. Accepted values: ${VALID_PAYMENT_METHODS.join(', ')}.`
      );
    }
    if (!dateReceived) {
      throw new Error('Date received is required.');
    }

    const payload = {
      donor_name:         donorName || null,
      member_id:          memberId  || null,
      collection_type_id: collectionTypeId,
      amount:             Number(amount),
      currency:           'PHP',
      payment_method:     paymentMethod,
      date_received:      dateReceived,
      donor_notes:        donorNotes    || null,
      internal_notes:     internalNotes || null,
      recorded_by:        recordedBy    || null,
      event_id:           eventId       || null,
      status:             'recorded',
    };

    const { data, error } = await CollectionModel.createCollection(payload);
    if (error) throw new Error(error.message);
    return data;
  },

  // ── Update Status ─────────────────────────────────────────────────────────

  /**
   * Update the status of an existing collection and log the change.
   * @param {string} id     - collection UUID
   * @param {string} status - must be one of VALID_STATUSES
   * @param {Object} opts
   * @param {string} opts.notes     - reason or note for the status change
   * @param {string} opts.updatedBy - UUID of the user making the change
   */
  async updateStatus(id, status, { notes, updatedBy } = {}) {
    if (!id)     throw new Error('Collection ID is required.');
    if (!status) throw new Error('New status is required.');
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(
        `Invalid status. Accepted values: ${VALID_STATUSES.join(', ')}.`
      );
    }

    const { data, error } = await CollectionModel.updateStatus(id, status, { notes, updatedBy });
    if (error) throw new Error(error.message);
    return data;
  },

  // ── Summary / Stats ───────────────────────────────────────────────────────

  /**
   * Return aggregate stats for the summary cards.
   * @param {{ from?: string, to?: string }} dateRange - optional ISO date strings
   * @returns {{ totalVolume, activeDonors, digitalMix, avgPerRecord, totalRecords }}
   */
  async getCollectionSummary(dateRange = {}) {
    const { data, error } = await CollectionModel.getCollectionSummary(dateRange);
    if (error) throw new Error(error.message);
    return data;
  },

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Fetch all active collection types for the form dropdown.
   * @returns {Array<{ id, name, color }>}
   */
  async getCollectionTypes() {
    const { data, error } = await CollectionModel.getCollectionTypes();
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Search active members by name for the donor autocomplete field.
   * Returns an empty array when the query is shorter than 2 characters.
   * @param {string} query - partial name
   * @returns {Array<{ id, member_id, full_name, member_type }>}
   */
  async searchDonors(query) {
    if (!query || query.trim().length < 2) return [];
    const { data, error } = await CollectionModel.searchDonors(query.trim());
    if (error) throw new Error(error.message);
    return data;
  },
};
