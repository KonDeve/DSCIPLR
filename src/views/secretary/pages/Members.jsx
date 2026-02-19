import { useState } from 'react';
import {
  Download,
  UserPlus,
  MoreVertical,
  X,
  BadgeCheck,
  Users,
  CircleUser,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  ShieldCheck,
  Image,
  IdCard,
  Check,
  Save,
} from 'lucide-react';

// ---- Demo data ----
const MEMBERS = [
  {
    id: '#MEM-88291',
    name: 'John Doe',
    initials: 'JD',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-[#137fec]',
    type: 'Member',
    typeBg: 'bg-blue-50 text-blue-600',
    joinDate: 'Oct 12, 2022',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8901',
    status: 'Active',
    statusColor: 'text-green-500',
    dotColor: 'bg-green-500',
  },
  {
    id: '#GST-90123',
    name: 'Alice Smith',
    initials: 'AS',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-600',
    type: 'Guest',
    typeBg: 'bg-purple-50 text-purple-600',
    joinDate: 'Feb 05, 2024',
    email: 'alice.s@domain.com',
    phone: '+1 456-789-0123',
    status: 'Active',
    statusColor: 'text-green-500',
    dotColor: 'bg-green-500',
  },
  {
    id: '#MEM-85210',
    name: 'Robert Johnson',
    initials: 'RJ',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-600',
    type: 'Member',
    typeBg: 'bg-blue-50 text-blue-600',
    joinDate: 'May 19, 2021',
    email: 'rob.j@example.net',
    phone: '+1 987-654-3210',
    status: 'Inactive',
    statusColor: 'text-slate-400',
    dotColor: 'bg-slate-300',
  },
  {
    id: '#GST-91044',
    name: 'Emily Miller',
    initials: 'EM',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-600',
    type: 'Guest',
    typeBg: 'bg-purple-50 text-purple-600',
    joinDate: 'Mar 11, 2024',
    email: 'emily.m@email.com',
    phone: '+1 321-456-7890',
    status: 'Active',
    statusColor: 'text-green-500',
    dotColor: 'bg-green-500',
  },
];

export default function Members() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [regType, setRegType] = useState('member');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BadgeCheck className="w-4 h-4 text-[#137fec]" />
            <span className="text-[10px] font-bold text-[#137fec] uppercase tracking-widest">
              Administrative Hub
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Member &amp; Guest Directory
          </h2>
          <p className="text-gray-500">
            Manage your church community, track memberships, and onboard new guests.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="w-5 h-5" />
            Export List
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#137fec] text-white rounded-lg text-sm font-semibold hover:bg-[#137fec]/90 transition-colors cursor-pointer"
          >
            <UserPlus className="w-5 h-5" />
            + Add New
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Members */}
        <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
              +2.4%
            </span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            Total Members
          </p>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold">1,248</h4>
        </div>

        {/* Active Guests */}
        <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <CircleUser className="w-5 h-5" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            Active Guests
          </p>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold">156</h4>
        </div>

        {/* New Registrations */}
        <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              New
            </span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            New Registrations (This Month)
          </p>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold">42</h4>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Filters Bar */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <span className="text-xs font-bold text-gray-500 uppercase">Filter:</span>
              <select className="border-none bg-transparent p-0 text-sm font-semibold focus:ring-0 cursor-pointer">
                <option>All Types</option>
                <option>Member</option>
                <option>Guest</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <span className="text-xs font-bold text-gray-500 uppercase">Status:</span>
              <select className="border-none bg-transparent p-0 text-sm font-semibold focus:ring-0 cursor-pointer">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Showing 1-10 of 1,404 entries
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Member ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MEMBERS.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-[#137fec]">
                    {m.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${m.avatarBg} flex items-center justify-center ${m.avatarText} font-bold text-[10px]`}
                      >
                        {m.initials}
                      </div>
                      <span className="font-bold text-sm">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 ${m.typeBg} text-[10px] font-bold rounded uppercase`}
                    >
                      {m.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{m.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium">{m.email}</span>
                      <span className="text-[10px] text-gray-500">{m.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 ${m.statusColor} font-bold text-[10px] uppercase`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${m.dotColor}`} />
                      {m.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white transition-colors cursor-pointer disabled:opacity-50">
            Previous
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === p
                    ? 'bg-[#137fec] text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-gray-500">...</span>
            <button
              onClick={() => setCurrentPage(141)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                currentPage === 141
                  ? 'bg-[#137fec] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              141
            </button>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>

      {/* Register New Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base sm:text-lg xl:text-xl font-extrabold tracking-tight">Register New Record</h3>
                <p className="text-gray-500 text-xs">Complete the steps below to add a member or guest to the registry.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body: Sidebar + Form */}
            <div className="flex-1 overflow-hidden flex">
              {/* Step Sidebar */}
              <div className="w-56 lg:w-64 hidden md:block border-r border-gray-200 p-8 space-y-8 bg-gray-50/30 shrink-0">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#137fec] text-white flex items-center justify-center font-bold text-xs">1</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#137fec]">Personal</p>
                    <p className="text-[10px] text-gray-500">Identity Details</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-xs">2</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Contact</p>
                    <p className="text-[10px] text-gray-500">Reachability</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-xs">3</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Church</p>
                    <p className="text-[10px] text-gray-500">Affiliation</p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-xs">4</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Files</p>
                    <p className="text-[10px] text-gray-500">Verification</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-10">
                  {/* Section 1: Personal Information */}
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <User className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-bold text-sm sm:text-base uppercase tracking-tight">Section 1: Personal Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                          placeholder="Johnathan Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date of Birth</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer">
                          <option value="">Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marital Status</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer">
                          <option>Single</option>
                          <option>Married</option>
                          <option>Widowed</option>
                          <option>Divorced</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Section 2: Contact Information */}
                  <section>
                    <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-gray-200">
                      <Mail className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-bold text-sm sm:text-base uppercase tracking-tight">Section 2: Contact Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                          placeholder="john.doe@email.com"
                        />
                      </div>
                      <div className="col-span-full space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Residential Address</label>
                        <textarea
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all resize-none"
                          placeholder="Enter full address..."
                          rows="3"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Church Specifics */}
                  <section>
                    <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-gray-200">
                      <Building2 className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-bold text-sm sm:text-base uppercase tracking-tight">Section 3: Church Specifics</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Registration Type</label>
                        <div className="flex gap-2">
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              name="regType"
                              className="hidden peer"
                              checked={regType === 'member'}
                              onChange={() => setRegType('member')}
                            />
                            <div className="py-2.5 text-center rounded-lg border border-gray-200 peer-checked:bg-[#137fec]/10 peer-checked:border-[#137fec] peer-checked:text-[#137fec] transition-all text-xs font-bold">
                              Member
                            </div>
                          </label>
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              name="regType"
                              className="hidden peer"
                              checked={regType === 'guest'}
                              onChange={() => setRegType('guest')}
                            />
                            <div className="py-2.5 text-center rounded-lg border border-gray-200 peer-checked:bg-[#137fec]/10 peer-checked:border-[#137fec] peer-checked:text-[#137fec] transition-all text-xs font-bold">
                              Guest
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Join/Visit Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer">
                          <option>None / General</option>
                          <option>Youth Ministry</option>
                          <option>Worship Team</option>
                          <option>Ushering</option>
                          <option>Media &amp; Tech</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Section 4: Attachments */}
                  <section>
                    <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-gray-200">
                      <ShieldCheck className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-bold text-sm sm:text-base uppercase tracking-tight">Section 4: Attachments</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile Photo</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                          <Image className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Upload Portrait</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Identification Document (ID)</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                          <IdCard className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Upload ID Front/Back</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-[#137fec] font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                Secure Registry
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold border border-gray-200 hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#137fec] text-white hover:bg-[#137fec]/90 transition-all flex items-center gap-2 cursor-pointer">
                  <Save className="w-5 h-5" />
                  Save Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
