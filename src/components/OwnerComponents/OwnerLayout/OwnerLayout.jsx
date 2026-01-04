import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

import { ChartLine, Plus, LibraryBig, Calendar, WalletCards } from 'lucide-react';

export default function OwnerLayout() {
  const [activeKey, setActiveKey] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isRTL = true;

  const menu = useMemo(
    () => [
      {
        key: 'dashboard',
        label: 'لوحة التحكم',
        icon: <ChartLine />,
        to: '/owner/dashboard',
      },
      {
        key: 'wallet',
        label: 'المحفظة',
        icon: <WalletCards />,
        to: '/owner/wallet',
      },
      {
        key: 'add-arena',
        label: 'إضافة ملعب',
        icon: <Plus />,
        to: '/owner/add-arena',
      },
      {
        key: 'manual-booking',
        label: 'حجز يدوي',
        icon: <Calendar />,
        to: '/owner/manual-booking',
      },
      {
        key: 'arenas-all',
        label: 'عرض كل الملاعب',
        icon: <LibraryBig />,
        to: '/owner/arenas',
      },
      {
        key: 'reservations',
        label: 'الحجوزات',
        icon: <Calendar />,
        to: '/owner/reservations',
      },
    ],
    [],
  );

  const ownerTopMenu = useMemo(
    () => [
      // { to: '/owner/dashboard', label: 'لوحة التحكم' },
      // { to: '/owner/arenas', label: 'ساحاتي' },
      // { to: '/owner/add-arena', label: 'إضافة ساحة' },
      // { to: '/owner/manual-booking', label: 'حجز يدوي' },
      // { to: '/owner/reservations', label: 'الحجوزات' },
      // { to: '/owner/wallet', label: 'المحفظة' },
    ],
    [],
  );

  return (
    <>
      {/* Navbar */}
      <Navbar variant="owner" menuItems={ownerTopMenu} onMenuClick={() => setSidebarOpen((prev) => !prev)} showSearch={false} />

      {/* Main layout wrapper */}
      <div
        className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Sidebar - Handles its own responsiveness (fixed on mobile, static on desktop) */}
        <Sidebar
          mode="admin"
          menuItems={menu}
          activeKey={activeKey}
          onChange={setActiveKey}
          isRTL={isRTL}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
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
