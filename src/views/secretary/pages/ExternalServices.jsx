import { useState } from 'react';
import {
  DollarSign,
  Receipt,
  CloudUpload,
  ShieldCheck,
  Clock,
  ClipboardList,
  History,
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Building2,
  Car,
  Plus,
  CalendarDays,
} from 'lucide-react';

const PAYMENT_HISTORY_DATA = [
  {
    id: 'REQ-2023-0891',
    payee: 'Apex Security Solutions',
    date: 'Oct 24, 2023',
    amount: '$1,250.00',
    onBehalfOf: 'Robert Chen',
    status: 'Released',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'REQ-2023-0895',
    payee: 'City Sound & Lights Co.',
    date: 'Oct 26, 2023',
    amount: '$450.00',
    onBehalfOf: 'Sarah Miller',
    status: 'Approved',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'REQ-2023-0902',
    payee: 'Elite Catering Services',
    date: 'Oct 28, 2023',
    amount: '$2,800.00',
    onBehalfOf: 'John Doe',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'REQ-2023-0908',
    payee: 'Green Garden Landscaping',
    date: 'Oct 29, 2023',
    amount: '$620.00',
    onBehalfOf: 'David Williams',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'REQ-2023-0912',
    payee: 'Office Supplies Express',
    date: 'Oct 30, 2023',
    amount: '$125.40',
    onBehalfOf: 'Emily Thompson',
    status: 'Released',
    statusColor: 'bg-green-100 text-green-700',
  },
];

const BOOKING_HISTORY_DATA = [
  {
    id: '#BK-99821',
    resource: 'Sanctuary',
    icon: 'sanctuary',
    member: 'Jonathan Edwards',
    date: 'Oct 24, 2023',
    duration: '4 Hours',
    purpose: 'Wedding Rehearsal',
    status: 'Scheduled',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: '#BK-99784',
    resource: 'Vehicle',
    icon: 'vehicle',
    member: 'Sarah Jenkins',
    date: 'Oct 22, 2023',
    duration: '8 Hours',
    purpose: 'Community Outreach',
    status: 'Completed',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: '#BK-99762',
    resource: 'Vehicle',
    icon: 'vehicle',
    member: 'Robert Wilson',
    date: 'Oct 20, 2023',
    duration: '2 Hours',
    purpose: 'Elder Support',
    status: 'Cancelled',
    statusColor: 'bg-red-100 text-red-700',
  },
  {
    id: '#BK-99755',
    resource: 'Sanctuary',
    icon: 'sanctuary',
    member: 'Phoebe Buffay',
    date: 'Oct 18, 2023',
    duration: '4 Hours',
    purpose: 'Choir Rehearsal',
    status: 'Completed',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: '#BK-99740',
    resource: 'Sanctuary',
    icon: 'sanctuary',
    member: 'Michael Scott',
    date: 'Oct 15, 2023',
    duration: 'Full Day',
    purpose: 'Youth Seminar',
    status: 'Completed',
    statusColor: 'bg-blue-100 text-blue-700',
  },
];

const TABS = [
  { id: 'request', label: 'New Request', icon: ClipboardList },
  { id: 'payment-history', label: 'Payment History', icon: Receipt },
  { id: 'booking-history', label: 'Booking History', icon: Clock },
];

export default function ExternalServices() {
  const [activeTab, setActiveTab] = useState('request');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-[#137fec]" />
            <span className="text-[10px] font-normal text-[#137fec] uppercase tracking-widest">
              Administrative Hub
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
            External Services
          </h2>
          <p className="text-gray-500">
            Manage external vendor disbursement requests and member-only asset bookings.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1" aria-label="Tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === id
                  ? 'border-[#137fec] text-[#137fec]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab: New Request */}
      {activeTab === 'request' && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <ClipboardList className="w-4 h-4" />
              <span className="text-[10px] font-normal uppercase tracking-widest">
                Outgoing Disbursement
              </span>
            </div>
            <h3 className="font-semibold text-base sm:text-lg xl:text-xl">External Service Payment Request</h3>
            <p className="text-xs text-gray-500">
              Request payments for non-member service providers or contractors.
            </p>
          </div>
          <div className="p-8">
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-normal text-gray-500 uppercase mb-1.5">
                    Payee / Service Provider
                  </label>
                  <input
                    type="text"
                    className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 focus:ring-[#137fec] focus:border-[#137fec]"
                    placeholder="Enter company or contractor name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-gray-500 uppercase mb-1.5">
                    Description of Service
                  </label>
                  <textarea
                    className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-[#137fec] focus:border-[#137fec]"
                    placeholder="Details of the service provided..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-normal text-gray-500 uppercase mb-1.5">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-normal">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full text-sm border border-gray-200 rounded-lg pl-8 pr-4 py-3 font-normal focus:ring-[#137fec] focus:border-[#137fec]"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-500 uppercase mb-1.5">
                      On behalf of
                    </label>
                    <select className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 focus:ring-[#137fec] focus:border-[#137fec] cursor-pointer">
                      <option value="">Select ministry/staff</option>
                      <option>General Administration</option>
                      <option>Youth Ministry</option>
                      <option>Music &amp; Worship</option>
                      <option>Facilities Maintenance</option>
                      <option>Outreach Program</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-500 uppercase mb-1.5">
                  Invoice / Proof of Billing
                </label>
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-full min-h-[160px] border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudUpload className="w-10 h-10 text-[#137fec] mb-3" />
                      <p className="mb-1 text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[11px] text-gray-500">PDF, JPG or PNG (MAX. 5MB)</p>
                    </div>
                    <input className="hidden" type="file" />
                  </label>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="w-full py-4 bg-[#137fec] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#137fec]/90 transition-all text-sm sm:text-base cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Submit Request for Approval
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Payment History */}
      {activeTab === 'payment-history' && (
        <div className="space-y-6">
          {/* Page sub-header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-[#137fec]" />
                <span className="text-[10px] font-normal text-[#137fec] uppercase tracking-widest">Audit Trail</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-1">Payment History</h3>
              <p className="text-sm text-gray-500">Review and track all external service payment requests and their current status.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Filters */}
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/60 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                  <input
                    className="h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs w-56 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none placeholder-gray-400"
                    placeholder="Search by ID or Payee…"
                    type="text"
                  />
                </div>
                {/* Status */}
                <div className="relative">
                  <select className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer">
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Released</option>
                    <option>Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                {/* Divider */}
                <div className="w-px h-5 bg-gray-200" />
                {/* Date from */}
                <div className="relative flex items-center h-9 bg-white border border-gray-200 rounded-lg px-3 gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="date"
                    className="appearance-none bg-transparent border-none p-0 text-xs text-gray-700 focus:ring-0 outline-none w-[100px] cursor-pointer"
                  />
                </div>
                <span className="text-gray-400 text-xs">—</span>
                {/* Date to */}
                <div className="relative flex items-center h-9 bg-white border border-gray-200 rounded-lg px-3 gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="date"
                    className="appearance-none bg-transparent border-none p-0 text-xs text-gray-700 focus:ring-0 outline-none w-[100px] cursor-pointer"
                  />
                </div>
              </div>
              {/* Export */}
              <button className="flex items-center gap-1.5 h-9 px-4 text-xs font-medium text-[#137fec] bg-[#137fec]/5 hover:bg-[#137fec]/10 rounded-lg transition-colors cursor-pointer shrink-0">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Payee / Service Provider</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">On Behalf Of</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {PAYMENT_HISTORY_DATA.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{r.id}</td>
                      <td className="px-6 py-4 font-medium text-sm">{r.payee}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{r.date}</td>
                      <td className="px-6 py-4 text-xs font-medium">{r.amount}</td>
                      <td className="px-6 py-4 text-xs">{r.onBehalfOf}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-normal ${r.statusColor}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-1 text-[#137fec] hover:underline font-semibold text-xs cursor-pointer">
                          <Eye className="w-3.5 h-3.5" />
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-gray-200 bg-gray-50/30 flex items-center justify-between">
              <p className="text-[11px] text-gray-500">Showing 1 to 5 of 42 entries</p>
              <div className="flex items-center gap-1">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#137fec] text-white font-medium text-xs">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 font-medium text-xs cursor-pointer">2</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 font-medium text-xs cursor-pointer">3</button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Booking History */}
      {activeTab === 'booking-history' && (
        <div className="space-y-6">
          {/* Page sub-header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-[#137fec]" />
                <span className="text-[10px] font-normal text-[#137fec] uppercase tracking-widest">Rental Management</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-1">Booking History</h3>
              <p className="text-sm text-gray-500">Complete log of Sanctuary and Vehicle reservations across all members.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer self-start md:self-auto">
              <Plus className="w-5 h-5" />
              New Booking
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Filters */}
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/60 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                  <input
                    className="h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs w-56 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none placeholder-gray-400"
                    placeholder="Search by ID or Member…"
                    type="text"
                  />
                </div>
                {/* Resource */}
                <div className="relative">
                  <select className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer">
                    <option>All Resources</option>
                    <option>Sanctuary</option>
                    <option>Vehicle</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                {/* Status */}
                <div className="relative">
                  <select className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer">
                    <option>All Statuses</option>
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                {/* Divider */}
                <div className="w-px h-5 bg-gray-200" />
                {/* Date from */}
                <div className="relative flex items-center h-9 bg-white border border-gray-200 rounded-lg px-3 gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="date"
                    className="appearance-none bg-transparent border-none p-0 text-xs text-gray-700 focus:ring-0 outline-none w-[100px] cursor-pointer"
                  />
                </div>
                <span className="text-gray-400 text-xs">—</span>
                {/* Date to */}
                <div className="relative flex items-center h-9 bg-white border border-gray-200 rounded-lg px-3 gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="date"
                    className="appearance-none bg-transparent border-none p-0 text-xs text-gray-700 focus:ring-0 outline-none w-[100px] cursor-pointer"
                  />
                </div>
              </div>
              {/* Export */}
              <button className="flex items-center gap-1.5 h-9 px-4 text-xs font-medium text-[#137fec] bg-[#137fec]/5 hover:bg-[#137fec]/10 rounded-lg transition-colors cursor-pointer shrink-0">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Resource</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Member Name</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Booking Date</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-normal text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {BOOKING_HISTORY_DATA.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-[#137fec]">{b.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-medium">
                          {b.icon === 'sanctuary' ? (
                            <Building2 className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Car className="w-4 h-4 text-gray-400" />
                          )}
                          {b.resource}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-sm">{b.member}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{b.date}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{b.duration}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 truncate max-w-[150px]">{b.purpose}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-normal ${b.statusColor}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-gray-200 bg-gray-50/30 flex items-center justify-between">
              <p className="text-[11px] text-gray-500">Showing 1 to 5 of 42 bookings</p>
              <div className="flex items-center gap-1">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#137fec] text-white font-medium text-xs">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 font-medium text-xs cursor-pointer">2</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 font-medium text-xs cursor-pointer">3</button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
