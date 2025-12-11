import { useState } from 'react';
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
} from 'lucide-react';

import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

export default function AdminLayout() {
  const [activeKey, setActiveKey] = useState('dashboard');

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
    { key: 'users', label: 'إدارة المستخدمين', icon: <Users />, to: '/admin/usermanagment' },
    // {
    //   key: 'reservations',
    //   label: 'عرض جميع الحجوزات',
    //   icon: <Calendar />,
    //   to: '/reservations',
    // },
    {
      key: 'admin-arena-requests',
      label: 'طلبات الساحة المعلقة',
      icon: <FileCog />,
      to: '/admin/admin-arena-requests',
    },
    // {
    //   key: 'settings',
    //   label: 'الإعدادات العامة',
    //   icon: <MessageSquareText />,
    //   badge: 'جديد',
    //   to: '/admin/settings',
    // },
  ];

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar variant="admin" />

      {/* ✅ Main layout wrapper */}
      <div className="flex flex-row-reverse min-h-screen bg-neutral-50 dark:bg-gray-900 text-neutral-900 dark:text-gray-100 transition-colors duration-300">
        {/* ✅ Sidebar */}
        <aside className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-74 border-l border-neutral-200 dark:border-gray-700 transition-colors duration-300">
          <Sidebar
            mode="admin"
            menuItems={menu}
            activeKey={activeKey}
            onChange={setActiveKey}
            isRTL={true}
            open={true} // ثابت على الديسكتوب
          />
        </aside>

        {/* ✅ Main Content */}
        <div className="flex-1 mr-64  p-4 md:p-6">
          <main className="px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
