// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./SideBar";
// import Header from "./Header";
// import AdminFooter from "../../AdminLayout/AdminFooter";

// export default function OwnerLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

//   return (
//     <div
//       className="min-h-screen bg-gray-50 flex flex-col md:flex-row"
//       dir={isRTL ? "rtl" : "ltr"}
//     >
//       {/* ✅ Sidebar Desktop */}
//       <div
//         className={`hidden md:block fixed top-0 ${
//           isRTL ? "right-0" : "left-0"
//         } h-screen w-64 bg-white shadow-lg z-40`}
//       >
//         <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
//       </div>

//       {/* ✅ Main Content */}
//       <div
//         className={`flex-1 flex flex-col transition-all duration-300 ${
//           isRTL ? "md:mr-64" : "md:ml-64"
//         }`}
//       >
//         <Header onMenuClick={() => setSidebarOpen(true)} isRTL={isRTL} />
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6">
//           <Outlet />
//         </main>

//         {/* ✅ Footer يظهر هنا */}
//         <div className="mt-4 z-50">
//           <AdminFooter />
//         </div>
//       </div>

//       {/* ✅ Sidebar Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-50 md:hidden transition-opacity duration-300"
//           style={{
//             backgroundColor: "#00000030",
//             backdropFilter: "blur(3px)",
//             WebkitBackdropFilter: "blur(3px)",
//           }}
//           onClick={() => setSidebarOpen(false)}
//         >
//           <div
//             className={`absolute top-0 h-full w-64 bg-white shadow-xl rounded-l-2xl transition-transform duration-300 ${
//               isRTL ? "right-0 translate-x-0" : "left-0 translate-x-0"
//             }`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import Sidebar from "@/components/S.idebar";
// import { LayoutDashboard, CalendarDays, Settings, SquarePlus, Rows3, Plus, Building2, ShieldCheck } from "lucide-react";
// //import { useState } from "react";

// const navSections = [
//   {
//     title: "لوحة التحكم",
//     openByDefault: true,
//     items: [
//       { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard, to: "/owner/dashboard" },
//       { id: "templates", label: "عرض كل القوالب", icon: Rows3, to: "/owner/templates" },
//       { id: "add-field", label: "إضافة ملعب", icon: SquarePlus, to: "/owner/add-field" },
//     ],
//   },
//   // ...
// ];

// export default function OwnerLayout() {
//   //const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" >
//       <div className="hidden md:block fixed top-0 right-0 h-screen w-64">
//         <Sidebar mode="owner" navSections={navSections} isRTL={true} open={true} />
//       </div>

//       {/* main */}
//       {/* mobile: toggle sidebarOpen and pass open/onClose */}
//     </div>
//   );
// }

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

import Header from "./Header";
import AdminFooter from "../../AdminLayout/AdminFooter";

import {
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
} from "lucide-react";
import Home from "@/pages/Home/Home";

const navSections = [
  { id: "dashboard", title: "لوحة التحكم", icon: Home },
  {
    id: "arenas",
    title: "الملاعب",
    icon: LibraryBig,
    items: [
      { id: "arenas-all", label: "عرض كل الملاعب", icon: ListChecks },
      { id: "arena-new", label: "إضافة ملعب", icon: Plus },
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
  { id: "settings", title: "الإعدادات", icon: Settings },
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

// import { useState } from "react";

// import { Outlet } from "react-router-dom";
// import { Home, LibraryBig, ListChecks, Plus, Calendar, Settings } from "lucide-react";
// import Sidebar from "@/components/S.idebar";

// const navSections = [
//   { id: "dashboard", title: "لوحة التحكم", icon: Home },
//   {
//     id: "arenas",
//     title: "الملاعب",
//     icon: LibraryBig,
//     items: [
//       { id: "arenas-all", label: "عرض كل الملاعب", icon: ListChecks },
//       { id: "arena-new", label: "إضافة ملعب", icon: Plus },
//     ],
//   },
//   {
//     id: "reservations",
//     title: "الحجوزات",
//     icon: Calendar,
//     items: [
//       { id: "calendar", label: "التقويم", icon: Calendar },
//       { id: "booking-new", label: "حجز جديد", icon: Plus },
//     ],
//   },
//   { id: "settings", title: "الإعدادات", icon: Settings },
// ];

// export default function OwnerLayout() {
//   const [activeKey, setActiveKey] = useState("dashboard");

//   return (
//     <div className="flex flex-row-reverse min-h-screen bg-gray-50 text-neutral-900">
//       <aside className="fixed top-0 right-0 h-screen z-50">
//         <Sidebar navSections={navSections} activeKey={activeKey} onChange={setActiveKey} />
//       </aside>

//       <div className="flex-1 mr-64 p-6">
//         <main className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[80vh]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
