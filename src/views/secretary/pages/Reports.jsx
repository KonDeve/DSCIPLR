import {
  HiOutlineShare,
  HiOutlineDocumentText,
  HiOutlineTrendingUp,
  HiOutlineUserAdd,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiOutlineLocationMarker,
} from 'react-icons/hi';

// ---- Demo data ----
const GUESTS = [
  {
    name: 'Thomas Hudson',
    initials: 'TH',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-[#137fec]',
    date: 'Oct 12, 2023',
    contact: 't.hudson@email.com',
    status: 'Follow-up',
    statusColor: 'text-amber-600 bg-amber-50',
  },
  {
    name: 'Sarah Chen',
    initials: 'SC',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-600',
    date: 'Oct 11, 2023',
    contact: '+1 234 567 890',
    status: 'New',
    statusColor: 'text-green-500 bg-green-50',
  },
  {
    name: 'Lucas Meyer',
    initials: 'LM',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-600',
    date: 'Oct 08, 2023',
    contact: 'l.meyer@work.com',
    status: 'Member Path',
    statusColor: 'text-blue-500 bg-blue-50',
  },
];

const NEW_MEMBERS = [
  { name: 'Amanda Brooks', time: 'Registered 2d ago', iconBg: 'bg-blue-500/10', iconText: 'text-[#137fec]' },
  { name: 'Julian Vane', time: 'Registered 5d ago', iconBg: 'bg-purple-500/10', iconText: 'text-purple-600' },
  { name: 'Kira Yoshikazu', time: 'Registered 1w ago', iconBg: 'bg-orange-500/10', iconText: 'text-orange-600' },
  { name: 'Liam Fletcher', time: 'Registered 1w ago', iconBg: 'bg-green-500/10', iconText: 'text-green-600' },
];

const BOOKINGS = [
  {
    month: 'OCT',
    day: '22',
    dayColor: 'text-[#137fec]',
    dateBg: 'bg-blue-50',
    title: 'Youth Summit 2023',
    venue: 'Sanctuary',
    venueIcon: <HiOutlineLocationMarker className="w-3 h-3" />,
    time: '09:00 AM',
  },
  {
    month: 'OCT',
    day: '24',
    dayColor: 'text-orange-600',
    dateBg: 'bg-orange-50',
    title: 'Community Outreach Trip',
    venue: 'Van #2',
    venueIcon: <HiOutlineLocationMarker className="w-3 h-3" />,
    time: '07:00 AM',
  },
  {
    month: 'OCT',
    day: '28',
    dayColor: 'text-[#137fec]',
    dateBg: 'bg-blue-50',
    title: 'Wedding Ceremony: Doe & Smith',
    venue: 'Sanctuary',
    venueIcon: <HiOutlineLocationMarker className="w-3 h-3" />,
    time: '02:30 PM',
  },
];

const BAR_CHART = [
  { label: 'Sunday Service', value: '1.2k', height: '85%', color: 'bg-[#137fec]', bgColor: 'bg-[#137fec]/20' },
  { label: 'Youth', value: '450', height: '35%', color: 'bg-purple-500', bgColor: 'bg-purple-100' },
  { label: 'Outreach', value: '280', height: '22%', color: 'bg-orange-500', bgColor: 'bg-orange-100' },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HiOutlineTrendingUp className="w-4 h-4 text-[#137fec]" />
            <span className="text-[10px] font-bold text-[#137fec] uppercase tracking-widest">
              Operational Intelligence
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            Ministry Reports Dashboard
          </h2>
          <p className="text-gray-500">
            Consolidated analytics for church operations and community engagement.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
            <HiOutlineShare className="w-5 h-5" />
            Share Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#137fec] text-white rounded-lg text-sm font-semibold hover:bg-[#137fec]/90 transition-colors shadow-lg shadow-blue-500/20 cursor-pointer">
            <HiOutlineDocumentText className="w-5 h-5" />
            Generate PDF
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#137fec]">
              <HiOutlineTrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
              +12%
            </span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            Average Weekly Attendance
          </p>
          <h4 className="text-2xl font-extrabold">842</h4>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <HiOutlineUserAdd className="w-5 h-5" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            Guest-to-Member Rate
          </p>
          <h4 className="text-2xl font-extrabold">18.5%</h4>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
              <HiOutlineShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
              Stable
            </span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            Total Active Members
          </p>
          <h4 className="text-2xl font-extrabold">1,248</h4>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Trends */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-base">Attendance Trends (Last 6 Months)</h3>
            <select className="bg-gray-50 border-none text-[10px] font-bold uppercase tracking-wider rounded-lg focus:ring-0 cursor-pointer py-1 px-2">
              <option>All Services</option>
            </select>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-end min-h-[300px]">
            <div className="relative h-48 w-full border-b border-l border-gray-100 flex items-end justify-between px-2">
              <svg
                className="absolute inset-0 w-full h-full p-4"
                preserveAspectRatio="none"
                viewBox="0 0 100 40"
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#137fec" />
                    <stop offset="100%" stopColor="white" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,35 Q10,32 20,38 T40,20 T60,25 T80,10 T100,5"
                  fill="none"
                  stroke="#137fec"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0,35 Q10,32 20,38 T40,20 T60,25 T80,10 T100,5 L100,40 L0,40 Z"
                  fill="url(#areaGradient)"
                  opacity="0.1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-gray-500 uppercase">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Event Attendance Comparison */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-bold text-base">Event Attendance Comparison</h3>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex-1 flex items-end justify-around gap-4 min-h-[220px]">
              {BAR_CHART.map((bar) => (
                <div
                  key={bar.label}
                  className="flex flex-col items-center gap-3 w-full max-w-[60px]"
                >
                  <span className="text-xs font-bold">{bar.value}</span>
                  <div className={`w-full h-40 ${bar.bgColor} rounded-t-lg relative`}>
                    <div
                      className={`absolute bottom-0 left-0 w-full ${bar.color} rounded-t-lg`}
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-center text-gray-500 uppercase leading-tight">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Guest List Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-base">New Guest List</h3>
            <button className="text-[10px] font-bold text-[#137fec] bg-[#137fec]/10 px-3 py-1 rounded hover:bg-[#137fec]/20 transition-colors cursor-pointer">
              Export Table
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Visit Date</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {GUESTS.map((g) => (
                  <tr
                    key={g.name}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${g.avatarBg} flex items-center justify-center ${g.avatarText} font-bold text-[10px]`}
                        >
                          {g.initials}
                        </div>
                        <span className="font-bold text-sm">{g.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{g.date}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">{g.contact}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-[10px] font-bold ${g.statusColor} px-2 py-0.5 rounded-full`}
                      >
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {/* New Registered Members */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-base">New Registered Members</h3>
              <span className="text-[10px] font-bold text-[#137fec] bg-[#137fec]/10 px-2 py-1 rounded">
                This Month
              </span>
            </div>
            <div className="p-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {NEW_MEMBERS.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-transparent hover:border-[#137fec]/20 transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-full ${m.iconBg} flex items-center justify-center ${m.iconText}`}
                    >
                      <HiOutlineUser className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold truncate">{m.name}</p>
                      <p className="text-[10px] text-gray-500">{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings for the Month */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-base">Booking for the Month</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#137fec]" /> Sanctuary
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Vehicle
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {BOOKINGS.map((b) => (
                  <div
                    key={b.title}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${b.dateBg} flex flex-col items-center justify-center`}
                      >
                        <span className="text-[10px] font-extrabold leading-none">
                          {b.month}
                        </span>
                        <span className={`text-sm font-extrabold ${b.dayColor}`}>
                          {b.day}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{b.title}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          {b.venueIcon} {b.venue}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">
                      {b.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
