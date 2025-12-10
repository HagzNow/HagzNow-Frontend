import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";

import Navbar from "../Navbar"; // كل الأدوار - يتم تغيير القوائم فقط
import Footer from "../Footer";
import AdminFooter from "../AdminLayout/AdminFooter";

export default function Layout() {
  const { user } = useContext(authContext);

  const variant =
    !user ? "public" : user.role === "admin" ? "admin" : user.role === "owner" ? "owner" : "user";
  const FooterComponent = user?.role === "admin" || user?.role === "owner" ? AdminFooter : Footer;

  return (
    <div className="app-layout flex flex-col min-h-screen">
      {/* ✅ Navbar */}
      <Navbar variant={variant} />

      {/* ✅ المحتوى */}
      <main className="flex-grow container">
        <Outlet />
      </main>

      {/* ✅ Footer */}
      <div
        className={`z-50 relative ${
          user?.role === "owner" ? "mr-[270px]" : ""
        }`}
      >
        {FooterComponent && <FooterComponent />}
      </div>
    </div>
  );
}
