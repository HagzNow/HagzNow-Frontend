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


export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("general");

  const menu = [
    {
      key: "dashboard",
      label: "إحصائيات",
      icon: <ChartLine className="h-4 w-4" />,
      href: "#dashboard",
    },
    {
      key: "users",
      label: "إدارة الفئات",
      icon: <Box className="h-4 w-4" />,
      href: "#users",
    },
    {
      key: "arenas",
      label: " إدارة المستخدمين",
      icon: <Users className="h-4 w-4" />,
      href: "#arenas",
    },
    {
      key: "security",
      label: "عرض جميع الحجوزات",
      icon: <Calendar className="h-4 w-4" />,
      href: "#security",
    },
    {
      key: "help",
      label: " طلبات الساحه المعلقة",
      icon: <FileCog className="h-4 w-4" />,
      href: "#help",
    },
    {
      key: "feedback",
      label: "الاعدادت العامه",
      icon: <MessageSquareText className="h-4 w-4" />,
      href: "#feedback",
      badge: "جديد",
    },
  ];

  return (
    <div className="min-h-screen flex bg-neutral-50 text-neutral-900 ">
      {/* Sidebar */}
      <Sidebar
        menuItems={menu}
        activeKey={activeKey}
        onChange={setActiveKey}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((s) => !s)}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main Content + Header */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm min-h-[70vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
