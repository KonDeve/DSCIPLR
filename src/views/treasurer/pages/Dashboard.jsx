import { useState, useEffect } from 'react';
import { FinanceModel } from '@/models';
import { formatCurrency } from '@/utils/helpers';
import {
  Library,
  Banknote,
  Clock,
  Building2,
  Download,
  Plus,
  CheckCircle,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

/* ── Static demo data ─────────────────────────────────────── */

const statCards = [
  {
    label: 'Total Funds Available',
    value: '₱482,930.50',
    icon: <Library className="w-5 h-5" />,
    iconBg: 'bg-[#137fec]/10 text-[#137fec]',
    badge: { text: '+2.4%', color: 'text-green-500 bg-green-500/10' },
    footnote: 'Hash: 0x4f2…78a1',
    mono: true,
  },
  {
    label: 'Collections This Month',
    value: '₱64,215.00',
    icon: <Banknote className="w-5 h-5" />,
    iconBg: 'bg-green-500/10 text-green-500',
    badge: { text: 'On Track', color: 'text-green-500 bg-green-500/10' },
    footnote: 'Tithes, Offerings & Pledges',
  },
  {
    label: 'Pending Expenses',
    value: '₱12,450.75',
    icon: <Clock className="w-5 h-5" />,
    iconBg: 'bg-yellow-500/10 text-yellow-500',
    badge: { text: '8 Pending', color: 'text-yellow-500 bg-yellow-500/10' },
    footnote: 'Awaiting Pastor Approval',
  },
  {
    label: 'Rental Income YTD',
    value: '₱38,200.00',
    icon: <Building2 className="w-5 h-5" />,
    iconBg: 'bg-purple-500/10 text-purple-500',
    badge: { text: 'Annual', color: 'text-[#137fec] bg-[#137fec]/10' },
    footnote: 'Events & Facility Usage',
  },
];

const cashFlowWeeks = [
  { label: 'W1', total: 'h-32', income: 'h-24' },
  { label: 'W2', total: 'h-40', income: 'h-28' },
  { label: 'W3', total: 'h-48', income: 'h-36' },
  { label: 'W4', total: 'h-56', income: 'h-32' },
  { label: 'W5', total: 'h-44', income: 'h-24' },
];

const recentCollections = [
  { name: 'Jonathan Miller', category: 'Tithe', amount: '₱1,500.00', status: 'Confirmed', syncing: false, date: 'Oct 28, 14:20' },
  { name: 'Deborah Ross', category: 'Building Fund', amount: '₱500.00', status: 'Confirmed', syncing: false, date: 'Oct 28, 11:05' },
  { name: 'Michael Chang', category: 'General Offering', amount: '₱250.00', status: 'Confirmed', syncing: false, date: 'Oct 27, 09:45' },
  { name: 'The Hernandez Family', category: 'Tithe', amount: '₱3,200.00', status: 'Syncing', syncing: true, date: 'Oct 27, 08:30' },
];

const pendingApprovals = [
  { title: 'Main Sanctuary HVAC Repair', amount: '₱1,240.00', tag: 'Facility', time: '2h ago' },
  { title: 'Youth Outreach Grant', amount: '₱3,500.00', tag: 'Missions', time: '5h ago' },
  { title: 'Communion Supplies', amount: '₱450.25', tag: 'Worship', time: 'Yesterday' },
];

/* ── Component ────────────────────────────────────────────── */

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await FinanceModel.getFinancialSummary();
        setSummary(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ── Header Row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Treasurer Financial Overview</h1>
          <p className="text-sm text-gray-500">Real-time blockchain-enabled financial monitoring</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#137fec] px-4 py-2 text-sm font-bold text-white hover:bg-[#1170d4] transition-colors cursor-pointer">
            <Plus className="w-4 h-4" /> New Entry
          </button>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`rounded-lg p-2 ${card.iconBg}`}>{card.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${card.badge.color}`}>
                {card.badge.text}
              </span>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
            <p className="mt-1 text-lg sm:text-xl lg:text-2xl font-black text-gray-900">{card.value}</p>
            <p className={`mt-2 text-[10px] text-gray-500 truncate ${card.mono ? 'font-mono' : ''}`}>
              {card.footnote}
            </p>
          </div>
        ))}
      </div>

      {/* ── Main Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left / Center column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Cash Flow Chart */}
          <div className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base sm:text-lg font-bold">Cash Flow (Last 30 Days)</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#137fec]" />
                  <span className="text-xs font-medium text-gray-500">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="text-xs font-medium text-gray-500">Expenses</span>
                </div>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {cashFlowWeeks.map((week) => (
                <div key={week.label} className="w-full flex flex-col items-center gap-1">
                  <div className={`w-full bg-[#137fec]/20 rounded-t ${week.total} relative`}>
                    <div className={`absolute bottom-0 w-full bg-[#137fec] rounded-t ${week.income}`} />
                  </div>
                  <span className="text-[10px] text-gray-500">{week.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Collections Table */}
          <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold">Recent Collections</h3>
              <button className="text-[#137fec] text-sm font-bold hover:underline cursor-pointer">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Member Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-200">
                  {recentCollections.map((row) => (
                    <tr key={row.name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.name}</td>
                      <td className="px-6 py-4 text-gray-500">{row.category}</td>
                      <td className="px-6 py-4 font-black text-green-600">{row.amount}</td>
                      <td className="px-6 py-4">
                        {row.syncing ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-600">
                            <RefreshCw className="w-3.5 h-3.5" /> Syncing
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                            <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Pending Approvals */}
          <div className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-bold">Pending Approvals</h3>
              <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs font-bold text-yellow-600">
                Action Required
              </span>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div
                  key={item.title}
                  className="group cursor-pointer rounded-lg border border-gray-200 p-3 hover:border-[#137fec] transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold truncate group-hover:text-[#137fec] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 shrink-0 ml-2">{item.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#137fec]">{item.amount}</span>
                    <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2.5 text-xs font-bold text-[#137fec] bg-[#137fec]/10 rounded-lg hover:bg-[#137fec]/20 transition-colors cursor-pointer">
              Go to Requests Panel
            </button>
          </div>

          {/* Ledger Integrity Card */}
          <div className="rounded-xl bg-gradient-to-br from-[#137fec] to-blue-700 p-5 sm:p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Ledger Integrity</h4>
                <p className="text-[10px] text-white/70">Blockchain Protocol v2.1</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-white/80">Network Nodes</span>
                <span className="font-bold">Active (12/12)</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full rounded-full" />
              </div>
              <p className="text-[10px] leading-relaxed text-white/90 italic">
                "Real-time validation confirmed. All current entries are immutable and cross-referenced
                with regional council nodes."
              </p>
              <div className="pt-2 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Verified Secure</span>
              </div>
            </div>
          </div>

          {/* Monthly Goal */}
          <div className="rounded-xl bg-white p-5 sm:p-6 border border-gray-200">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-500">Monthly Goal</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">₱64k</span>
              <span className="text-xs text-gray-500 pb-1">Target: ₱80k</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#137fec] w-[80%] rounded-full" />
            </div>
            <p className="mt-4 text-[11px] text-gray-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              80% of goal achieved with 3 days remaining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
