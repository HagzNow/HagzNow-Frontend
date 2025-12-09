// import React, { useContext } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import { authContext } from "../../Contexts/AuthContext";
// import AdminNavbar from "../AdminLayout/AdminNavbar";
// import AdminFooter from "../AdminLayout/AdminFooter";
// import Header from "../OwnerComponents/Header";

// export default function Layout() {
//   const { user } = useContext(authContext);

//   let HeaderComponent = Navbar;
//   let FooterComponent = Footer;

//   if (user?.role === "admin") {
//     HeaderComponent = AdminNavbar;
//     FooterComponent = AdminFooter;
//   } else if (user?.role === "owner") {
//     HeaderComponent = Header;
//     FooterComponent = AdminFooter;
//   }

//   return (
//     <div className="app-layout">
//       {user?.role !== "owner" && ""} {/* ✅ كده الأخضر مش هيظهر */}
//       <main className="content">
//         <Outlet />
//       </main>
//       <div
//   className={` z-50 relative ${
//     user?.role === "owner" ? "mr-[270px]" : ""
//   }`}
// >
//   {FooterComponent && <AdminFooter />}
// </div>
// </div>

//   );
// }

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
      <main className="flex-grow">
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
