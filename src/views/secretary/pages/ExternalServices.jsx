import {
  DollarSign,
  Receipt,
  CloudUpload,
  ShieldCheck,
  Clock,
  ClipboardList,
} from 'lucide-react';

const PAYMENT_HISTORY = [
  {
    id: '#REQ-8821',
    payee: 'CleanPro Solutions',
    amount: '₱450.00',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-700',
    date: 'Oct 24, 2023',
  },
  {
    id: '#REQ-8819',
    payee: 'City Power & Light',
    amount: '₱1,240.15',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-700',
    date: 'Oct 22, 2023',
  },
  {
    id: '#REQ-8815',
    payee: 'Starlight Tech Support',
    amount: '₱150.00',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-700',
    date: 'Oct 20, 2023',
  },
];

export default function ExternalServices() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-[#137fec]" />
            <span className="text-[10px] font-bold text-[#137fec] uppercase tracking-widest">
              Administrative Hub
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            External Services
          </h2>
          <p className="text-gray-500">
            Manage external vendor disbursement requests and member-only asset bookings.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
            <Receipt className="w-5 h-5" />
            Payment History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#137fec] text-white rounded-lg text-sm font-semibold hover:bg-[#137fec]/90 transition-colors cursor-pointer">
            <Clock className="w-5 h-5" />
            Booking History
          </button>
        </div>
      </div>

      {/* Payment Request Form */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <ClipboardList className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Outgoing Disbursement
            </span>
          </div>
          <h3 className="font-bold text-base sm:text-lg xl:text-xl">External Service Payment Request</h3>
          <p className="text-xs text-gray-500">
            Request payments for non-member service providers or contractors.
          </p>
        </div>
        <div className="p-8">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Payee / Service Provider
                </label>
                <input
                  type="text"
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 focus:ring-[#137fec] focus:border-[#137fec]"
                  placeholder="Enter company or contractor name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Description of Service
                </label>
                <textarea
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-[#137fec] focus:border-[#137fec]"
                  placeholder="Details of the service provided..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                    Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full text-sm border border-gray-200 rounded-lg pl-8 pr-4 py-3 font-bold focus:ring-[#137fec] focus:border-[#137fec]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
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
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
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

      {/* Payment Request History Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Receipt className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Administrative Records
            </span>
          </div>
          <h3 className="font-bold text-base sm:text-lg xl:text-xl">Payment Request History</h3>
          <p className="text-xs text-gray-500">
            Review and track the status of recent external service disbursement requests.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Payee
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {PAYMENT_HISTORY.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-xs">{r.id}</td>
                  <td className="px-6 py-4 text-xs">{r.payee}</td>
                  <td className="px-6 py-4 text-xs font-bold">{r.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${r.statusColor}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50/30 text-center">
          <button className="text-xs font-bold text-[#137fec] hover:underline cursor-pointer">
            View All Payment Requests
          </button>
        </div>
      </div>
    </div>
  );
}
