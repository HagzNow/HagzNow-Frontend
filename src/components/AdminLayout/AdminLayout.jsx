// // import { useState } from "react";
// // import Sidebar from "./AdminSidebar";
// // import {
// //   ChartLine,
// //   Box,
// //   Users,
// //   Calendar,
// //   FileCog,
// //   MessageSquareText,
// // } from "lucide-react";
// // import Header from "../OwnerComponents/OwnerLayout/Header";
// // import AdminNavbar from "./AdminNavbar";

// // export default function AdminLayout({ children }) {
// //   const [activeKey, setActiveKey] = useState("general");

// //  const menu = [
// //   { key: "dashboard", label: "إحصائيات", icon: <ChartLine />, href: "#dashboard" },
// //   { key: "categories", label: "إدارة الفئات", icon: <Box />, href: "#categories" },
// //   { key: "users", label: "إدارة المستخدمين", icon: <Users />, href: "#users" },
// //   { key: "reservations", label: "عرض جميع الحجوزات", icon: <Calendar />, href: "#reservations" },
// //   { key: "pending-requests", label: "طلبات الساحة المعلقة", icon: <FileCog />, href: "#pending-requests" },
// //   { key: "settings", label: "الإعدادات العامة", icon: <MessageSquareText />, badge: "جديد", href: "#settings" },
// // ];


// //   return (
// //     <>
// //       {/* ✅ Header ثابت ومحاذي للسايدبار */}
// //       <AdminNavbar/>

// //       <div className="min-h-screen flex bg-neutral-50 text-neutral-900">
// //         {/* ✅ Sidebar ثابت على الشمال */}
// //         <Sidebar
// //           menuItems={menu}
// //           activeKey={activeKey}
// //           onChange={setActiveKey}
// //           className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
// //         />

// //         {/* ✅ المحتوى الرئيسي */}
// //         <div className="flex-1 flex flex-col ml-64 mt-16 transition-all duration-300">
// //           <main className="flex-1 p-4 md:p-6">
// //             <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[70vh]">
// //               {children}
// //             </div>
// //           </main>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }





// // // import { useState } from "react";
// // // import Sidebar from "./AdminSidebar";
// // // import AdminNavbar from "./AdminNavbar";
// // // import { Outlet } from "react-router-dom";
// // // import { ChartLine, Box, Users, Calendar, FileCog, MessageSquareText } from "lucide-react";

// // // export default function AdminLayout() {
// // //   const [activeKey, setActiveKey] = useState("dashboard");

// // //   const menu = [
// // //     { key: "dashboard", label: "إحصائيات", icon: <ChartLine className="h-4 w-4" />, to: "/admin" },
// // //     { key: "categories", label: "إدارة الفئات", icon: <Box className="h-4 w-4" />, to: "/admin/categories" },
// // //     { key: "users", label: "إدارة المستخدمين", icon: <Users className="h-4 w-4" />, to: "/admin/users" },
// // //     { key: "reservations", label: "عرض جميع الحجوزات", icon: <Calendar className="h-4 w-4" />, to: "/admin/reservations" },
// // //     { key: "pendingRequests", label: "طلبات الساحة المعلقة", icon: <FileCog className="h-4 w-4" />, to: "/admin/pending-requests" },
// // //     { key: "settings", label: "الإعدادات العامة", icon: <MessageSquareText className="h-4 w-4" />, to: "/admin/settings", badge: "جديد" },
// // //   ];

// // //   return (
// // //     <>
// // //       <AdminNavbar />
// // //       <div className="min-h-screen flex bg-neutral-50 text-neutral-900">
// // //         <Sidebar menuItems={menu} activeKey={activeKey} onChange={setActiveKey} />
// // //         <div className="flex-1 flex flex-col ml-64 mt-16 transition-all duration-300">
// // //           <main className="flex-1 p-4 md:p-6">
// // //             <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[70vh]">
// // //               <Outlet /> {/* هنا بتظهر صفحة التشايلد */}
// // //             </div>
// // //           </main>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }


// import { useState } from "react";
// import { Outlet } from "react-router-dom"; // مهم
// import Sidebar from "./AdminSidebar";
// import {
//   ChartLine,
//   Box,
//   Users,
//   Calendar,
//   FileCog,
//   MessageSquareText,
// } from "lucide-react";
// import AdminNavbar from "./AdminNavbar";

// export default function AdminLayout() {
//   const [activeKey, setActiveKey] = useState("dashboard");

//   const menu = [
//     { key: "dashboard", label: "إحصائيات", icon: <ChartLine />, to: "dashboard" },
//     { key: "categories", label: "إدارة الفئات", icon: <Box />, to: "categories" },
//     { key: "users", label: "إدارة المستخدمين", icon: <Users />, to: "users" },
//     { key: "reservations", label: "عرض جميع الحجوزات", icon: <Calendar />, to: "reservations" },
//     { key: "pending-requests", label: "طلبات الساحة المعلقة", icon: <FileCog />, to: "pending-requests" },
//     { key: "settings", label: "الإعدادات العامة", icon: <MessageSquareText />, badge: "جديد", to: "settings" },
//   ];

//   return (
//     <>
//       <AdminNavbar />

//       <div className="min-h-screen flex bg-neutral-50 text-neutral-900">
//         <Sidebar menuItems={menu} activeKey={activeKey} onChange={setActiveKey} />

//         <div className="flex-1 flex flex-col ml-64 mt-16 transition-all duration-300">
//           <main className="flex-1 p-4 md:p-6">
//             <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[70vh]">
//               {/* ديه أهم حاجة: هنا تظهر صفحات الأطفال */}
//               <Outlet />
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }



import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import {
  ChartLine,
  Box,
  Users,
  Calendar,
  FileCog,
  MessageSquareText,
} from "lucide-react";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  const [activeKey, setActiveKey] = useState("dashboard");

  const menu = [
    { key: "dashboard", label: "إحصائيات", icon: <ChartLine />, to: "dashboard" },
    { key: "categories", label: "إدارة الفئات", icon: <Box />, to: "categories" },
    { key: "users", label: "إدارة المستخدمين", icon: <Users />, to: "users" },
    { key: "reservations", label: "عرض جميع الحجوزات", icon: <Calendar />, to: "reservations" },
    { key: "admin-arena-requests", label: "طلبات الساحة المعلقة", icon: <FileCog />, to: "admin-arena-requests" },
    { key: "settings", label: "الإعدادات العامة", icon: <MessageSquareText />, badge: "جديد", to: "settings" },
  ];

  return (
    <>
      <AdminNavbar />

    <div className="flex flex-row-reverse min-h-screen bg-neutral-50 text-neutral-900">
  {/* Sidebar */}
  <aside className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-74 border-l border-neutral-200 bg-white">
    <Sidebar menuItems={menu} activeKey={activeKey} onChange={setActiveKey} />
  </aside>

  {/* Main Content */}
  <div className="flex-1 mr-64 mt-16 p-4 md:p-6">
    <main className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[80vh] mr-[38px] mt-[-50px]">
      <Outlet />
    </main>
  </div>
</div>

    </>
  );
}
