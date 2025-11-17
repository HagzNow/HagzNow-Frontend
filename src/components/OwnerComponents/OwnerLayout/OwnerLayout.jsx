import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

import Header from "./Header";
import AdminFooter from "../../AdminLayout/AdminFooter";

import {
 ChartLine,
  LayoutDashboard,
  CalendarDays,
  Settings,
  SquarePlus,
  Rows3,
  Plus,
  Building2,
  ShieldCheck,
  ListChecks,
  LibraryBig,
  Calendar,
  WalletCards
} from "lucide-react";
//import Home from "@/pages/Home/Home";

const navSections = [
  { id: "dashboard", title: "لوحة التحكم", icon: ChartLine, path: "/owner/dashboard"  },
  { id: "wallet", title: "المحفظة", icon: WalletCards , path: "/owner/wallet"  },
  {
    id: "arenas",
    title: "الملاعب",
    icon: LibraryBig,
    items: [
      { id: "arenas-all", label: "عرض كل الملاعب", icon: ListChecks },
      { id: "add-arena", label: "إضافة ملعب", icon: Plus ,path:"/owner/add-arena"},
    ],
  },
  {
    id: "reservations",
    title: "الحجوزات",
    icon: Calendar,
    items: [
      { id: "calendar", label: "التقويم", icon: Calendar },
      { id: "booking-new", label: "حجز جديد", icon: Plus },
    ],
  },
  { id: "settings", title: "الإعدادات", icon: Settings,path:"/owner/Setting" },
];
export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isRTL = true;

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col md:flex-row"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ✅ Sidebar Desktop */}
      <div
        className={`hidden md:block fixed top-0 ${
          isRTL ? "right-0" : "left-0"
        } h-screen w-64 bg-white shadow-lg z-40`}
      >
        <Sidebar
          mode="owner"
          navSections={navSections}
          isRTL={isRTL}
          open={true}
        />
      </div>

      {/* ✅ Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isRTL ? "md:mr-64" : "md:ml-64"
        }`}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} isRTL={isRTL} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>

        <div className="mt-4 z-50">
          <AdminFooter />
        </div>
      </div>

      {/* ✅ Sidebar Mobile_overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden transition-opacity duration-300"
          style={{
            backgroundColor: "#00000030",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`absolute top-0 h-full w-64 bg-white shadow-xl rounded-l-2xl transition-transform duration-300 ${
              isRTL ? "right-0 translate-x-0" : "left-0 translate-x-0"
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




