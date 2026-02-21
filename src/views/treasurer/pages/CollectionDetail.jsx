import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  RefreshCw,
  Printer,
  ChevronDown,
  CheckCircle,
  Ban,
  Clock,
  AlertTriangle,
  Banknote,
} from 'lucide-react';

/* ── Demo data keyed by slug ──────────────────────────────── */

const collectionRecords = {
  'jonathan-miller': {
    name: 'Jonathan Miller',
    initials: 'JM',
    memberId: 'MEM-2023-0842',
    memberType: 'Regular Member',
    amount: '₱1,500.00',
    dateReceived: 'October 28, 2023',
    category: 'Tithe',
    categoryBg: 'bg-blue-50 text-blue-600',
    notes: '"For the building renovation and youth ministry expansion. God bless."',
    refNumber: 'TXN-9482-001X-B',
    paymentMethod: 'Check Deposit',
    paymentNote: 'Manual Bank Clearance Required',
    timeline: [
      { label: 'Recorded', date: 'Oct 28, 2023 • 09:42 AM', color: 'bg-green-500' },
      { label: 'Validated', date: 'Oct 28, 2023 • 10:15 AM', color: 'bg-green-500' },
      { label: 'Pending Clearance', date: 'Awaiting Bank Clearance', color: 'bg-orange-500', pending: true },
    ],
    accountingNote:
      'This check donation is currently being processed and requires bank verification before being marked as final.',
  },
  'deborah-ross': {
    name: 'Deborah Ross',
    initials: 'DR',
    memberId: 'MEM-2023-0215',
    memberType: 'Regular Member',
    amount: '₱500.00',
    dateReceived: 'October 28, 2023',
    category: 'Building Fund',
    categoryBg: 'bg-purple-50 text-purple-600',
    notes: '"Monthly pledge for the new building project."',
    refNumber: 'TXN-9483-002X-C',
    paymentMethod: 'Cash',
    paymentNote: 'In-person Collection',
    timeline: [
      { label: 'Recorded', date: 'Oct 28, 2023 • 11:05 AM', color: 'bg-green-500' },
      { label: 'Confirmed', date: 'Oct 28, 2023 • 11:10 AM', color: 'bg-green-500' },
    ],
    accountingNote: null,
  },
  'michael-chang': {
    name: 'Michael Chang',
    initials: 'MC',
    memberId: 'MEM-2023-0531',
    memberType: 'Regular Member',
    amount: '₱250.00',
    dateReceived: 'October 27, 2023',
    category: 'Offering',
    categoryBg: 'bg-gray-100 text-gray-600',
    notes: '',
    refNumber: 'TXN-9484-003X-D',
    paymentMethod: 'Check Deposit',
    paymentNote: 'Manual Bank Clearance Required',
    timeline: [
      { label: 'Recorded', date: 'Oct 27, 2023 • 09:45 AM', color: 'bg-green-500' },
      { label: 'Validated', date: 'Oct 27, 2023 • 10:00 AM', color: 'bg-green-500' },
      { label: 'Cleared', date: 'Oct 29, 2023 • 08:00 AM', color: 'bg-green-500' },
    ],
    accountingNote: null,
  },
  'the-hernandez-family': {
    name: 'The Hernandez Family',
    initials: 'HF',
    memberId: 'MEM-2023-0117',
    memberType: 'Family Account',
    amount: '₱3,200.00',
    dateReceived: 'October 27, 2023',
    category: 'Tithe',
    categoryBg: 'bg-blue-50 text-blue-600',
    notes: '"October family tithe."',
    refNumber: 'TXN-9485-004X-E',
    paymentMethod: 'Online Transfer',
    paymentNote: 'Automatic Reconciliation',
    timeline: [
      { label: 'Recorded', date: 'Oct 27, 2023 • 08:30 AM', color: 'bg-green-500' },
      { label: 'Syncing', date: 'Processing...', color: 'bg-blue-500', pending: true },
    ],
    accountingNote:
      'This online transfer is currently syncing and will be confirmed once the payment processor completes reconciliation.',
  },
  'sarah-lewis': {
    name: 'Sarah Lewis',
    initials: 'SL',
    memberId: 'MEM-2023-0903',
    memberType: 'Regular Member',
    amount: '₱150.00',
    dateReceived: 'October 26, 2023',
    category: 'Missions',
    categoryBg: 'bg-green-50 text-green-600',
    notes: '"For the upcoming missions trip fund."',
    refNumber: 'TXN-9486-005X-F',
    paymentMethod: 'Cash',
    paymentNote: 'In-person Collection',
    timeline: [
      { label: 'Recorded', date: 'Oct 26, 2023 • 10:00 AM', color: 'bg-green-500' },
      { label: 'Confirmed', date: 'Oct 26, 2023 • 10:05 AM', color: 'bg-green-500' },
    ],
    accountingNote: null,
  },
};

/* ── Component ────────────────────────────────────────────── */

export default function CollectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusOpen, setStatusOpen] = useState(false);
  const dropdownRef = useRef(null);

  const record = collectionRecords[id];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStatusOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!record) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <p className="text-gray-500 text-sm">Collection record not found.</p>
        <button
          onClick={() => navigate('/treasurer/collections')}
          className="mt-4 text-sm font-bold text-[#137fec] hover:underline cursor-pointer"
        >
          Back to Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ── Top Bar ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/treasurer/collections')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#137fec] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collections
        </button>

        <div className="flex gap-3">
          {/* Edit */}
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-5 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            <Pencil className="w-4 h-4" /> Edit Record
          </button>

          {/* Update Status dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setStatusOpen((v) => !v)}
              className={`flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-bold shadow-sm transition-colors cursor-pointer ${
                statusOpen
                  ? 'bg-gray-100 border-[#137fec]/50 ring-2 ring-[#137fec]/10'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <RefreshCw className="w-4 h-4" /> Update Status
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {statusOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-gray-200 py-2 z-50">
                <button className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-green-50 text-green-600 flex items-center gap-3 cursor-pointer">
                  <CheckCircle className="w-5 h-5" /> Mark as Cleared
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-red-50 text-red-600 flex items-center gap-3 border-t border-gray-200 cursor-pointer">
                  <Ban className="w-5 h-5" /> Mark as Bounced
                </button>
              </div>
            )}
          </div>

          {/* Print */}
          <button className="flex items-center gap-2 rounded-lg bg-[#137fec] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#137fec]/90 transition-colors cursor-pointer">
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>
      </div>

      {/* ── Content Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white p-8 border border-gray-200">
            <div className="space-y-8">
              {/* Donor Info */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                  Donor Information
                </p>
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-full bg-[#137fec]/10 flex items-center justify-center text-[#137fec] text-2xl font-black">
                    {record.initials}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{record.name}</h1>
                    <p className="text-sm text-gray-500">
                      {record.memberType} • ID: {record.memberId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount + Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8 border-y border-gray-200">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Contribution Amount
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#137fec]">{record.amount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Date Received
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{record.dateReceived}</p>
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Category Allocation
                </p>
                <div
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${record.categoryBg}`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-lg font-black tracking-wide uppercase">{record.category}</span>
                </div>
              </div>

              {/* Notes */}
              {record.notes && (
                <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
                  <p className="text-xs font-medium text-gray-500 italic">{record.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right — Metadata & Status */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 border border-gray-200">
            <h3 className="text-sm font-black mb-6">Transaction Metadata</h3>
            <div className="space-y-6">
              {/* Reference Number */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Reference Number
                </p>
                <p className="text-sm font-mono font-bold bg-gray-100 px-2 py-1 rounded inline-block">
                  {record.refNumber}
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Payment Method
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{record.paymentMethod}</p>
                    <p className="text-[10px] text-gray-500">{record.paymentNote}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Status Timeline
                </p>
                <div className="relative space-y-6 pl-6 border-l-2 border-gray-200">
                  {record.timeline.map((step, i) => (
                    <div key={i} className="relative">
                      <span
                        className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full ${step.color} ring-4 ring-white flex items-center justify-center`}
                      >
                        {step.pending && (
                          <AlertTriangle className="w-2.5 h-2.5 text-white" />
                        )}
                      </span>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            step.pending ? 'text-orange-600' : 'text-gray-900'
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[10px] text-gray-500">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Accounting Note */}
          {record.accountingNote && (
            <div className="rounded-2xl bg-orange-50 p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h4 className="text-xs font-bold text-orange-600">Accounting Note</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{record.accountingNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
