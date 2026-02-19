import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_LABELS } from '@/constants/roles';

export default function Navbar() {
  const { user, role, signOut } = useAuth();

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <Link to="/" className="text-xl font-bold text-indigo-600 tracking-wide">
        DSCIPLR
      </Link>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-500">
              {ROLE_LABELS[role] || role}
            </span>
            <Link
              to="/profile"
              className="text-sm text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={signOut}
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
