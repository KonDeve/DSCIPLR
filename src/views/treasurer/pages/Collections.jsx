import { useState } from 'react';
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
} from 'lucide-react';

/* ── Static demo data ─────────────────────────────────────── */

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

const collections = [
  {
    id: 'jonathan-miller',
    name: 'Jonathan Miller',
    initials: 'JM',
    initialsBg: 'bg-[#137fec]/10 text-[#137fec]',
    category: 'Tithe',
    amount: '$1,500.00',
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
    amount: '$500.00',
    method: 'Cash',
    methodIcon: <HiOutlineCash className="w-4 h-4" />,
    status: 'Confirmed',
    date: 'Oct 28, 2023',
  },
  {
    id: 'michael-chang',
    name: 'Michael Chang',
    initials: 'MC',
    initialsBg: 'bg-gray-100 text-gray-600',
    category: 'Offering',
    amount: '$250.00',
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
    amount: '$3,200.00',
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
    amount: '$150.00',
    method: 'Cash',
    methodIcon: <Banknote className="w-4 h-4" />,
    status: 'Confirmed',
    date: 'Oct 26, 2023',
  },
];

const summaryCards = [
  {
    label: 'Weekly Volume',
    value: '$12,450.00',
    note: '+12% from last week',
    noteColor: 'text-green-500',
    icon: <BarChart2 className="w-5 h-5 text-[#137fec]" />,
  },
  {
    label: 'Active Donors',
    value: '428',
    note: 'Average $45 per record',
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
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Collections Management Terminal</h1>
          <p className="text-sm text-gray-500">Track and record all church financial contributions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Record New Collection
          </button>
        </div>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {filters.map((f) => (
          <div
            key={f.label}
            className="rounded-xl bg-white p-4 border border-gray-200 cursor-pointer hover:border-[#137fec]/40 transition-colors"
          >
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{f.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{f.value}</span>
              {f.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Collections Table ──────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
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
                        className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${row.initialsBg}`}
                      >
                        {row.initials}
                      </div>
                      <span className="font-bold">{row.name}</span>
                    </div>
                  </td>

                  {/* Category Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        categoryStyles[row.category] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {row.category}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-black">{row.amount}</td>

                  {/* Payment Method */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      {row.methodIcon} {row.method}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {row.status === 'Syncing' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                        <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" /> Syncing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
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
              className="px-3 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
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
              className="px-3 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.label}</h3>
              {card.icon}
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-bold mt-1 ${card.noteColor}`}>{card.note}</p>
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
                <h3 className="text-base sm:text-lg font-bold">Record New Collection</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form className="p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Donor Name — full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="donor">
                    Donor Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      id="donor"
                      type="text"
                      placeholder="Search for a member..."
                      className="w-full rounded-lg border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="category">
                    Account Category
                  </label>
                  <select
                    id="category"
                    defaultValue=""
                    className="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  >
                    <option disabled value="">Select category</option>
                    <option value="tithe">Tithe</option>
                    <option value="offering">Offering</option>
                    <option value="building">Building Fund</option>
                    <option value="missions">Missions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="col-date">
                    Date
                  </label>
                  <input
                    id="col-date"
                    type="date"
                    className="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="amount">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">$</span>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full rounded-lg border-gray-200 bg-white pl-8 pr-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="method">
                    Payment Method
                  </label>
                  <select
                    id="method"
                    defaultValue=""
                    className="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                  >
                    <option disabled value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                {/* Notes — full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="notes">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Add any relevant information..."
                    className="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] min-h-[80px]"
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-bold hover:bg-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-[#137fec] text-white text-sm font-bold hover:bg-blue-600 transition-colors cursor-pointer">
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
