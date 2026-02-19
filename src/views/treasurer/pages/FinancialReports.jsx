import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FileSpreadsheet,
  Landmark,
  Wallet,
  Receipt,
  DoorOpen,
  TrendingUp,
  PlusCircle,
  MinusCircle,
  Calendar,
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
  Tithes: 'bg-blue-100 text-blue-700',
  Rentals: 'bg-purple-100 text-purple-700',
  'Building Fund': 'bg-teal-100 text-teal-700',
  Utilities: 'bg-orange-100 text-orange-700',
  Outreach: 'bg-yellow-100 text-yellow-700',
  Payroll: 'bg-gray-100 text-gray-700',
  Maintenance: 'bg-orange-100 text-orange-700',
};

const collections = [
  { donor: 'Jonathan Edwards', amount: '+$1,500.00', category: 'Tithes', date: 'Oct 24, 2023' },
  { donor: 'Sarah Williams', amount: '+$450.00', category: 'Rentals', date: 'Oct 23, 2023' },
  { donor: 'Anonymous Donor', amount: '+$10,000.00', category: 'Building Fund', date: 'Oct 23, 2023' },
  { donor: 'Mark Thompson', amount: '+$250.00', category: 'Tithes', date: 'Oct 22, 2023' },
];

const expenses = [
  { payee: 'City Electric Co.', amount: '-$2,140.00', category: 'Utilities', date: 'Oct 24, 2023' },
  { payee: 'Global Missions', amount: '-$5,000.00', category: 'Outreach', date: 'Oct 22, 2023' },
  { payee: 'Staff Payroll', amount: '-$12,400.00', category: 'Payroll', date: 'Oct 20, 2023' },
  { payee: 'Hardware Store', amount: '-$185.50', category: 'Maintenance', date: 'Oct 18, 2023' },
];

/* ── Component ────────────────────────────────────────────── */

export default function FinancialReports() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('Oct 01, 2023 - Oct 31, 2023');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Financial Reports</h1>
          <p className="text-sm text-gray-500">Comprehensive overview of church finances and fund performance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <FileText className="w-4 h-4" /> Download PDF Report
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
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

      {/* ── Detailed Activity Section ──────────────────────── */}
      <div className="space-y-6">
        {/* Date Range Filter */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
          <h3 className="font-bold text-sm">Detailed Activity</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500">Date Range:</span>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 border border-gray-200">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <input
                className="bg-transparent border-none p-0 text-xs font-bold focus:ring-0 w-52"
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tables Container */}
        <div className="flex flex-col gap-6">
          {/* Collections Table */}
          <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-green-500" /> Collections
              </h3>
              <button
                onClick={() => navigate('/treasurer/reports/collections')}
                className="text-[#137fec] text-xs font-bold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3">Donor</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-200">
                  {collections.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">{row.donor}</td>
                      <td className="px-6 py-4 font-black text-green-600">{row.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded font-bold ${categoryStyles[row.category] || 'bg-gray-100 text-gray-700'}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-red-500" /> Expenses
              </h3>
              <button
                onClick={() => navigate('/treasurer/reports/expenses')}
                className="text-[#137fec] text-xs font-bold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3">Payee</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-200">
                  {expenses.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">{row.payee}</td>
                      <td className="px-6 py-4 font-black text-red-600">{row.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded font-bold ${categoryStyles[row.category] || 'bg-gray-100 text-gray-700'}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
