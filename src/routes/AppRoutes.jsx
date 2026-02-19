import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROLES } from '@/constants/roles';
import RoleGuard from './RoleGuard';
import Loader from '@/views/shared/components/Loader';

// Shared
import Layout from '@/views/shared/components/Layout';
import Login from '@/views/shared/pages/Login';
import Unauthorized from '@/views/shared/pages/Unauthorized';
import Profile from '@/views/shared/pages/Profile';

// Super Admin
import SuperAdminSidebar from '@/views/super-admin/components/SuperAdminSidebar';
import SADashboard from '@/views/super-admin/pages/Dashboard';
import ManageAdmins from '@/views/super-admin/pages/ManageAdmins';
import SystemSettings from '@/views/super-admin/pages/SystemSettings';
import AuditLogs from '@/views/super-admin/pages/AuditLogs';

// Admin
import AdminSidebar from '@/views/admin/components/AdminSidebar';
import AdminDashboard from '@/views/admin/pages/Dashboard';
import ManageMembers from '@/views/admin/pages/ManageMembers';
import ManageEvents from '@/views/admin/pages/ManageEvents';
import Reports from '@/views/admin/pages/Reports';

// Pastor
import PastorSidebar from '@/views/pastor/components/PastorSidebar';
import PastorDashboard from '@/views/pastor/pages/Dashboard';
import Sermons from '@/views/pastor/pages/Sermons';
import PrayerRequests from '@/views/pastor/pages/PrayerRequests';
import MemberOverview from '@/views/pastor/pages/MemberOverview';

// Treasurer
import TreasurerSidebar from '@/views/treasurer/components/TreasurerSidebar';
import TreasurerDashboard from '@/views/treasurer/pages/Dashboard';
import Collections from '@/views/treasurer/pages/Collections';
import CollectionDetail from '@/views/treasurer/pages/CollectionDetail';
import Rentals from '@/views/treasurer/pages/Rentals';
import PaymentRequests from '@/views/treasurer/pages/PaymentRequests';
import Ledger from '@/views/treasurer/pages/Ledger';
import TreasurerReports from '@/views/treasurer/pages/FinancialReports';

// Secretary
import SecretarySidebar from '@/views/secretary/components/SecretarySidebar';
import SecretaryDashboard from '@/views/secretary/pages/Dashboard';
import SecretaryEvents from '@/views/secretary/pages/Events';
import SecretaryMembers from '@/views/secretary/pages/Members';
import SecretaryExternalServices from '@/views/secretary/pages/ExternalServices';
import SecretaryReports from '@/views/secretary/pages/Reports';

function RoleDashboardRedirect() {
  const { role, loading } = useAuth();

  if (loading) return <Loader />;

  const redirectMap = {
    [ROLES.SUPER_ADMIN]: '/super-admin',
    [ROLES.ADMIN]: '/admin',
    [ROLES.PASTOR]: '/pastor',
    [ROLES.TREASURER]: '/treasurer',
    [ROLES.SECRETARY]: '/secretary',
  };

  return <Navigate to={redirectMap[role] || '/login'} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Root redirect based on role */}
      <Route path="/" element={<RoleDashboardRedirect />} />

      {/* Profile (any authenticated user) */}
      <Route
        path="/profile"
        element={
          <RoleGuard allowedRoles={Object.values(ROLES)}>
            <Profile />
          </RoleGuard>
        }
      />

      {/* Super Admin */}
      <Route
        element={
          <RoleGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
            <Layout sidebar={SuperAdminSidebar} />
          </RoleGuard>
        }
      >
        <Route path="/super-admin" element={<SADashboard />} />
        <Route path="/super-admin/manage-admins" element={<ManageAdmins />} />
        <Route path="/super-admin/system-settings" element={<SystemSettings />} />
        <Route path="/super-admin/audit-logs" element={<AuditLogs />} />
      </Route>

      {/* Admin */}
      <Route
        element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <Layout sidebar={AdminSidebar} />
          </RoleGuard>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-members" element={<ManageMembers />} />
        <Route path="/admin/manage-events" element={<ManageEvents />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      {/* Pastor */}
      <Route
        element={
          <RoleGuard allowedRoles={[ROLES.PASTOR]}>
            <Layout sidebar={PastorSidebar} />
          </RoleGuard>
        }
      >
        <Route path="/pastor" element={<PastorDashboard />} />
        <Route path="/pastor/sermons" element={<Sermons />} />
        <Route path="/pastor/prayer-requests" element={<PrayerRequests />} />
        <Route path="/pastor/member-overview" element={<MemberOverview />} />
      </Route>

      {/* Treasurer */}
      <Route
        element={
          <RoleGuard allowedRoles={[ROLES.TREASURER]}>
            <Layout sidebar={TreasurerSidebar} />
          </RoleGuard>
        }
      >
        <Route path="/treasurer" element={<TreasurerDashboard />} />
        <Route path="/treasurer/collections" element={<Collections />} />
        <Route path="/treasurer/collections/:id" element={<CollectionDetail />} />
        <Route path="/treasurer/rentals" element={<Rentals />} />
        <Route path="/treasurer/payment-requests" element={<PaymentRequests />} />
        <Route path="/treasurer/ledger" element={<Ledger />} />
        <Route path="/treasurer/reports" element={<TreasurerReports />} />
      </Route>

      {/* Secretary */}
      <Route
        element={
          <RoleGuard allowedRoles={[ROLES.SECRETARY]}>
            <Layout sidebar={SecretarySidebar} />
          </RoleGuard>
        }
      >
        <Route path="/secretary" element={<SecretaryDashboard />} />
        <Route path="/secretary/events" element={<SecretaryEvents />} />
        <Route path="/secretary/members" element={<SecretaryMembers />} />
        <Route path="/secretary/external-services" element={<SecretaryExternalServices />} />
        <Route path="/secretary/reports" element={<SecretaryReports />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
