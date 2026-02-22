import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SlidersHorizontal,
  PlusCircle,
  CreditCard,
  Banknote,
  FileText,
  BarChart2,
  Users,
  PieChart,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { CollectionController } from '@/controllers';

/* ── Static demo data ─────────────────────────────────────── */
/* TODO: replace with live data once Supabase is connected.   */
/*       Real data is loaded via CollectionController.        */

const filters = [
  { label: 'Date Range', value: 'Last 30 Days', icon: <Calendar className="w-4 h-4 text-gray-400" /> },
  { label: 'Category', value: 'All Categories', icon: <ChevronDown className="w-4 h-4 text-gray-400" /> },
  { label: 'Payment Method', value: 'All Methods', icon: <ChevronDown className="w-4 h-4 text-gray-400" /> },
  { label: 'Status', value: 'All Records', icon: <ChevronDown className="w-4 h-4 text-gray-400" /> },
];

const categoryStyles = {
  Tithe: 'bg-blue-50 text-blue-600',
  'Building Fund': 'bg-purple-50 text-purple-600',
  Offering: 'bg-gray-100 text-gray-600',
  Missions: 'bg-green-50 text-green-600',
};

const DEMO_COLLECTIONS = [
  {
    id: 'jonathan-miller',
    name: 'Jonathan Miller',
    initials: 'JM',
    initialsBg: 'bg-[#137fec]/10 text-[#137fec]',
    category: 'Tithe',
    amount: '₱1,500.00',
    method: 'Online',
    methodIcon: <CreditCard className="w-4 h-4" />,
    status: 'Confirmed',
    date: 'Oct 28, 2023',
  },
  {
    id: 'deborah-ross',
    name: 'Deborah Ross',
    initials: 'DR',
    initialsBg: 'bg-purple-100 text-purple-600',
    category: 'Building Fund',
    amount: '₱500.00',
    method: 'Cash',
    methodIcon: <Banknote className="w-4 h-4" />,
    status: 'Confirmed',
    date: 'Oct 28, 2023',
  },
  {
    id: 'michael-chang',
    name: 'Michael Chang',
    initials: 'MC',
    initialsBg: 'bg-gray-100 text-gray-600',
    category: 'Offering',
    amount: '₱250.00',
    method: 'Check',
    methodIcon: <FileText className="w-4 h-4" />,
    status: 'Confirmed',
    date: 'Oct 27, 2023',
  },
  {
    id: 'the-hernandez-family',
    name: 'The Hernandez Family',
    initials: 'HF',
    initialsBg: 'bg-orange-100 text-orange-600',
    category: 'Tithe',
    amount: '₱3,200.00',
    method: 'Online',
    methodIcon: <CreditCard className="w-4 h-4" />,
    status: 'Syncing',
    date: 'Oct 27, 2023',
  },
  {
    id: 'sarah-lewis',
    name: 'Sarah Lewis',
    initials: 'SL',
    initialsBg: 'bg-green-100 text-green-600',
    category: 'Missions',
    amount: '₱150.00',
    method: 'Cash',
    methodIcon: <Banknote className="w-4 h-4" />,
    status: 'Confirmed',
    date: 'Oct 26, 2023',
  },
];

const DEMO_SUMMARY_CARDS = [
  {
    label: 'Weekly Volume',
    value: '₱12,450.00',
    note: '+12% from last week',
    noteColor: 'text-green-500',
    icon: <BarChart2 className="w-5 h-5 text-[#137fec]" />,
  },
  {
    label: 'Active Donors',
    value: '428',
    note: 'Average ₱45 per record',
    noteColor: 'text-gray-500',
    icon: <Users className="w-5 h-5 text-[#137fec]" />,
  },
  {
    label: 'Digital Mix',
    value: '64%',
    note: 'Collections via Online Portal',
    noteColor: 'text-gray-500',
    icon: <PieChart className="w-5 h-5 text-[#137fec]" />,
  },
];

/* ── Component ────────────────────────────────────────────── */

export default function Collections() {
  const [currentPage, setCurrentPage]   = useState(1);
  const [modalOpen, setModalOpen]       = useState(false);
  const navigate = useNavigate();

  // ── DB-ready state ──────────────────────────────────────────────────────
  // collections    : live data from DB (falls back to demo when not connected)
  // totalPages     : total page count from DB
  // collectionTypes: dropdown options loaded from collection_types table
  // summary        : aggregate stats for the bottom cards
  const [collections,     setCollections]     = useState(DEMO_COLLECTIONS);
  const [totalPages,      setTotalPages]       = useState(2);   // demo has 2 pages
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [loadingList,     setLoadingList]     = useState(false);
  const [listError,       setListError]       = useState(null);

  // ── Form state for "Record New Collection" modal ────────────────────────
  const EMPTY_FORM = {
    donorName:        '',
    memberId:         '',
    collectionTypeId: '',
    amount:           '',
    paymentMethod:    '',
    dateReceived:     '',
    donorNotes:       '',
  };
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [submitting,  setSubmitting]  = useState(false);
  const [formError,   setFormError]   = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // ── Load collection types for the dropdown (once) ──────────────────────
  useEffect(() => {
    CollectionController.getCollectionTypes()
      .then((data) => setCollectionTypes(data))
      .catch(() => {/* Not yet connected – silently ignore */});
  }, []);

  // ── Load paginated collections from DB ─────────────────────────────────
  // TODO: Uncomment this block once Supabase is connected.
  // Remove the DEMO_COLLECTIONS initial state above when activating.
  /*
  const loadCollections = useCallback(async () => {
    setLoadingList(true);
    setListError(null);
    try {
      const { data, totalPages: tp } = await CollectionController.getCollections({
        page: currentPage,
      });
      setCollections(data);
      setTotalPages(tp);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoadingList(false);
    }
  }, [currentPage]);

  useEffect(() => { loadCollections(); }, [loadCollections]);
  */

  // ── Form helpers ────────────────────────────────────────────────────────
  const handleFieldChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleOpenModal = () => {
    setForm(EMPTY_FORM);
    setFormError(null);
    setFormSuccess(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormError(null);
    setFormSuccess(false);
  };

  // ── Form submit → CollectionController.recordCollection ─────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);
    setSubmitting(true);
    try {
      await CollectionController.recordCollection({
        donorName:        form.donorName        || null,
        memberId:         form.memberId         || null,
        collectionTypeId: form.collectionTypeId || null,
        amount:           form.amount,
        paymentMethod:    form.paymentMethod,
        dateReceived:     form.dateReceived,
        donorNotes:       form.donorNotes       || null,
        // recordedBy: pass the authenticated user's UUID here when auth is wired
      });
      setFormSuccess(true);
      // TODO: Refresh the list after a successful save:
      // loadCollections();
      setTimeout(handleCloseModal, 1200);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">Collections Management Terminal</h1>
          <p className="text-sm text-gray-500">Track and record all church financial contributions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Record New Collection
          </button>
        </div>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            <input
              className="h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs w-56 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none placeholder-gray-400"
              placeholder="Search member or donor…"
              type="text"
            />
          </div>
          {/* Category */}
          <div className="relative">
            <select className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer">
              <option>All Categories</option>
              <option>Tithes &amp; Offerings</option>
              <option>Building Fund</option>
              <option>Missions</option>
              <option>Rentals</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
          {/* Payment Method */}
          <div className="relative">
            <select className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer">
              <option>All Methods</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Credit Card</option>
              <option>Blockchain</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
          {/* Status */}
          <div className="relative">
            <select className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer">
              <option>All Records</option>
              <option>Cleared</option>
              <option>Pending</option>
              <option>Bounced</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Collections Table ──────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-normal text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4">Member / Donor Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {collections.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => navigate(`/treasurer/collections/${row.id}`)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* Name + Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center font-medium text-xs ${row.initialsBg}`}
                      >
                        {row.initials}
                      </div>
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>

                  {/* Category Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-normal uppercase tracking-wider ${
                        categoryStyles[row.category] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {row.category}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-medium">{row.amount}</td>

                  {/* Payment Method */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      {row.methodIcon} {row.method}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {row.status === 'Syncing' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-normal bg-blue-100 text-blue-700">
                        <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" /> Syncing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-normal bg-green-100 text-green-700">
                        <span className="h-1 w-1 rounded-full bg-green-500" /> Confirmed
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-right text-gray-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 1–5 of 142 records</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 text-xs font-medium rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                  currentPage === page
                    ? 'bg-[#137fec] text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-xs font-medium rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_SUMMARY_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.label}</h3>
              {card.icon}
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-normal mt-1 ${card.noteColor}`}>{card.note}</p>
          </div>
        ))}
      </div>

      {/* ── Record New Collection Modal ──────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#137fec]" />
                <h3 className="text-base sm:text-lg font-semibold">Record New Collection</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form className="p-6 space-y-5" onSubmit={handleSubmit}>

              {/* Error / Success banners */}
              {formError && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
                  Collection recorded successfully!
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Donor Name — full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-normal text-gray-500 uppercase tracking-wider" htmlFor="donor">
                    Donor Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      id="donor"
                      type="text"
                      placeholder="Search for a member..."
                      value={form.donorName}
                      onChange={handleFieldChange('donorName')}
                      className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-gray-500 uppercase tracking-wider" htmlFor="category">
                    Account Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={form.collectionTypeId}
                      onChange={handleFieldChange('collectionTypeId')}
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    >
                      <option value="">Select category</option>
                      {/* When collection types are loaded from DB they appear here */}
                      {collectionTypes.length > 0
                        ? collectionTypes.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))
                        : /* Fallback static options until DB is connected */ (
                          <>
                            <option value="tithe">Tithe</option>
                            <option value="offering">Offering</option>
                            <option value="building">Building Fund</option>
                            <option value="missions">Missions</option>
                            <option value="other">Other</option>
                          </>
                        )}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-gray-500 uppercase tracking-wider" htmlFor="col-date">
                    Date
                  </label>
                  <input
                    id="col-date"
                    type="date"
                    value={form.dateReceived}
                    onChange={handleFieldChange('dateReceived')}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-gray-500 uppercase tracking-wider" htmlFor="amount">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₱</span>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={handleFieldChange('amount')}
                      className="w-full rounded-lg border border-gray-200 bg-white pl-8 pr-4 py-2.5 text-sm font-normal focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-gray-500 uppercase tracking-wider" htmlFor="method">
                    Payment Method
                  </label>
                  <div className="relative">
                    <select
                      id="method"
                      value={form.paymentMethod}
                      onChange={handleFieldChange('paymentMethod')}
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    >
                      <option value="">Select method</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                      <option value="online_transfer">Online Transfer</option>
                      <option value="gcash">GCash</option>
                      <option value="maya">Maya</option>
                      <option value="bank_deposit">Bank Deposit</option>
                      <option value="credit_card">Credit Card</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Notes — full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-normal text-gray-500 uppercase tracking-wider" htmlFor="notes">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Add any relevant information..."
                    value={form.donorNotes}
                    onChange={handleFieldChange('donorNotes')}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] min-h-[80px]"
                  />
                </div>
              </div>

              {/* Footer inside form so Enter submits */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-bold hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#137fec] text-white text-sm font-bold hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Saving…' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
