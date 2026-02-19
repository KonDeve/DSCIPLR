import Sidebar from '@/views/shared/components/Sidebar';
import {
  HiOutlineHome,
  HiOutlineCash,
  HiOutlineOfficeBuilding,
  HiOutlineClipboardCheck,
  HiOutlineBookOpen,
  HiOutlineDocumentReport,
} from 'react-icons/hi';

const links = [
  { to: '/treasurer', label: 'Dashboard', icon: <HiOutlineHome />, end: true },
  { to: '/treasurer/collections', label: 'Collections', icon: <HiOutlineCash /> },
  { to: '/treasurer/rentals', label: 'Rentals', icon: <HiOutlineOfficeBuilding /> },
  { to: '/treasurer/payment-requests', label: 'Payment Requests', icon: <HiOutlineClipboardCheck /> },
  { to: '/treasurer/ledger', label: 'Ledger', icon: <HiOutlineBookOpen /> },
  { to: '/treasurer/reports', label: 'Reports', icon: <HiOutlineDocumentReport /> },
];

export default function TreasurerSidebar() {
  return <Sidebar links={links} />;
}
