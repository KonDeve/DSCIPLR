import Sidebar from '@/views/shared/components/Sidebar';
import {
  HiOutlineHome,
  HiOutlineCash,
  HiOutlineReceiptTax,
  HiOutlineDocumentReport,
} from 'react-icons/hi';

const links = [
  { to: '/treasurer', label: 'Dashboard', icon: <HiOutlineHome />, end: true },
  { to: '/treasurer/donations', label: 'Donations', icon: <HiOutlineCash /> },
  { to: '/treasurer/expenses', label: 'Expenses', icon: <HiOutlineReceiptTax /> },
  { to: '/treasurer/financial-reports', label: 'Financial Reports', icon: <HiOutlineDocumentReport /> },
];

export default function TreasurerSidebar() {
  return <Sidebar links={links} />;
}
