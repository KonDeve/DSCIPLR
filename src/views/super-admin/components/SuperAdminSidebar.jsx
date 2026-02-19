import Sidebar from '@/views/shared/components/Sidebar';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineClipboardList,
} from 'react-icons/hi';

const links = [
  { to: '/super-admin', label: 'Dashboard', icon: <HiOutlineHome />, end: true },
  { to: '/super-admin/manage-admins', label: 'Manage Admins', icon: <HiOutlineUsers /> },
  { to: '/super-admin/system-settings', label: 'System Settings', icon: <HiOutlineCog /> },
  { to: '/super-admin/audit-logs', label: 'Audit Logs', icon: <HiOutlineClipboardList /> },
];

export default function SuperAdminSidebar() {
  return <Sidebar links={links} />;
}
