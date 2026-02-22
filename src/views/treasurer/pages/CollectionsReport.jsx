import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Landmark,
  Wallet,
  Receipt,
  DoorOpen,
  TrendingUp,
  PlusCircle,
  Calendar,
  Search,
  CreditCard,
  Banknote,
} from 'lucide-react';

/* ── Static demo data ─────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Net Fund Balance',
    value: '₱452,890.45',
    note: '+2.4% from last month',
    noteColor: 'text-green-500',
    icon: <Landmark className="w-4 h-4" />,
    iconBg: 'bg-[#137fec]/10 text-[#137fec]',
    trend: <TrendingUp className="w-3.5 h-3.5" />,
  },
  {
    label: 'Total Monthly Collections',
    value: '₱68,240.00',
    note: '88% of monthly target reached',
    noteColor: 'text-green-500',
    icon: <Wallet className="w-4 h-4" />,
    iconBg: 'bg-green-500/10 text-green-500',
  },
  {
    label: 'Total Expenses',
    value: '₱32,140.00',
    note: 'Includes utilities and payroll',
    noteColor: 'text-orange-500',
    icon: <Receipt className="w-4 h-4" />,
    iconBg: 'bg-orange-500/10 text-orange-500',
  },
  {
    label: 'Rental Revenue',
    value: '₱12,450.50',
    note: 'Sanctuary and Hall bookings',
    noteColor: 'text-blue-500',
    icon: <DoorOpen className="w-4 h-4" />,
    iconBg: 'bg-blue-500/10 text-blue-500',
  },
];

const categoryStyles = {
  Tithes: 'bg-blue-100 text-blue-700',
  Rentals: 'bg-purple-100 text-purple-700',
  'Building Fund': 'bg-teal-100 text-teal-700',
  Missions: 'bg-yellow-100 text-yellow-700',
};

const collections = [
  { txnId: '#TXN-8829', donor: 'Jonathan Edwards', amount: '+₱1,500.00', category: 'Tithes', method: 'Blockchain', methodIcon: <Wallet className="w-4 h-4 text-[#137fec]" />, date: 'Oct 24, 2023', status: 'Verified' },
  { txnId: '#TXN-8828', donor: 'Sarah Williams', amount: '+₱450.00', category: 'Rentals', method: 'Credit Card', methodIcon: <CreditCard className="w-4 h-4 text-gray-500" />, date: 'Oct 23, 2023', status: 'Verified' },
  { txnId: '#TXN-8827', donor: 'Anonymous Donor', amount: '+₱10,000.00', category: 'Building Fund', method: 'Blockchain', methodIcon: <Wallet className="w-4 h-4 text-[#137fec]" />, date: 'Oct 23, 2023', status: 'Verified' },
  { txnId: '#TXN-8826', donor: 'Mark Thompson', amount: '+₱250.00', category: 'Tithes', method: 'Cash/Cheque', methodIcon: <Banknote className="w-4 h-4 text-gray-500" />, date: 'Oct 22, 2023', status: 'Verified' },
  { txnId: '#TXN-8825', donor: 'Robert Miller', amount: '+₱300.00', category: 'Tithes', method: 'Bank Transfer', methodIcon: <Landmark className="w-4 h-4 text-gray-500" />, date: 'Oct 21, 2023', status: 'Verified' },
  { txnId: '#TXN-8824', donor: 'Linda Grayson', amount: '+₱1,200.00', category: 'Missions', method: 'Blockchain', methodIcon: <Wallet className="w-4 h-4 text-[#137fec]" />, date: 'Oct 21, 2023', status: 'Verified' },
  { txnId: '#TXN-8823', donor: 'David Chen', amount: '+₱50.00', category: 'Tithes', method: 'Cash', methodIcon: <Banknote className="w-4 h-4 text-gray-500" />, date: 'Oct 20, 2023', status: 'Verified' },
];

/* ── Component ────────────────────────────────────────────── */

export default function CollectionsReport() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('Oct 01, 2023 - Oct 31, 2023');
  const [donorFilter, setDonorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">Collections Detailed Report</h1>
          <p className="text-sm text-gray-500">In-depth analysis of all incoming church funds and donations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/treasurer/reports')}
            className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Summary
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer">
            <FileText className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* ── Summary Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</h3>
              <span className={`p-1.5 rounded-lg ${card.iconBg}`}>{card.icon}</span>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-normal mt-1 flex items-center gap-1 ${card.noteColor}`}>
              {card.trend && card.trend}
              {card.note}
            </p>
          </div>
        ))}
      </div>

      {/* ── Filters Section ────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl border border-gray-200 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-500">Date Range:</span>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 border border-gray-200">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <input
              className="bg-transparent border-none p-0 text-xs font-normal focus:ring-0 w-44"
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="w-full rounded-lg border-gray-200 bg-white pl-9 pr-4 py-1.5 text-xs focus:ring-[#137fec] focus:border-[#137fec]"
              placeholder="Filter by donor name..."
              type="text"
              value={donorFilter}
              onChange={(e) => setDonorFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              className="rounded-lg border-gray-200 bg-white py-1.5 text-xs font-normal focus:ring-[#137fec] focus:border-[#137fec]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Category: All</option>
              <option value="tithes">Tithes</option>
              <option value="rentals">Rentals</option>
              <option value="building">Building Fund</option>
              <option value="missions">Missions</option>
            </select>
            <select
              className="rounded-lg border-gray-200 bg-white py-1.5 text-xs font-normal focus:ring-[#137fec] focus:border-[#137fec]"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="">Payment Method: All</option>
              <option value="blockchain">Blockchain</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Credit Card</option>
              <option value="cash">Cash/Cheque</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Collections Table ──────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-green-500" /> All Collections Records
          </h3>
          <span className="text-xs text-gray-500">Showing 124 transactions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-normal text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Donor Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-200">
              {collections.map((row) => (
                <tr key={row.txnId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{row.txnId}</td>
                  <td className="px-6 py-4 font-medium">{row.donor}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded font-medium ${categoryStyles[row.category] || 'bg-gray-100 text-gray-700'}`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {row.methodIcon}
                      {row.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" /> {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <span className="text-xs text-gray-500">Page {currentPage} of 12</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs font-medium rounded border border-gray-200 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                  currentPage === page
                    ? 'bg-[#137fec] text-white border border-[#137fec]'
                    : 'border border-gray-200 hover:bg-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-xs font-medium rounded border border-gray-200 hover:bg-white transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
