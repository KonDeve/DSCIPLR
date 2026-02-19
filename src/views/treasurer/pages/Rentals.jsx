import { useState } from 'react';
import {
  SlidersHorizontal,
  PlusCircle,
  Library,
  Truck,
  Calendar,
  ChevronDown,
  Filter,
  Banknote,
  Clock,
  BarChart2,
  X,
  Search,
  Bookmark,
  Tag,
  Info,
} from 'lucide-react';

/* ── Static demo data ─────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Total Rental Income (Month)',
    value: '$8,240.00',
    note: '+8.4% from last month',
    noteColor: 'text-green-500',
    icon: <Banknote className="w-5 h-5 text-[#137fec]" />,
  },
  {
    label: 'Pending Payments',
    value: '$1,450.00',
    note: '4 items requiring attention',
    noteColor: 'text-orange-500',
    icon: <Clock className="w-5 h-5 text-orange-500" />,
  },
  {
    label: 'Asset Utilization Rate',
    value: '72%',
    note: 'Sanctuary: 85% | Vehicles: 58%',
    noteColor: 'text-gray-500',
    icon: <BarChart2 className="w-5 h-5 text-[#137fec]" />,
  },
];

const filters = [
  { label: 'Date Range', value: 'Last 30 Days', icon: <Calendar className="w-4 h-4 text-gray-400" /> },
  { label: 'Asset Type', value: 'All Assets', icon: <ChevronDown className="w-4 h-4 text-gray-400" /> },
  { label: 'Payment Status', value: 'All Statuses', icon: <ChevronDown className="w-4 h-4 text-gray-400" /> },
  { label: 'Quick Filter', value: 'Overdue Only', icon: <Filter className="w-4 h-4 text-gray-400" /> },
];

const statusStyles = {
  Paid: 'bg-green-100 text-green-700',
  Partial: 'bg-orange-100 text-orange-700',
  Overdue: 'bg-red-100 text-red-700',
  Confirmed: 'bg-blue-100 text-blue-700',
};

const statusDot = {
  Paid: 'bg-green-500',
  Partial: 'bg-orange-500',
  Overdue: 'bg-red-500',
  Confirmed: 'bg-blue-500',
};

const rentals = [
  {
    name: 'Andrew Stevenson',
    initials: 'AS',
    initialsBg: 'bg-[#137fec]/10 text-[#137fec]',
    asset: 'Sanctuary',
    assetIcon: <Library className="w-4 h-4 text-gray-500" />,
    bookingDate: 'Oct 28, 2023',
    amount: '$450.00',
    status: 'Paid',
    datePaid: 'Oct 29, 2023',
  },
  {
    name: 'Marcus Wright',
    initials: 'MW',
    initialsBg: 'bg-purple-100 text-purple-600',
    asset: 'Church Van',
    assetIcon: <Truck className="w-4 h-4 text-gray-500" />,
    bookingDate: 'Oct 30, 2023',
    amount: '$120.00',
    status: 'Partial',
    datePaid: 'Oct 28, 2023',
  },
  {
    name: 'Linda Thompson',
    initials: 'LT',
    initialsBg: 'bg-red-100 text-red-600',
    asset: 'Sanctuary',
    assetIcon: <Library className="w-4 h-4 text-gray-500" />,
    bookingDate: 'Oct 15, 2023',
    amount: '$500.00',
    status: 'Overdue',
    datePaid: '—',
  },
  {
    name: 'Robert King',
    initials: 'RK',
    initialsBg: 'bg-blue-100 text-blue-600',
    asset: 'Minibus',
    assetIcon: <Truck className="w-4 h-4 text-gray-500" />,
    bookingDate: 'Oct 27, 2023',
    amount: '$280.00',
    status: 'Paid',
    datePaid: 'Oct 27, 2023',
  },
  {
    name: 'Sarah Miller',
    initials: 'SM',
    initialsBg: 'bg-emerald-100 text-emerald-600',
    asset: 'Sanctuary',
    assetIcon: <Library className="w-4 h-4 text-gray-500" />,
    bookingDate: 'Nov 02, 2023',
    amount: '$600.00',
    status: 'Confirmed',
    datePaid: 'Oct 30, 2023',
  },
];

/* ── Component ────────────────────────────────────────────── */

export default function Rentals() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Rental Income Management Terminal</h1>
          <p className="text-sm text-gray-500">Track and manage revenue from sanctuary and vehicle rentals</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Record Rental Payment
          </button>
        </div>
      </div>

      {/* ── Summary Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.label}</h3>
              {card.icon}
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-bold mt-1 ${card.noteColor}`}>{card.note}</p>
          </div>
        ))}
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

      {/* ── Rentals Table ──────────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4">Member Name</th>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Booking Date</th>
                <th className="px-6 py-4">Amount Due</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4 text-right">Date Paid</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {rentals.map((row) => (
                <tr key={row.name} className="hover:bg-gray-50 transition-colors cursor-pointer">
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

                  {/* Asset */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {row.assetIcon}
                      <span>{row.asset}</span>
                    </div>
                  </td>

                  {/* Booking Date */}
                  <td className="px-6 py-4 text-gray-500">{row.bookingDate}</td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-black">{row.amount}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        statusStyles[row.status]
                      }`}
                    >
                      <span className={`h-1 w-1 rounded-full ${statusDot[row.status]}`} />
                      {row.status}
                    </span>
                  </td>

                  {/* Date Paid */}
                  <td className="px-6 py-4 text-right text-gray-500">{row.datePaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 1–5 of 48 records</p>
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

      {/* ── Record Rental Payment Modal ─────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-xl border border-gray-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#137fec]/10 flex items-center justify-center text-[#137fec]">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">Record Rental Payment</h3>
                  <p className="text-xs text-gray-500">Process payment for an active asset rental</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Member Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="r-member">
                    Member Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      id="r-member"
                      type="text"
                      placeholder="Search members..."
                      className="w-full h-11 pl-10 pr-4 rounded-lg border-gray-200 bg-gray-100 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] transition-all"
                    />
                  </div>
                </div>

                {/* Rental Reference */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="r-ref">
                    Rental Reference
                  </label>
                  <div className="relative">
                      <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <select
                      id="r-ref"
                      className="w-full h-11 pl-10 pr-10 rounded-lg border-gray-200 bg-gray-100 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] appearance-none"
                    >
                      <option>BK-2023-084: Church Van (Oct 30)</option>
                      <option>BK-2023-042: Sanctuary (Nov 15)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Category + Amount */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="r-category">
                      Payment Category
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <select
                        id="r-category"
                        className="w-full h-11 pl-10 pr-10 rounded-lg border-gray-200 bg-gray-100 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] appearance-none"
                      >
                        <option>Vehicle</option>
                        <option>Sanctuary</option>
                      </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="r-amount">
                    Amount to Pay
                  </label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">$</span>
                      <input
                        id="r-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full h-11 pl-8 pr-4 rounded-lg border-gray-200 bg-gray-100 text-sm font-black focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                      />
                    </div>
                  </div>
                </div>

                {/* Method + Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="r-method">
                      Payment Method
                    </label>
                    <div className="relative">
                      <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <select
                        id="r-method"
                        className="w-full h-11 pl-10 pr-10 rounded-lg border-gray-200 bg-gray-100 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] appearance-none"
                      >
                        <option>Cash</option>
                        <option>Check</option>
                        <option>Online</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="r-date">
                      Transaction Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input
                        id="r-date"
                        type="date"
                        className="w-full h-11 pl-10 pr-4 rounded-lg border-gray-200 bg-gray-100 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec]"
                      />
                    </div>
                  </div>
                </div>

                {/* Ledger Preview */}
                <div className="p-4 rounded-lg bg-[#137fec]/5 border border-[#137fec]/10">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#137fec] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#137fec] uppercase tracking-tight">Ledger Preview</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        This payment will be recorded as a{' '}
                        <span className="text-gray-900 font-semibold">Partial Payment</span> for Rental ID{' '}
                        <span className="text-gray-900 font-semibold">#BK2023084</span>. Remaining balance:{' '}
                        <span className="text-orange-600 font-bold">$0.00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50/50 rounded-b-xl">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200 bg-white cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-[#137fec] text-sm font-bold text-white hover:bg-[#137fec]/90 transition-all cursor-pointer">
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
