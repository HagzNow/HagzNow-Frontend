import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import AdminFooter from '../../AdminLayout/AdminFooter';
import Navbar from '@/components/Navbar';

import { ChartLine, Plus, LibraryBig, Calendar, WalletCards } from 'lucide-react';

export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isRTL = true;

  const navSections = useMemo(
    () => [
      { id: 'dashboard', title: 'لوحة التحكم', icon: ChartLine, path: '/owner/dashboard' },
      { id: 'wallet', title: 'المحفظة', icon: WalletCards, path: '/owner/wallet' },
      {
        id: 'arenas',
        title: 'الملاعب',
        icon: LibraryBig,
        items: [
          { id: 'add-arena', label: 'إضافة ملعب', icon: Plus, path: '/owner/add-arena' },
          { id: 'arenas-all', label: 'عرض كل الملاعب', icon: LibraryBig, path: '/owner/arenas' },
        ],
      },
      {
        id: 'reservations',
        title: 'الحجوزات',
        icon: Calendar,
        items: [{ id: 'calendar', label: 'التقويم', icon: Calendar, path: '/owner/reservations' }],
      },
    ],
    []
  );

  const ownerTopMenu = useMemo(
    () => [
      { to: '/owner/dashboard', label: 'لوحة التحكم' },
      { to: '/owner/arenas', label: 'ساحاتي' },
      { to: '/owner/add-arena', label: 'إضافة ساحة' },
      { to: '/owner/wallet', label: 'المحفظة' },
    ],
    []
  );

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Navbar */}
      <Navbar variant="owner" menuItems={ownerTopMenu} onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-row-reverse">
        {/* Sidebar Desktop */}
        <aside
          className={`hidden md:block fixed top-16 ${isRTL ? 'right-0' : 'left-0'} h-[calc(100vh-4rem)] w-64 border-l border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300`}
        >
          <Sidebar mode="owner" navSections={navSections} isRTL={isRTL} open={true} />
        </aside>

        {/* Main Content */}
        <div className={`flex-1 ${isRTL ? 'md:mr-64' : 'md:ml-64'} mt-16`}>
          <main className="min-h-[80vh] p-4 sm:p-6">
            <Outlet />
          </main>
          <div className="mt-4 z-50">
            <AdminFooter />
          </div>
        </div>
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden transition-opacity duration-300"
          style={{
            backgroundColor: '#00000030',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`absolute top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 rounded-l-2xl transition-all duration-300 ${
              isRTL ? 'right-0 translate-x-0' : 'left-0 translate-x-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              mode="owner"
              navSections={navSections}
              isRTL={isRTL}
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
