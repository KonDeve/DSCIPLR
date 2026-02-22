import { useState, useEffect, useRef } from 'react';
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
  Building2,
  ShieldCheck,
  Image,
  IdCard,
  Save,
  Search,
  AlertCircle,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { MemberController } from '@/controllers';

// ������ helpers ��������������������������������������������������������������������������������������������������������������������������������

const PAGE_SIZE = 10;

const EMPTY_FORM = {
  full_name: '',
  date_of_birth: '',
  gender: '',
  marital_status: 'single',
  phone: '',
  email: '',
  address: '',
  member_type: 'member',
  membership_date: '',
  department: '',
};

function getInitials(name = '') {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const AVATAR_PALETTES = [
  { bg: 'bg-blue-100', text: 'text-blue-600' },
  { bg: 'bg-purple-100', text: 'text-purple-600' },
  { bg: 'bg-green-100', text: 'text-green-600' },
  { bg: 'bg-orange-100', text: 'text-orange-600' },
  { bg: 'bg-rose-100', text: 'text-rose-600' },
  { bg: 'bg-teal-100', text: 'text-teal-600' },
];

function getAvatarColors(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

function formatDate(iso) {
  if (!iso) return '��';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

function statusStyle(status) {
  switch (status) {
    case 'active':
      return { text: 'text-green-600', dot: 'bg-green-500' };
    case 'inactive':
      return { text: 'text-slate-400', dot: 'bg-slate-300' };
    case 'deceased':
      return { text: 'text-gray-500', dot: 'bg-gray-400' };
    case 'transferred':
      return { text: 'text-orange-500', dot: 'bg-orange-400' };
    default:
      return { text: 'text-gray-500', dot: 'bg-gray-400' };
  }
}

// --- demo / fallback data ---
const DEMO_MEMBERS = [
  {
    id: 'demo-1', member_id: 'MEM-88291', full_name: 'John Doe',
    member_type: 'member', membership_date: '2022-10-12',
    email: 'john.doe@email.com', phone: '+1 234-567-8901',
    status: 'active', profile_image_url: null, created_at: '2022-10-12T00:00:00Z',
  },
  {
    id: 'demo-2', member_id: 'GST-90123', full_name: 'Alice Smith',
    member_type: 'guest', membership_date: '2024-02-05',
    email: 'alice.s@domain.com', phone: '+1 456-789-0123',
    status: 'active', profile_image_url: null, created_at: '2024-02-05T00:00:00Z',
  },
  {
    id: 'demo-3', member_id: 'MEM-85210', full_name: 'Robert Johnson',
    member_type: 'member', membership_date: '2021-05-19',
    email: 'rob.j@example.net', phone: '+1 987-654-3210',
    status: 'inactive', profile_image_url: null, created_at: '2021-05-19T00:00:00Z',
  },
  {
    id: 'demo-4', member_id: 'GST-91044', full_name: 'Emily Miller',
    member_type: 'guest', membership_date: '2024-03-11',
    email: 'emily.m@email.com', phone: '+1 321-456-7890',
    status: 'active', profile_image_url: null, created_at: '2024-03-11T00:00:00Z',
  },
];

export default function Members() {
  //UI state
  const [showAddModal, setShowAddModal] = useState(false);

  //Data state
  const [members, setMembers] = useState(DEMO_MEMBERS);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  //Filter / search / pagination
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  //Form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [profileFile, setProfileFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  //File input refs
  const profileInputRef = useRef(null);
  const idInputRef = useRef(null);

  //Fetch on mount
  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await MemberController.getAllMembers();
      // If live data comes back, use it; otherwise keep demo data as fallback
      if (data && data.length > 0) {
        setMembers(data);
      } else {
        setMembers(DEMO_MEMBERS);
      }
    } catch (err) {
      // On error, fall back to demo data so the UI still shows something
      setFetchError(err.message);
      setMembers(DEMO_MEMBERS);
    } finally {
      setLoading(false);
    }
  }

  //Computed stats
  const now = new Date();
  const totalMembers = members.filter((m) => m.member_type === 'member').length;
  const activeGuests = members.filter(
    (m) => m.member_type === 'guest' && m.status === 'active'
  ).length;
  const newThisMonth = members.filter((m) => {
    const d = new Date(m.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  //Filtered & searched list
  const filtered = members.filter((m) => {
    if (filterType !== 'all' && m.member_type !== filterType) return false;
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        m.full_name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.member_id?.toLowerCase().includes(q) ||
        m.phone?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  //Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function goToPage(p) {
    setCurrentPage(Math.max(1, Math.min(p, totalPages)));
  }

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, filterStatus, searchQuery]);

  // Form handlers
  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleClose() {
    setShowAddModal(false);
    setForm(EMPTY_FORM);
    setProfileFile(null);
    setIdFile(null);
    setFormError(null);
  }

  async function handleSubmit() {
    setFormError(null);
    setSubmitting(true);
    try {
      await MemberController.registerMember(form, profileFile, idFile);
      handleClose();
      await loadMembers();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  //Page number array for pagination
  const pageNums = (() => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) pages.push(i);
    return pages;
  })();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BadgeCheck className="w-4 h-4 text-[#137fec]" />
            <span className="text-[10px] font-normal text-[#137fec] uppercase tracking-widest">
              Administrative Hub
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
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
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            Total Members
          </p>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {loading ? '��' : totalMembers.toLocaleString()}
          </h4>
        </div>

        {/* Active Guests */}
        <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <CircleUser className="w-5 h-5" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            Active Guests
          </p>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {loading ? '��' : activeGuests.toLocaleString()}
          </h4>
        </div>

        {/* New Registrations */}
        <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              New
            </span>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            New Registrations (This Month)
          </p>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {loading ? '��' : newThisMonth.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Filters Bar */}
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/60 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, ID..."
                className="h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs w-56 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none placeholder-gray-400"
              />
            </div>
            {/* Type */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="member">Member</option>
                <option value="guest">Guest</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
            {/* Status */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-9 appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 text-xs font-medium text-gray-700 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="deceased">Deceased</option>
                <option value="transferred">Transferred</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
            {/* Divider */}
            <div className="w-px h-5 bg-gray-200" />
            {/* Export */}
            <button className="flex items-center gap-1.5 h-9 px-4 text-xs font-medium text-[#137fec] bg-[#137fec]/5 hover:bg-[#137fec]/10 rounded-lg transition-colors cursor-pointer shrink-0">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
          <div className="text-xs text-gray-400">
            {loading ? 'Loading...' : `Showing ${paginated.length} of ${filtered.length} entries`}
          </div>
        </div>

        {/* Fetch error */}
        {fetchError && (
          <div className="flex items-center gap-2 px-6 py-4 bg-red-50 text-red-600 text-sm border-b border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {fetchError}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-normal uppercase tracking-wider border-b border-gray-200">
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#137fec] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Loading members��</p>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-sm text-gray-400">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginated.map((m) => {
                  const { bg, text } = getAvatarColors(m.full_name);
                  const { text: stText, dot: stDot } = statusStyle(m.status);
                  const isGuest = m.member_type === 'guest';
                  return (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-[#137fec]">
                        {m.member_id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {m.profile_image_url ? (
                            <img
                              src={m.profile_image_url}
                              alt={m.full_name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center ${text} font-normal text-[10px]`}
                            >
                              {getInitials(m.full_name)}
                            </div>
                          )}
                          <span className="font-medium text-sm text-gray-900">{m.full_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-[10px] font-normal rounded uppercase ${
                            isGuest
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {m.member_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {formatDate(m.membership_date)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-medium">{m.email || '��'}</span>
                          <span className="text-[10px] text-gray-500">{m.phone || '��'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-1.5 ${stText} font-normal text-[10px] uppercase`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${stDot}`} />
                          {m.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {pageNums.map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currentPage === p ? 'bg-[#137fec] text-white' : 'hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
            {totalPages > 5 && (
              <>
                <span className="text-gray-500">��</span>
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentPage === totalPages ? 'bg-[#137fec] text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Register New Record Modal*/}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base sm:text-lg xl:text-xl font-semibold tracking-tight">
                  Register New Record
                </h3>
                <p className="text-gray-500 text-xs">
                  Complete the steps below to add a member or guest to the registry.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body: Sidebar + Form */}
            <div className="flex-1 overflow-hidden flex">
              {/* Step Sidebar */}
              <div className="w-56 lg:w-64 hidden md:block border-r border-gray-200 p-8 space-y-8 bg-gray-50/30 shrink-0">
                {[
                  { n: 1, label: 'Personal', sub: 'Identity Details', icon: User },
                  { n: 2, label: 'Contact', sub: 'Reachability', icon: Mail },
                  { n: 3, label: 'Church', sub: 'Affiliation', icon: Building2 },
                  { n: 4, label: 'Files', sub: 'Verification', icon: ShieldCheck },
                ].map(({ n, label, sub }) => (
                  <div key={n} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#137fec] text-white flex items-center justify-center font-medium text-xs">
                      {n}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#137fec]">
                        {label}
                      </p>
                      <p className="text-[10px] text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {/* Form-level error */}
                {formError && (
                  <div className="flex items-center gap-2 mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {formError}
                  </div>
                )}

                <div className="space-y-10">
                  {/* Section 1: Personal Information */}
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <User className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-semibold text-sm sm:text-base uppercase tracking-tight">
                        Section 1: Personal Information
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={form.full_name}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                          placeholder="Johnathan Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={form.date_of_birth}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={form.gender}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marital Status
                        </label>
                        <select
                          name="marital_status"
                          value={form.marital_status}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer"
                        >
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="widowed">Widowed</option>
                          <option value="divorced">Divorced</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Section 2: Contact Information */}
                  <section>
                    <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-gray-200">
                      <Mail className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-semibold text-sm sm:text-base uppercase tracking-tight">
                        Section 2: Contact Information
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                          placeholder="+63 912 345 6789"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                          placeholder="john.doe@email.com"
                        />
                      </div>
                      <div className="col-span-full space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Residential Address
                        </label>
                        <textarea
                          name="address"
                          value={form.address}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all resize-none"
                          placeholder="Enter full address��"
                          rows="3"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Church Specifics */}
                  <section>
                    <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-gray-200">
                      <Building2 className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-semibold text-sm sm:text-base uppercase tracking-tight">
                        Section 3: Church Specifics
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registration Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          {['member', 'guest'].map((t) => (
                            <label key={t} className="flex-1 cursor-pointer">
                              <input
                                type="radio"
                                name="member_type"
                                className="hidden peer"
                                value={t}
                                checked={form.member_type === t}
                                onChange={handleFormChange}
                              />
                              <div className="py-2.5 text-center rounded-lg border border-gray-200 peer-checked:bg-[#137fec]/10 peer-checked:border-[#137fec] peer-checked:text-[#137fec] transition-all text-xs font-bold capitalize">
                                {t}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join / Visit Date
                        </label>
                        <input
                          type="date"
                          name="membership_date"
                          value={form.membership_date}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </label>
                        <select
                          name="department"
                          value={form.department}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] transition-all cursor-pointer"
                        >
                          <option value="">None / General</option>
                          <option value="Youth Ministry">Youth Ministry</option>
                          <option value="Worship Team">Worship Team</option>
                          <option value="Ushering">Ushering</option>
                          <option value="Media & Tech">Media &amp; Tech</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Section 4: Attachments */}
                  <section>
                    <div className="flex items-center gap-2 mb-6 pt-4 border-t border-dashed border-gray-200">
                      <ShieldCheck className="w-5 h-5 text-[#137fec]" />
                      <h4 className="font-semibold text-sm sm:text-base uppercase tracking-tight">
                        Section 4: Attachments
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Profile Photo */}
                      <div className="space-y-3">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Profile Photo
                        </label>
                        <input
                          ref={profileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setProfileFile(e.target.files[0] || null)}
                        />
                        <div
                          onClick={() => profileInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <Image className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          {profileFile ? (
                            <p className="text-xs font-medium text-[#137fec] break-all">
                              {profileFile.name}
                            </p>
                          ) : (
                            <p className="text-[10px] font-normal text-gray-500 uppercase">
                              Upload Portrait
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ID Document */}
                      <div className="space-y-3">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Identification Document (ID)
                        </label>
                        <input
                          ref={idInputRef}
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => setIdFile(e.target.files[0] || null)}
                        />
                        <div
                          onClick={() => idInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <IdCard className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          {idFile ? (
                            <p className="text-xs font-medium text-[#137fec] break-all">
                              {idFile.name}
                            </p>
                          ) : (
                            <p className="text-[10px] font-normal text-gray-500 uppercase">
                              Upload ID Front / Back
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-[#137fec] font-medium text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                Secure Registry
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold border border-gray-200 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#137fec] text-white hover:bg-[#137fec]/90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving��
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Registration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

