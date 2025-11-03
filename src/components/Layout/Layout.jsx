import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { authContext } from "../../Contexts/AuthContext";
import AdminNavbar from "../AdminLayout/AdminNavbar";
import AdminFooter from "../AdminLayout/AdminFooter";
import Header from "../OwnerComponents/Header";

export default function Layout() {
  const { user } = useContext(authContext);

  let HeaderComponent = Navbar;
  let FooterComponent = Footer;

  if (user?.role === "admin") {
    HeaderComponent = AdminNavbar;
    FooterComponent = AdminFooter;
  } else if (user?.role === "owner") {
    HeaderComponent = Header;
    FooterComponent = AdminFooter;
  }

  return (
    <div className="app-layout">
      {user?.role !== "owner" && ""} {/* ✅ كده الأخضر مش هيظهر */}
      <main className="content">
        <Outlet />
      </main>
      <div
  className={` z-50 relative ${
    user?.role === "owner" ? "mr-[270px]" : ""
  }`}
>
  {FooterComponent && <AdminFooter />}
</div>
</div>
 
 
  );
}


