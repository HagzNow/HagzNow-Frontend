import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";
import AdminFooter from "../../AdminLayout/AdminFooter";

export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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
        <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
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

        {/* ✅ Footer يظهر هنا */}
        <div className="mt-4 z-50">
          <AdminFooter />
        </div>
      </div>

      {/* ✅ Sidebar Mobile Overlay */}
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
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
