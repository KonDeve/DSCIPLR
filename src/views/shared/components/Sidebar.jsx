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
    <div className="p-5 md:p-6 flex flex-col h-full">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-8 md:mb-10">
        <div className="bg-[#137fec] rounded-lg p-2 text-white shrink-0">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-6 4h2m4 0h2M12 3v4" />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-bold leading-none">DSCIPLR</h1>
          <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-0.5">
            Church Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm md:text-[15px] font-medium transition-colors ${
                isActive
                  ? 'bg-[#137fec]/10 text-[#137fec] font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {link.icon && <span className="text-xl md:text-[22px] shrink-0">{link.icon}</span>}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="pt-5 md:pt-6 border-t border-gray-200">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm md:text-[15px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <HiOutlineCog className="text-xl md:text-[22px] shrink-0" />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm md:text-[15px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <HiOutlineLogout className="text-xl md:text-[22px] shrink-0" />
          Log Out
        </button>
        <div className="mt-4 flex items-center gap-3 px-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#137fec]/15 flex items-center justify-center text-[#137fec] font-bold text-xs shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-semibold truncate">{displayName}</p>
            <p className="text-[10px] md:text-[11px] text-gray-500 truncate">
              {ROLE_LABELS[role] || role || 'User'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
