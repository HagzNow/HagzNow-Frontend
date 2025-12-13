import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  ChartLine,
  Box,
  Users,
  Calendar,
  FileCog,
  MessageSquareText,
  WalletCards,
  ArrowDownCircle,
} from "lucide-react";

import Sidebar from "../Sidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    console.log("Toggle clicked, current state:", isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menu = [
    {
      key: "dashboard",
      label: "إحصائيات",
      icon: <ChartLine />,
      to: "/admin/dashboard",
    },
    {
      key: "wallet",
      label: "محفظة",
      icon: <WalletCards />,
      to: "/admin/wallet",
    },
    {
      key: "withdrawal-requests",
      label: "طلبات السحب",
      icon: <ArrowDownCircle />,
      to: "/admin/withdrawal-requests",
    },
    {
      key: "categoriesmanagment",
      label: "إدارة الفئات",
      icon: <Box />,
      to: "/admin/categoriesmanagment",
    },
    {
      key: "users",
      label: "إدارة المستخدمين",
      icon: <Users />,
      to: "/admin/usermanagment",
    },
    // {
    //   key: 'reservations',
    //   label: 'عرض جميع الحجوزات',
    //   icon: <Calendar />,
    //   to: '/reservations',
    // },
    {
      key: "admin-arena-requests",
      label: "طلبات الساحة المعلقة",
      icon: <FileCog />,
      to: "/admin/admin-arena-requests",
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
      {/* Navbar with burger button */}
      <AdminNavbar onMenuClick={handleMenuToggle} />

      {/* Main layout wrapper */}
      <div className="flex flex-row-reverse bg-neutral-50 dark:bg-gray-900 text-neutral-900 dark:text-gray-100 transition-colors duration-300">
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
    fixed top-16 right-0
    h-[calc(100vh-4rem)]
    w-[85vw] sm:w-72 md:w-64
    max-w-[90vw]
    border-l border-neutral-200 dark:border-gray-700
    bg-white dark:bg-gray-800
    z-50 overflow-y-auto shadow-2xl
    ${isSidebarOpen ? "block" : "hidden"}
  `}
        >
          <Sidebar
            mode="admin"
            menuItems={menu}
            activeKey={activeKey}
            onChange={(key) => {
              setActiveKey(key);
              setIsSidebarOpen(false);
            }}
            isRTL={true}
            open={true}
          />
        </aside>

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
