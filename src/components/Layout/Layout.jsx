import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { authContext } from "../../Contexts/AuthContext";
import AdminNavbar from "../AdminLayout/AdminNavbar";
import AdminFooter from "../AdminLayout/AdminFooter";

export default function Layout() {
  let { user } = useContext(authContext);


  return (
    <div>
      {user?.role === "admin" ? <AdminNavbar /> : <Navbar />}
      <div >
        <Outlet />
      </div>
      {user?.role === "admin" ? <AdminFooter /> : <Footer />}
    </div>
  );
}
