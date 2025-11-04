// import { useState } from "react";
// import Sidebar from "./AdminSidebar";
// import {
//   ChartLine,
//   Box,
//   Users,
//   Calendar,
//   FileCog,
//   MessageSquareText,
// } from "lucide-react";
// import Header from "../OwnerComponents/OwnerLayout/Header";


// export default function AdminLayout({ children }) {

//   const [activeKey, setActiveKey] = useState("general");
// const menu = [
//   {
//     key: "dashboard",
//     label: "إحصائيات",
//     icon: <ChartLine className="h-4 w-4" />,
//     href: "#dashboard", 
//   },
//   {
//     key: "categories",
//     label: "إدارة الفئات",
//     icon: <Box className="h-4 w-4" />,
//     href: "#categories", 
//   },
//   {
//     key: "users",
//     label: "إدارة المستخدمين",
//     icon: <Users className="h-4 w-4" />,
//     href: "#users",
//   },
//   {
//     key: "reservations",
//     label: "عرض جميع الحجوزات",
//     icon: <Calendar className="h-4 w-4" />,
//     href: "#reservations", 
//   },
//   {
//     key: "pendingRequests",
//     label: "طلبات الساحة المعلقة",
//     icon: <FileCog className="h-4 w-4" />,
//     href: "#pending-requests", 
//   },
//   {
//     key: "settings",
//     label: "الإعدادات العامة",
//     icon: <MessageSquareText className="h-4 w-4" />,
//     href: "#settings", 
//     badge: "جديد",
//   },
// ];

//   return (
//     <>
//     <Header className="fixed top-0 left-64 right-0 z-40 bg-white shadow-sm"  />
//     <div className="min-h-screen flex bg-neutral-50 text-neutral-900 ">
      
//       {/* Sidebar */}
//       <Sidebar
//         menuItems={menu}
//         activeKey={activeKey}
//         onChange={setActiveKey}
//            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
//       />

//       {/* Main Content + Header */}
//       <div className="flex-1 flex flex-col">
//         <main className="flex-1 p-4 md:p-6">
//           <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[70vh]">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//     </>
//   );
// }


import { useState } from "react";
import Sidebar from "./AdminSidebar";
import {
  ChartLine,
  Box,
  Users,
  Calendar,
  FileCog,
  MessageSquareText,
} from "lucide-react";
import Header from "../OwnerComponents/OwnerLayout/Header";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  const [activeKey, setActiveKey] = useState("general");

  const menu = [
    {
      key: "dashboard",
      label: "إحصائيات",
      icon: <ChartLine className="h-4 w-4" />,
      href: "#dashboard",
    },
    {
      key: "categories",
      label: "إدارة الفئات",
      icon: <Box className="h-4 w-4" />,
      href: "#categories",
    },
    {
      key: "users",
      label: "إدارة المستخدمين",
      icon: <Users className="h-4 w-4" />,
      href: "#users",
    },
    {
      key: "reservations",
      label: "عرض جميع الحجوزات",
      icon: <Calendar className="h-4 w-4" />,
      href: "#reservations",
    },
    {
      key: "pendingRequests",
      label: "طلبات الساحة المعلقة",
      icon: <FileCog className="h-4 w-4" />,
      href: "#pending-requests",
    },
    {
      key: "settings",
      label: "الإعدادات العامة",
      icon: <MessageSquareText className="h-4 w-4" />,
      href: "#settings",
      badge: "جديد",
    },
  ];

  return (
    <>
      {/* ✅ Header ثابت ومحاذي للسايدبار */}
      <AdminNavbar/>

      <div className="min-h-screen flex bg-neutral-50 text-neutral-900">
        {/* ✅ Sidebar ثابت على الشمال */}
        <Sidebar
          menuItems={menu}
          activeKey={activeKey}
          onChange={setActiveKey}
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
        />

        {/* ✅ المحتوى الرئيسي */}
        <div className="flex-1 flex flex-col ml-64 mt-16 transition-all duration-300">
          <main className="flex-1 p-4 md:p-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[70vh]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
