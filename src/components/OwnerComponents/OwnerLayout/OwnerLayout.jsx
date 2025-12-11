import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import {
  ChartLine,
  Plus,
  LibraryBig,
  Calendar,
  WalletCards,
} from "lucide-react";

export default function OwnerLayout() {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isRTL = true;

  const menu = useMemo(
    () => [
      {
        key: "dashboard",
        label: "لوحة التحكم",
        icon: <ChartLine />,
        to: "/owner/dashboard",
      },
      {
        key: "wallet",
        label: "المحفظة",
        icon: <WalletCards />,
        to: "/owner/wallet",
      },
      {
        key: "add-arena",
        label: "إضافة ملعب",
        icon: <Plus />,
        to: "/owner/add-arena",
      },
      {
        key: "manual-booking",
        label: "حجز يدوي",
        icon: <Calendar />,
        to: "/owner/manual-booking",
      },
      {
        key: "arenas-all",
        label: "عرض كل الملاعب",
        icon: <LibraryBig />,
        to: "/owner/arenas",
      },
      {
        key: "reservations",
        label: "الحجوزات",
        icon: <Calendar />,
        to: "/owner/reservations",
      },
    ],
    []
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
    []
  );

  return (
    <>
      {/* Navbar */}
      <Navbar
        variant="owner"
        menuItems={ownerTopMenu}
        onMenuClick={() => setSidebarOpen(true)}
        showSearch={false}
      />

      {/* Main layout wrapper */}
      <div
        className="flex flex-row-reverse min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Sidebar Desktop */}
        <aside
          className={`hidden md:block fixed top-16 ${
            isRTL ? "right-0" : "left-0"
          } h-[calc(100vh-4rem)] w-74 border-l bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-green-100 dark:border-gray-800 shadow-sm py-2`}
        >
          <Sidebar
            mode="admin"
            menuItems={menu}
            activeKey={activeKey}
            onChange={setActiveKey}
            isRTL={isRTL}
            open={true}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full md:mr-64 mt-16 p-3 sm:p-4 md:p-6">
          <main className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 shadow-sm dark:shadow-gray-900/50 min-h-[calc(100vh-8rem)] transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden transition-opacity duration-300"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`absolute top-16 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 ${
              isRTL ? "right-0" : "left-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              mode="admin"
              menuItems={menu}
              activeKey={activeKey}
              onChange={setActiveKey}
              isRTL={isRTL}
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
