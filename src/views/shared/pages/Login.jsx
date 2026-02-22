import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/config/supabaseClient';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const DEV_ACCOUNTS = [
  { email: 'superadmin@dsciplr.com', role: 'Super Admin' },
  { email: 'admin@dsciplr.com',      role: 'Admin' },
  { email: 'pastor@dsciplr.com',     role: 'Pastor' },
  { email: 'treasurer@dsciplr.com',  role: 'Treasurer' },
  { email: 'secretary@dsciplr.com',  role: 'Secretary' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: '#f0f2f5',
        backgroundImage: 'radial-gradient(circle, #d0d5dd 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-10 py-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-wide">DSCIPLR</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Sign in to DSCIPLR</h1>
            <p className="text-sm text-gray-400 mt-1.5">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <HiOutlineMail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                  placeholder="admin@dsciplr.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                  tabIndex={-1}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <HiOutlineLockClosed className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="keepSignedIn"
                className="text-sm text-gray-600 cursor-pointer select-none"
              >
                Keep me signed in
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-600 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-normal tracking-wider uppercase">
              Internal Access Only
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Help */}
          <p className="text-center text-sm text-gray-500">
            Need help?{' '}
            <button className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer">
              Contact Support
            </button>
          </p>

          {/* Dev Accounts (only when Supabase is not configured) */}
          {!supabase && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-medium text-amber-700 uppercase tracking-wider mb-2">
                Dev Mode — Test Accounts
              </p>
              <p className="text-[11px] text-amber-600 mb-3">
                Password for all: <span className="font-mono font-medium">password</span>
              </p>
              <div className="space-y-1.5">
                {DEV_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => {
                      setEmail(acc.email);
                      setPassword('password');
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg hover:bg-amber-100 transition-colors cursor-pointer text-left"
                  >
                    <span className="font-medium text-amber-800">{acc.email}</span>
                    <span className="text-[10px] font-normal text-amber-500 uppercase">{acc.role}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-xs text-gray-400">
          &copy; 2024 DSCIPLR Administrative System. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <button className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
            Privacy Policy
          </button>
          <button className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
            Terms of Service
          </button>
        </div>
      </footer>
    </div>
  );
}
