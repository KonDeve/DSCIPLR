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
  Calendar,
  Search,
} from 'lucide-react';

/* ── Static demo data ─────────────────────────────────────── */

const summaryCards = [
  {
    label: 'Net Fund Balance',
    value: '$452,890.45',
    note: '+2.4% from last month',
    noteColor: 'text-green-500',
    icon: <Landmark className="w-4 h-4" />,
    iconBg: 'bg-[#137fec]/10 text-[#137fec]',
    trend: <TrendingUp className="w-3.5 h-3.5" />,
  },
  {
    label: 'Total Monthly Collections',
    value: '$68,240.00',
    note: '88% of monthly target reached',
    noteColor: 'text-green-500',
    icon: <Wallet className="w-4 h-4" />,
    iconBg: 'bg-green-500/10 text-green-500',
  },
  {
    label: 'Total Expenses',
    value: '$32,140.00',
    note: 'Includes utilities and payroll',
    noteColor: 'text-orange-500',
    icon: <Receipt className="w-4 h-4" />,
    iconBg: 'bg-orange-500/10 text-orange-500',
  },
  {
    label: 'Rental Revenue',
    value: '$12,450.50',
    note: 'Sanctuary and Hall bookings',
    noteColor: 'text-blue-500',
    icon: <DoorOpen className="w-4 h-4" />,
    iconBg: 'bg-blue-500/10 text-blue-500',
  },
];

const categoryStyles = {
  Utilities: 'bg-orange-100 text-orange-700',
  Outreach: 'bg-yellow-100 text-yellow-700',
  Payroll: 'bg-gray-100 text-gray-700',
  Maintenance: 'bg-orange-100 text-orange-700',
  Education: 'bg-blue-100 text-blue-700',
  Operations: 'bg-gray-100 text-gray-700',
  Admin: 'bg-gray-100 text-gray-700',
};

const expenses = [
  { refId: '#EXP-9921', payee: 'City Electric Co.', category: 'Utilities', amount: '-$2,140.00', date: 'Oct 24, 2023', status: 'Released' },
  { refId: '#EXP-9918', payee: 'Global Missions', category: 'Outreach', amount: '-$5,000.00', date: 'Oct 22, 2023', status: 'Released' },
  { refId: '#EXP-9915', payee: 'Staff Payroll', category: 'Payroll', amount: '-$12,400.00', date: 'Oct 20, 2023', status: 'Pending' },
  { refId: '#EXP-9910', payee: 'Hardware Store', category: 'Maintenance', amount: '-$185.50', date: 'Oct 18, 2023', status: 'Released' },
  { refId: '#EXP-9908', payee: 'Youth Ministry Supplies', category: 'Education', amount: '-$450.00', date: 'Oct 15, 2023', status: 'Released' },
  { refId: '#EXP-9905', payee: 'Security Services', category: 'Operations', amount: '-$800.00', date: 'Oct 12, 2023', status: 'Pending' },
  { refId: '#EXP-9902', payee: 'Office Supplies', category: 'Admin', amount: '-$125.75', date: 'Oct 10, 2023', status: 'Released' },
];

/* ── Component ────────────────────────────────────────────── */

export default function ExpensesReport() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('Oct 01, 2023 - Oct 31, 2023');
  const [payeeFilter, setPayeeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Expenses Report</h1>
          <p className="text-sm text-gray-500">Detailed breakdown of all church expenditures and disbursements</p>
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
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.label}</h3>
              <span className={`p-1.5 rounded-lg ${card.iconBg}`}>{card.icon}</span>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${card.noteColor}`}>
              {card.trend && card.trend}
              {card.note}
            </p>
          </div>
        ))}
      </div>

      {/* ── Filters Section ────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
        <div className="w-full lg:w-1/3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            className="w-full rounded-lg border-gray-200 bg-gray-100 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] placeholder:text-gray-500"
            placeholder="Filter by Payee name..."
            type="text"
            value={payeeFilter}
            onChange={(e) => setPayeeFilter(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-2/3 lg:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Category:</span>
            <select
              className="rounded-lg border-gray-200 bg-gray-100 text-xs font-bold py-1.5 focus:ring-[#137fec] min-w-[140px]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Utilities</option>
              <option>Outreach</option>
              <option>Payroll</option>
              <option>Maintenance</option>
              <option>Education</option>
              <option>Operations</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Status:</span>
            <select
              className="rounded-lg border-gray-200 bg-gray-100 text-xs font-bold py-1.5 focus:ring-[#137fec] min-w-[140px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Released</option>
              <option>Pending</option>
              <option>Processing</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Date:</span>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 border border-gray-200">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <input
                className="bg-transparent border-none p-0 text-xs font-bold focus:ring-0 w-48"
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Expenses Table ─────────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4">Ref ID</th>
                <th className="px-6 py-4">Payee</th>
                <th className="px-6 py-4">Account Category</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-200">
              {expenses.map((row) => (
                <tr key={row.refId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{row.refId}</td>
                  <td className="px-6 py-4 font-bold">{row.payee}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${categoryStyles[row.category] || 'bg-gray-100 text-gray-700'}`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-red-600">{row.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4">
                    {row.status === 'Released' ? (
                      <div className="flex items-center gap-1.5 text-green-600 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Released
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-orange-600 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                        Pending
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#137fec] hover:text-[#137fec]/80 font-bold cursor-pointer">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500">Showing 7 of 42 expenses</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
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
                    : 'border border-gray-200 hover:bg-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-white transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
