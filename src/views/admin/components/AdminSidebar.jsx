import Sidebar from '@/views/shared/components/Sidebar';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from 'react-icons/hi';

const links = [
  { to: '/admin', label: 'Dashboard', icon: <HiOutlineHome />, end: true },
  { to: '/admin/manage-members', label: 'Manage Members', icon: <HiOutlineUsers /> },
  { to: '/admin/manage-events', label: 'Manage Events', icon: <HiOutlineCalendar /> },
  { to: '/admin/reports', label: 'Reports', icon: <HiOutlineChartBar /> },
];

export default function AdminSidebar() {
  return <Sidebar links={links} />;
}
