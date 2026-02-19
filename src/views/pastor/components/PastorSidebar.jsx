import Sidebar from '@/views/shared/components/Sidebar';
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineHeart,
  HiOutlineUsers,
} from 'react-icons/hi';

const links = [
  { to: '/pastor', label: 'Dashboard', icon: <HiOutlineHome />, end: true },
  { to: '/pastor/sermons', label: 'Sermons', icon: <HiOutlineBookOpen /> },
  { to: '/pastor/prayer-requests', label: 'Prayer Requests', icon: <HiOutlineHeart /> },
  { to: '/pastor/member-overview', label: 'Member Overview', icon: <HiOutlineUsers /> },
];

export default function PastorSidebar() {
  return <Sidebar links={links} />;
}
