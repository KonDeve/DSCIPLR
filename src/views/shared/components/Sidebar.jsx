import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_LABELS } from '@/constants/roles';
import { HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';

export default function Sidebar({ links }) {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full">
      {/* Branding */}
      <div className="px-5 h-16 flex items-center gap-3 border-b border-gray-100 shrink-0">
        <div className="bg-[#137fec] rounded-lg p-2 text-white shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-6 4h2m4 0h2M12 3v4" />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-base font-semibold leading-none tracking-tight">DSCIPLR</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">
            Church Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-normal text-gray-400 uppercase tracking-widest px-3 pb-2 pt-1">
          Menu
        </p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal transition-all ${
                isActive
                  ? 'bg-[#137fec]/8 text-[#137fec] font-semibold'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-lg shrink-0 transition-colors ${
                    isActive ? 'text-[#137fec]' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {link.icon}
                </span>
                <span className="flex-1 truncate">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3 space-y-0.5 shrink-0">
        <NavLink
          to="/profile"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all"
        >
          <HiOutlineCog className="text-lg shrink-0 text-gray-400 group-hover:text-gray-600" />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
        >
          <HiOutlineLogout className="text-lg shrink-0" />
          Log Out
        </button>

        {/* User card */}
        <div className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-[#137fec]/15 flex items-center justify-center text-[#137fec] font-medium text-xs shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate leading-tight">{displayName}</p>
            <p className="text-xs text-gray-400 truncate leading-tight mt-0.5">
              {ROLE_LABELS[role] || role || 'User'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
