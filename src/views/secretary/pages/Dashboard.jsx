import {
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineCash,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineLightningBolt,
  HiOutlinePlusCircle,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineMail,
  HiOutlineTrendingUp,
} from 'react-icons/hi';

const stats = [
  {
    label: 'Total Members',
    value: '1,284',
    icon: <HiOutlineUsers className="w-5 h-5" />,
    badge: { text: '12%', icon: <HiOutlineTrendingUp className="w-3 h-3" />, color: 'text-green-500' },
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Guest Registrations',
    value: '42',
    icon: <HiOutlineUserAdd className="w-5 h-5" />,
    badge: { text: '+8 new', color: 'text-green-500' },
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Pending Rentals',
    value: '₱12,450',
    icon: <HiOutlineCash className="w-5 h-5" />,
    badge: { text: '5 overdue', color: 'text-red-500' },
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    label: "Today's Events",
    value: '3 Scheduled',
    icon: <HiOutlineCalendar className="w-5 h-5" />,
    iconBg: 'bg-green-100 text-green-600',
  },
];

const schedule = [
  {
    time: '09:00',
    period: 'AM',
    title: 'Monday Morning Devotion',
    location: 'Main Sanctuary',
    status: 'In Progress',
    statusColor: 'bg-green-100 text-green-600',
    active: true,
  },
  {
    time: '01:30',
    period: 'PM',
    title: 'Leadership Briefing',
    location: 'Conference Room A',
    status: 'Upcoming',
    statusColor: 'bg-gray-100 text-gray-500',
    active: false,
  },
  {
    time: '06:00',
    period: 'PM',
    title: 'Choir Rehearsal',
    location: 'Social Hall',
    status: 'Upcoming',
    statusColor: 'bg-gray-100 text-gray-500',
    active: false,
  },
];

const activities = [
  {
    icon: <HiOutlineUserAdd className="w-3.5 h-3.5" />,
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'New Member Registered',
    description: 'Robert Fox joined the congregation.',
    time: '10 mins ago',
  },
  {
    icon: <HiOutlineCheckCircle className="w-3.5 h-3.5" />,
    iconBg: 'bg-green-100 text-green-600',
    title: 'Event Check-in',
    description: 'Sarah Miller checked into Morning Devotion.',
    time: '24 mins ago',
  },
  {
    icon: <HiOutlineCash className="w-3.5 h-3.5" />,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Payment Recorded',
    description: 'Hall rental payment for Youth Night confirmed.',
    time: '1 hour ago',
  },
  {
    icon: <HiOutlineMail className="w-3.5 h-3.5" />,
    iconBg: 'bg-purple-100 text-purple-600',
    title: 'Newsletter Sent',
    description: 'Weekly bulletin dispatched to 842 recipients.',
    time: '3 hours ago',
  },
];

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#137fec] to-[#2a91f5] p-8 text-white shadow-xl shadow-blue-500/10">
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-1">Welcome back, Jane!</h2>
          <p className="opacity-90 font-medium">
            Here's what's happening in your ministry today.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
            <HiOutlineCalendar className="w-4 h-4" />
            {today}
          </div>
        </div>
        {/* Decorative icon */}
        <span className="absolute -right-8 -bottom-8 text-[200px] leading-none opacity-10 rotate-12 select-none">
          ⛪
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}
              >
                {stat.icon}
              </div>
              {stat.badge && (
                <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.badge.color}`}>
                  {stat.badge.icon}
                  {stat.badge.text}
                </span>
              )}
            </div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              {stat.label}
            </h4>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <HiOutlineClock className="w-5 h-5 text-[#137fec]" />
                Today's Schedule
              </h3>
              <button className="text-xs font-bold text-[#137fec] hover:underline cursor-pointer">
                View Calendar
              </button>
            </div>
            <div className="p-6 space-y-4">
              {schedule.map((event) => (
                <div
                  key={event.title}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg min-w-[70px] ${
                      event.active ? 'bg-[#137fec]/10' : 'bg-gray-100'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase ${
                        event.active ? 'text-[#137fec]' : 'text-gray-500'
                      }`}
                    >
                      {event.time}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        event.active ? 'text-[#137fec]' : 'text-gray-500'
                      }`}
                    >
                      {event.period}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">{event.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                      {event.location}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${event.statusColor}`}
                  >
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <HiOutlineLightningBolt className="w-5 h-5 text-[#137fec]" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#137fec] text-white shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-all cursor-pointer">
                <HiOutlineUserAdd className="w-8 h-8" />
                <span className="text-sm font-bold">Add New Member</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border-2 border-[#137fec]/10 text-[#137fec] hover:border-[#137fec] transition-all cursor-pointer">
                <HiOutlinePlusCircle className="w-8 h-8" />
                <span className="text-sm font-bold">Create Event</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border-2 border-[#137fec]/10 text-[#137fec] hover:border-[#137fec] transition-all cursor-pointer">
                <HiOutlineDocumentText className="w-8 h-8" />
                <span className="text-sm font-bold">Record Payment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column — Recent Activity */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <HiOutlineClock className="w-5 h-5 text-[#137fec]" />
                Recent Activity
              </h3>
            </div>
            <div className="flex-1 p-6 space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline line */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-gray-200" />
                  )}
                  {/* Icon dot */}
                  <div
                    className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center z-10 ${activity.iconBg}`}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                    <span className="text-[10px] text-gray-400 font-medium mt-1 inline-block uppercase tracking-tight">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200">
              <button className="w-full py-2 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
