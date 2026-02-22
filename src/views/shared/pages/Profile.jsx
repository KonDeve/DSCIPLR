import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserController } from '@/controllers';
import Loader from '@/views/shared/components/Loader';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await UserController.getUserById(user.id);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) loadProfile();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
          <p className="text-gray-800">{user?.email}</p>
        </div>

        {profile && (
          <>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Name</label>
              <p className="text-gray-800">{profile.name || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Role</label>
              <p className="text-gray-800 capitalize">{profile.role?.replace('_', ' ')}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Joined</label>
              <p className="text-gray-800">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
