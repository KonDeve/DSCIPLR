import { useState } from 'react';
import {
  Download,
  Plus,
  Calendar,
  List,
  QrCode,
  MoreVertical,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';

// ---- Static demo data ----
const EVENTS = [
  {
    title: 'Main Sunday Service',
    venue: 'Main Sanctuary',
    date: 'Oct 8, 2023 • 09:00 AM',
    color: 'bg-[#137fec]',
    selected: true,
  },
  {
    title: 'Elderly Group Morning Prayer',
    venue: 'Prayer Room B',
    date: 'Oct 3, 2023 • 07:00 AM',
    color: 'bg-amber-500',
  },
  {
    title: 'Community Outreach Drive',
    venue: 'East District Plaza',
    date: 'Oct 5, 2023 • 02:00 PM',
    color: 'bg-green-500',
  },
  {
    title: 'Youth Night Fellowship',
    venue: 'Social Hall',
    date: 'Oct 11, 2023 • 06:00 PM',
    color: 'bg-purple-500',
  },
];

const ATTENDEES = [
  { name: 'Samuel Richards', initials: 'SR', time: '08:52 AM', status: 'On Time', statusColor: 'bg-green-100 text-green-600', memberType: 'Regular Member' },
  { name: 'Maria Garcia', initials: 'MG', time: '08:55 AM', status: 'On Time', statusColor: 'bg-green-100 text-green-600', memberType: 'Regular Member' },
  { name: 'Ethan Thomas', initials: 'ET', time: '09:05 AM', status: 'Late', statusColor: 'bg-amber-100 text-amber-600', memberType: 'Guest' },
  { name: 'Lucas White', initials: 'LW', time: '09:12 AM', status: 'On Time', statusColor: 'bg-green-100 text-green-600', memberType: 'New Convert' },
  { name: 'Sarah Miller', initials: 'SM', time: '09:15 AM', status: 'On Time', statusColor: 'bg-green-100 text-green-600', memberType: 'Regular Member' },
];

// Calendar event entries keyed by day number
const CALENDAR_EVENTS = {
  1:  [{ label: '09:00 Service', bg: 'bg-[#137fec]/10', border: 'border-[#137fec]', text: 'text-[#137fec]' }],
  3:  [{ label: 'Morning Prayer', bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-600' }],
  5:  [{ label: 'Outreach Drive', bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-600' }],
  8:  [{ label: 'Sunday Service', bg: 'bg-[#137fec]', border: '', text: 'text-white', filled: true }],
  10: [{ label: 'Night Prayer', bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-600' }],
  11: [{ label: 'Youth Night', bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-600' }],
  15: [{ label: 'Sunday Service', bg: 'bg-[#137fec]/10', border: 'border-[#137fec]', text: 'text-[#137fec]' }],
  19: [{ label: 'Missions Trip', bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-600' }],
};

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, outside: true });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, outside: false });
  }
  // Fill remaining to complete grid (multiples of 7)
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - firstDay - daysInMonth + 1, outside: true });
  }
  return cells;
}

export default function Events() {
  const [view, setView] = useState('list');
  const [showQR, setShowQR] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [calYear, setCalYear] = useState(2023);
  const [calMonth, setCalMonth] = useState(9); // October = 9 (0-indexed)

  const calendarDays = getCalendarDays(calYear, calMonth);
  const todayHighlight = 8; // highlight day 8 as "today" in demo

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Event &amp; Attendance Manager
          </h2>
          <p className="text-gray-500">
            Real-time monitoring of event attendance and check-in status.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="w-5 h-5" />
            Export PDF
          </button>
          <button
            onClick={() => setShowCreateEvent(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#137fec] text-white rounded-lg text-sm font-bold hover:bg-[#137fec]/90 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Create New Event
          </button>
        </div>
      </div>

      {/* View Toggle & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="inline-flex p-1 bg-gray-200/50 rounded-xl">
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              view === 'calendar'
                ? 'bg-white text-[#137fec] font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Calendar View
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              view === 'list'
                ? 'bg-white text-[#137fec] font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <List className="w-5 h-5" />
            List View
          </button>
        </div>

        <div className="flex items-center gap-3">
          {view === 'calendar' ? (
            <>
              {/* Month navigator */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-50 text-gray-500 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold border-x border-gray-200">
                  {MONTH_NAMES[calMonth]} {calYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-50 text-gray-500 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <select className="bg-white border border-gray-200 rounded-lg text-sm px-4 py-2 focus:ring-[#137fec] cursor-pointer">
                <option>All Event Types</option>
                <option>Sunday Service</option>
                <option>Prayer Meeting</option>
                <option>Outreach</option>
              </select>
            </>
          ) : (
            <>
              <select className="bg-white border border-gray-200 rounded-lg text-sm px-4 py-2 focus:ring-[#137fec] cursor-pointer">
                <option>All Event Types</option>
                <option>Sunday Service</option>
                <option>Small Group</option>
                <option>Outreach</option>
              </select>
              <select className="bg-white border border-gray-200 rounded-lg text-sm px-4 py-2 focus:ring-[#137fec] cursor-pointer">
                <option>October 2023</option>
                <option>November 2023</option>
                <option>December 2023</option>
              </select>
            </>
          )}
        </div>
      </div>

      {/* ===== CALENDAR VIEW ===== */}
      {view === 'calendar' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {DAYS_OF_WEEK.map((d) => (
              <div
                key={d}
                className="py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
            {calendarDays.map((cell, i) => {
              const events = !cell.outside ? CALENDAR_EVENTS[cell.day] || [] : [];
              const isToday = !cell.outside && cell.day === todayHighlight;
              return (
                <div
                  key={i}
                  className={`min-h-[100px] md:min-h-[120px] p-2 flex flex-col gap-1 ${
                    cell.outside
                      ? 'bg-gray-50/50'
                      : isToday
                        ? 'bg-[#137fec]/5 border border-[#137fec]/20'
                        : ''
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      cell.outside
                        ? 'text-gray-400 opacity-40'
                        : isToday
                          ? 'text-[#137fec]'
                          : 'text-gray-900'
                    }`}
                  >
                    {cell.day}
                  </span>
                  {events.map((ev, j) => (
                    <div
                      key={j}
                      className={`px-2 py-1 text-[10px] font-bold truncate rounded ${
                        ev.filled
                          ? `${ev.bg} ${ev.text}`
                          : `${ev.bg} border-l-2 ${ev.border} ${ev.text}`
                      }`}
                    >
                      {ev.label}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== LIST VIEW ===== */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Event Title
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Date &amp; Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {EVENTS.map((event, idx) => (
                  <tr
                    key={event.title}
                    onClick={() => setSelectedEvent(idx)}
                    className={`hover:bg-[#137fec]/5 cursor-pointer transition-colors ${
                      selectedEvent === idx ? 'bg-[#137fec]/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${event.color}`} />
                        <span
                          className={`text-sm ${
                            selectedEvent === idx ? 'font-bold' : 'font-semibold'
                          }`}
                        >
                          {event.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{event.venue}</td>
                    <td className={`px-6 py-4 text-sm ${selectedEvent === idx ? 'font-medium' : ''}`}>
                      {event.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">Showing 4 of 24 events</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-semibold border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                Prev
              </button>
              <button className="px-3 py-1 text-xs font-semibold border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Check-ins */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2 mb-1">
              Live Check-ins
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase ml-2 px-2 py-0.5 bg-gray-100 rounded">
                {EVENTS[selectedEvent].title}
              </span>
            </h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
              Recent Attendee Activity • 12 Active Today
            </p>
          </div>
          <button
            onClick={() => setShowQR(true)}
            className="px-4 py-2 bg-[#137fec] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#137fec]/90 transition-all cursor-pointer"
          >
            <QrCode className="w-5 h-5" />
            Generate QR Check-in
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Attendee Name
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Time of Arrival
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Member Type
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ATTENDEES.map((a) => (
                <tr
                  key={a.name}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full shrink-0 border border-[#137fec]/20 bg-[#137fec]/10 flex items-center justify-center text-[#137fec] font-bold text-xs">
                        {a.initials}
                      </div>
                      <span className="text-sm font-bold">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{a.time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${a.statusColor}`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{a.memberType}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#137fec] hover:text-[#137fec]/70 cursor-pointer">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Info className="w-4 h-4" />
            <span>System automatically updates every 60 seconds.</span>
          </div>
          <button className="text-xs font-bold text-[#137fec] hover:underline cursor-pointer">
            View All Attendance History
          </button>
        </div>
      </div>

      {/* Create New Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base sm:text-lg xl:text-xl font-bold">Create New Event</h3>
                <p className="text-sm text-gray-500">Schedule a new activity for the congregation.</p>
              </div>
              <button
                onClick={() => setShowCreateEvent(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-6">
                {/* Event Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Event Title</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                    placeholder="e.g. Annual Youth Convention 2024"
                  />
                </div>

                {/* Event Type & Venue */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Event Type</label>
                    <select className="w-full bg-gray-50 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer">
                      <option>Sunday Service</option>
                      <option>Youth</option>
                      <option>Mid-week</option>
                      <option>Special</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Venue</label>
                    <select className="w-full bg-gray-50 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer">
                      <option>Main Sanctuary</option>
                      <option>Fellowship Hall</option>
                      <option>Youth Center</option>
                      <option>Boardroom A</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Range */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Date &amp; Time Range</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input
                        type="text"
                        className="w-full bg-gray-50 border-none rounded-lg py-3 pl-9 pr-4 text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                        placeholder="Start Date & Time"
                      />
                    </div>
                    <span className="text-gray-500 text-sm text-center">to</span>
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input
                        type="text"
                        className="w-full bg-gray-50 border-none rounded-lg py-3 pl-9 pr-4 text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                        placeholder="End Date & Time"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                  <textarea
                    className="w-full bg-gray-50 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#137fec] transition-all resize-none"
                    rows="5"
                    placeholder="Describe the purpose and agenda of this event..."
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowCreateEvent(false)}
                className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-8 py-2.5 bg-[#137fec] text-white text-sm font-bold rounded-lg hover:bg-[#137fec]/90 transition-all flex items-center gap-2 cursor-pointer">
                <Plus className="w-5 h-5" />
                Publish Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowQR(false)}
                  className="text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Check-in QR Code</h3>
              <p className="text-gray-500 text-sm mb-8">
                Scan to verify attendance for:{' '}
                <br />
                <span className="font-bold text-gray-900">
                  {EVENTS[selectedEvent].title}
                </span>
              </p>
              {/* QR placeholder */}
              <div className="bg-white p-8 rounded-2xl border-4 border-[#137fec]/20 inline-block mb-8 relative">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-300" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-full py-3 bg-[#137fec] text-white rounded-xl font-bold cursor-pointer hover:bg-[#137fec]/90 transition-colors">
                  Download PNG
                </button>
                <button className="w-full py-3 border border-gray-200 rounded-xl font-semibold cursor-pointer hover:bg-gray-50 transition-colors">
                  Print QR Poster
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-6 italic">
                This QR code expires in 2 hours. Secure check-in active.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
