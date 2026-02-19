import Sidebar from '@/views/shared/components/Sidebar';
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
} from 'react-icons/hi';

const links = [
  { to: '/secretary', label: 'Dashboard', icon: <HiOutlineHome />, end: true },
  { to: '/secretary/events', label: 'Events', icon: <HiOutlineCalendar /> },
  { to: '/secretary/members', label: 'Members', icon: <HiOutlineUsers /> },
  { to: '/secretary/external-services', label: 'External Services', icon: <HiOutlineCurrencyDollar /> },
  { to: '/secretary/reports', label: 'Reports', icon: <HiOutlineChartBar /> },
];

export default function SecretarySidebar() {
  return <Sidebar links={links} />;
}
