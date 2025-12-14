import { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ChartLine,
  Box,
  Users,
  Calendar,
  FileCog,
  MessageSquareText,
  WalletCards,
  ArrowDownCircle,
  UserCheck,
} from 'lucide-react';

import Sidebar from '../Sidebar';
import AdminNavbar from './AdminNavbar';
import Navbar from '../Navbar';

export default function AdminLayout() {
  const [activeKey, setActiveKey] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const handleMenuToggle = () => {
  //   console.log('Toggle clicked, current state:', isSidebarOpen);
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  const menu = [
    {
      key: 'dashboard',
      label: 'إحصائيات',
      icon: <ChartLine />,
      to: '/admin/dashboard',
    },
    {
      key: 'wallet',
      label: 'محفظة',
      icon: <WalletCards />,
      to: '/admin/wallet',
    },
    {
      key: 'withdrawal-requests',
      label: 'طلبات السحب',
      icon: <ArrowDownCircle />,
      to: '/admin/withdrawal-requests',
    },
    {
      key: 'categoriesmanagment',
      label: 'إدارة الفئات',
      icon: <Box />,
      to: '/admin/categoriesmanagment',
    },
    {
      key: 'users',
      label: 'إدارة المستخدمين',
      icon: <Users />,
      to: '/admin/usermanagment',
    },
    // {
    //   key: 'reservations',
    //   label: 'عرض جميع الحجوزات',
    //   icon: <Calendar />,
    //   to: '/reservations',
    // },
    {
      key: 'admin-arena-requests',
      label: 'طلبات الملاعب المعلقة',
      icon: <FileCog />,
      to: '/admin/admin-arena-requests',
    },
    {
      key: 'pending-requests',
      label: 'طلبات الملاك المعلقة',
      icon: <UserCheck />,
      to: '/admin/pending-requests',
    },
    // {
    //   key: 'settings',
    //   label: 'الإعدادات العامة',
    //   icon: <MessageSquareText />,
    //   badge: 'جديد',
    //   to: '/admin/settings',
    // },
  ];
  const adminTopMenu = useMemo(
    () => [
      // { to: '/owner/dashboard', label: 'لوحة التحكم' },
      // { to: '/owner/arenas', label: 'ساحاتي' },
      // { to: '/owner/add-arena', label: 'إضافة ساحة' },
      // { to: '/owner/manual-booking', label: 'حجز يدوي' },
      // { to: '/owner/reservations', label: 'الحجوزات' },
      // { to: '/owner/wallet', label: 'المحفظة' },
    ],
    []
  );

  return (
    <>
      {/* Navbar with burger button */}
      {/* <AdminNavbar onMenuClick={handleMenuToggle} /> */}
      <Navbar
        variant="admin"
        menuItems={adminTopMenu}
        onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
        showSearch={false}
      />

      {/* Main layout wrapper */}
      <div className="flex bg-neutral-50 dark:bg-gray-900 text-neutral-900 dark:text-gray-100 transition-colors duration-300">
        {/* Sidebar */}
        <Sidebar
          mode="admin"
          menuItems={menu}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            setIsSidebarOpen(false);
          }}
          isRTL={true}
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 w-full min-h-screen">
          <main className="p-3 sm:p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
