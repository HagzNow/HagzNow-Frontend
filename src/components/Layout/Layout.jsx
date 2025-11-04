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

import Navbar from "../Navbar"; // للزائر أو اليوزر
import Footer from "../Footer";

import AdminNavbar from "../AdminLayout/AdminNavbar";
import AdminFooter from "../AdminLayout/AdminFooter";

import Header from "../OwnerComponents/OwnerLayout/Header"; // Navbar بتاع الأونر
import UserNavbar from "../NavbarUser";

export default function Layout() {
  const { user } = useContext(authContext);

  // مبدئياً حط الافتراضي (لو مفيش يوزر)
  let HeaderComponent = Navbar;
  let FooterComponent = Footer;

  // ✅ المنطق حسب الرول وحالة الدخول
  if (!user) {
    // الحالة 1: زائر (مش عامل login)
    HeaderComponent = Navbar;
    FooterComponent = Footer;
  } else if (user.role === "user") {
    // الحالة 2: يوزر عامل login
    HeaderComponent = UserNavbar;
    FooterComponent = Footer;
  } else if (user.role === "admin") {
    // الحالة 3: أدمن
    HeaderComponent = AdminNavbar;
    FooterComponent = AdminFooter;
  } else if (user.role === "owner") {
    // الحالة 4: أونر
    HeaderComponent = Header;
    FooterComponent = AdminFooter;
  }

  return (
    <div className="app-layout flex flex-col min-h-screen">
      {/* ✅ Navbar */}
      <HeaderComponent />

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
