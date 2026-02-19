import { useState, useEffect } from 'react';
import { supabase } from '@/config/supabaseClient';

// Dev accounts available when Supabase is not configured
const DEV_ACCOUNTS = [
  { email: 'superadmin@dsciplr.com', password: 'password', role: 'super_admin', name: 'Super Admin' },
  { email: 'admin@dsciplr.com',      password: 'password', role: 'admin',       name: 'Admin User' },
  { email: 'pastor@dsciplr.com',     password: 'password', role: 'pastor',      name: 'Pastor John' },
  { email: 'treasurer@dsciplr.com',  password: 'password', role: 'treasurer',   name: 'Treasurer Mary' },
  { email: 'secretary@dsciplr.com',  password: 'password', role: 'secretary',   name: 'Jane Doe' },
];

const DEV_SESSION_KEY = 'dsciplr_dev_session';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      // Restore dev session from localStorage
      try {
        const saved = JSON.parse(localStorage.getItem(DEV_SESSION_KEY));
        if (saved) {
          setUser(saved.user);
          setRole(saved.role);
        }
      } catch {
        // ignore
      }
      setLoading(false);
      return;
    }

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setRole(data.role);
    }
  };

  const signIn = async (email, password) => {
    if (!supabase) {
      // Dev mode: authenticate against hardcoded accounts
      const account = DEV_ACCOUNTS.find(
        (a) => a.email === email.toLowerCase() && a.password === password
      );
      if (!account) {
        return { data: null, error: { message: 'Invalid email or password.' } };
      }
      const devUser = { id: account.email, email: account.email, name: account.name };
      setUser(devUser);
      setRole(account.role);
      localStorage.setItem(DEV_SESSION_KEY, JSON.stringify({ user: devUser, role: account.role }));
      return { data: { user: devUser }, error: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEV_SESSION_KEY);
    setUser(null);
    setRole(null);
  };

  return { user, role, loading, signIn, signOut };
}
