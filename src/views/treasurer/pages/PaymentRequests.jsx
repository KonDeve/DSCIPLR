import { useState } from "react";
import {
  Filter,
  Plus,
  Clock,
  ShieldCheck,
  TrendingUp,
  X,
  Search,
  CloudUpload,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Pending Requests",
    value: "12 Requests",
    note: "Totaling ₱4,320.00",
    noteColor: "text-orange-500",
    icon: Clock,
    iconColor: "text-orange-500",
  },
  {
    label: "Approved Awaiting Release",
    value: "₱2,150.00",
    note: "5 payments ready for blockchain release",
    noteColor: "text-[#137fec]",
    icon: ShieldCheck,
    iconColor: "text-[#137fec]",
  },
  {
    label: "Total Disbursed (Month)",
    value: "₱18,440.00",
    note: "+12% from previous month",
    noteColor: "text-green-500",
    icon: TrendingUp,
    iconColor: "text-green-500",
  },
];

const statusStyles = {
  Approved: "bg-blue-100 text-blue-700",
  "Pending Pastor Approval": "bg-orange-100 text-orange-700",
  Released: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-700",
  Rejected: "bg-red-100 text-red-700",
};

const statusDot = {
  Approved: "bg-blue-500",
  "Pending Pastor Approval": "bg-orange-500",
  Released: "bg-green-500",
  Draft: "bg-gray-500",
  Rejected: "bg-red-500",
};

const requests = [
  {
    id: "#PR-8842",
    payee: "Alpha Sound Systems",
    payeeSub: "Equipment Vendor",
    initials: "JD",
    member: "John Doe",
    amount: "₱1,200.00",
    category: "Maintenance",
    status: "Approved",
    date: "Nov 01, 2023",
  },
  {
    id: "#PR-8841",
    payee: "City Water Utility",
    payeeSub: null,
    initials: "AS",
    member: "Alice Smith",
    amount: "₱345.20",
    category: "Utilities",
    status: "Pending Pastor Approval",
    date: "Oct 30, 2023",
  },
  {
    id: "#PR-8839",
    payee: "Community Food Bank",
    payeeSub: null,
    initials: "RM",
    member: "Robert Miller",
    amount: "₱500.00",
    category: "Outreach",
    status: "Released",
    date: "Oct 28, 2023",
  },
  {
    id: "#PR-8835",
    payee: "Office Supply Co.",
    payeeSub: null,
    initials: "KH",
    member: "Kevin Hart",
    amount: "₱85.40",
    category: "Office",
    status: "Draft",
    date: "Oct 25, 2023",
  },
  {
    id: "#PR-8830",
    payee: "Local Events Rental",
    payeeSub: null,
    initials: "ST",
    member: "Sarah Tan",
    amount: "₱950.00",
    category: "Events",
    status: "Rejected",
    date: "Oct 22, 2023",
  },
];

export default function PaymentRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("check");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Payment Request Dashboard</h1>
          <p className="text-sm text-[#617589]">Review, approve, and release outgoing funds</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-[#dbe0e6] px-4 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0e6ed0] transition-colors"
          >
            <Plus className="w-4 h-4" /> New Payment Request
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-6 border border-[#dbe0e6]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#617589] uppercase tracking-wider">
                {card.label}
              </h3>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">{card.value}</p>
            <p className={`text-[10px] font-bold mt-1 ${card.noteColor}`}>{card.note}</p>
          </div>
        ))}
      </div>

      {/* Requests Table */}
      <div className="rounded-xl bg-white border border-[#dbe0e6] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-[#617589] uppercase tracking-wider border-b border-[#dbe0e6]">
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Payee</th>
                <th className="px-6 py-4">Requesting Member</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Account Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date Requested</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#dbe0e6]">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-xs font-bold text-[#137fec]">
                    {req.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{req.payee}</div>
                    {req.payeeSub && (
                      <div className="text-[10px] text-[#617589]">{req.payeeSub}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                        {req.initials}
                      </div>
                      <span className="text-gray-900">{req.member}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-900">{req.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-medium text-gray-700">
                      {req.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyles[req.status]}`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full ${statusDot[req.status]}`}
                      ></span>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-[#617589]">{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#dbe0e6] flex items-center justify-between">
          <p className="text-xs text-[#617589]">Showing 1-5 of 32 requests</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold rounded border border-[#dbe0e6] hover:bg-gray-50 transition-colors">
              Previous
            </button>
            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                  currentPage === page
                    ? "bg-[#137fec] text-white"
                    : "border border-[#dbe0e6] hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 text-xs font-bold rounded border border-[#dbe0e6] hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* New Payment Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-xl bg-white border border-[#dbe0e6]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#dbe0e6] p-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">New Payment Request</h2>
                <p className="text-sm text-[#617589]">Fill in the details for the outgoing payment</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#617589] hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Payee Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Services"
                    className="w-full rounded-lg border border-[#dbe0e6] bg-white text-sm focus:ring-[#137fec] focus:border-[#137fec] px-4 py-2.5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Requesting Member</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="w-full rounded-lg border border-[#dbe0e6] bg-white text-sm focus:ring-[#137fec] focus:border-[#137fec] pl-10 pr-4 py-2.5"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Amount (₱)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[#dbe0e6] bg-white text-sm focus:ring-[#137fec] focus:border-[#137fec] px-4 py-2.5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Account Category</label>
                  <select
                    defaultValue=""
                    className="w-full rounded-lg border border-[#dbe0e6] bg-white text-sm focus:ring-[#137fec] focus:border-[#137fec] px-4 py-2.5"
                  >
                    <option value="" disabled>Select category</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="utilities">Utilities</option>
                    <option value="outreach">Outreach</option>
                    <option value="events">Events</option>
                    <option value="office">Office Supplies</option>
                    <option value="salary">Salary &amp; Wages</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide reason for payment or details about the items/services..."
                  className="w-full rounded-lg border border-[#dbe0e6] bg-white text-sm focus:ring-[#137fec] focus:border-[#137fec] px-4 py-2.5 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Payment Method Preference</label>
                <div className="flex flex-wrap gap-4">
                  {["check", "digital", "cash"].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="text-[#137fec] focus:ring-[#137fec] border-[#dbe0e6] bg-white"
                      />
                      <span className="text-sm text-gray-900">
                        {method === "check" ? "Check" : method === "digital" ? "Digital Wallet" : "Cash"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Invoice or Receipt Attachment</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#dbe0e6] border-dashed rounded-xl hover:border-[#137fec] transition-colors group">
                  <div className="space-y-1 text-center">
                    <CloudUpload className="mx-auto w-10 h-10 text-[#617589] group-hover:text-[#137fec] mb-2" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-transparent rounded-md font-bold text-[#137fec] hover:underline">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-[#617589]">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-[#dbe0e6] p-6 bg-gray-50/50 rounded-b-xl">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-[#617589] hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-[#137fec] px-6 py-2.5 text-sm font-bold text-white hover:brightness-110 transition-all">
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
