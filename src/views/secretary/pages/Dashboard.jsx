import {
  Users,
  UserPlus,
  Banknote,
  Calendar,
  Clock,
  MapPin,
  Zap,
  PlusCircle,
  FileText,
  CheckCircle,
  Mail,
  TrendingUp,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Members',
    value: '1,284',
    icon: <Users className="w-4 h-4" />,
    iconBg: 'bg-[#137fec]/10 text-[#137fec]',
    trend: { text: '12% increase', up: true },
  },
  {
    label: 'Guest Registrations',
    value: '42',
    icon: <UserPlus className="w-4 h-4" />,
    iconBg: 'bg-violet-50 text-violet-500',
    trend: { text: '8 new this week', up: true },
  },
  {
    label: 'Pending Rentals',
    value: '₱12,450',
    icon: <Banknote className="w-4 h-4" />,
    iconBg: 'bg-amber-50 text-amber-500',
    trend: { text: '5 overdue', up: false },
  },
  {
    label: "Today's Events",
    value: '3',
    icon: <Calendar className="w-4 h-4" />,
    iconBg: 'bg-emerald-50 text-emerald-500',
    trend: { text: 'Scheduled today', neutral: true },
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
    icon: <UserPlus className="w-3.5 h-3.5" />,
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'New Member Registered',
    description: 'Robert Fox joined the congregation.',
    time: '10 mins ago',
  },
  {
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    iconBg: 'bg-green-100 text-green-600',
    title: 'Event Check-in',
    description: 'Sarah Miller checked into Morning Devotion.',
    time: '24 mins ago',
  },
  {
    icon: <Banknote className="w-3.5 h-3.5" />,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Payment Recorded',
    description: 'Hall rental payment for Youth Night confirmed.',
    time: '1 hour ago',
  },
  {
    icon: <Mail className="w-3.5 h-3.5" />,
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#137fec] to-[#2a91f5] p-6 sm:p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-1">Welcome back, Jane!</h2>
          <p className="opacity-90 font-medium">
            Here's what's happening in your ministry today.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            {today}
          </div>
        </div>
        {/* Decorative icon */}
        <span className="absolute -right-8 -bottom-8 text-[200px] leading-none opacity-10 rotate-12 select-none">
          ⛪
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-normal text-gray-500">{stat.label}</p>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                {stat.icon}
              </div>
            </div>
            {/* Value */}
            <p className="text-3xl font-semibold text-gray-900 tracking-tight">{stat.value}</p>
            {/* Trend */}
            {stat.trend && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-1.5">
                <span className={`text-xs flex items-center gap-1 font-normal ${
                  stat.trend.neutral ? 'text-gray-400' : stat.trend.up ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {!stat.trend.neutral && (
                    <TrendingUp className={`w-3.5 h-3.5 ${!stat.trend.up ? 'rotate-180' : ''}`} />
                  )}
                  {stat.trend.text}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#137fec]" />
                Today's Schedule
              </h3>
              <button className="text-xs font-medium text-[#137fec] hover:underline cursor-pointer">
                View Calendar
              </button>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
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
                      className={`text-[10px] font-normal uppercase ${
                        event.active ? 'text-[#137fec]' : 'text-gray-500'
                      }`}
                    >
                      {event.time}
                    </span>
                    <span
                      className={`text-xs font-normal ${
                        event.active ? 'text-[#137fec]' : 'text-gray-500'
                      }`}
                    >
                      {event.period}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-normal rounded uppercase ${event.statusColor}`}
                  >
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#137fec]" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-[#137fec] text-white hover:-translate-y-1 transition-all cursor-pointer">
                <UserPlus className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="text-xs sm:text-sm font-medium">Add New Member</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#137fec]/10 text-[#137fec] hover:border-[#137fec] transition-all cursor-pointer">
                <PlusCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="text-xs sm:text-sm font-medium">Create Event</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#137fec]/10 text-[#137fec] hover:border-[#137fec] transition-all cursor-pointer">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="text-xs sm:text-sm font-medium">Record Payment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column — Recent Activity */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col h-full">
            <div className="p-5 sm:p-6 border-b border-gray-200">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#137fec]" />
                Recent Activity
              </h3>
            </div>
            <div className="flex-1 p-5 sm:p-6 space-y-6">
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
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                    <span className="text-[10px] text-gray-400 font-normal mt-1 inline-block uppercase tracking-tight">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 sm:p-6 border-t border-gray-200">
              <button className="w-full py-2 bg-gray-50 rounded-lg text-xs font-normal text-gray-500 hover:bg-gray-100 transition-all cursor-pointer">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
