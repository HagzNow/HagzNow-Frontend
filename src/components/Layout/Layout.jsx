// import React, { useContext } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import { authContext } from "../../Contexts/AuthContext";
// import AdminNavbar from "../AdminLayout/AdminNavbar";
// import AdminFooter from "../AdminLayout/AdminFooter";

// export default function Layout() {
//   let { user } = useContext(authContext);

//   return (
//     <div>
//       {user?.role === "admin" ? <AdminNavbar /> : <Navbar />}
//       <div >
//         <Outlet />
//       </div>
//       {user?.role === "admin" ? <AdminFooter /> : <Footer />}
//     </div>
//   );
// }

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { authContext } from "../../Contexts/AuthContext";
import AdminNavbar from "../AdminLayout/AdminNavbar";
import AdminFooter from "../AdminLayout/AdminFooter";
import Header from "../OwnerComponents/Header";
// import Header from ;

export default function Layout() {
  const { user } = useContext(authContext);
  let HeaderCustom = Navbar;
  let FooterComponent = Footer;
  if (user?.role === "admin") {
    HeaderCustom = AdminNavbar;
    FooterComponent = AdminFooter;
  } else if (user?.role === "owner") {
    HeaderCustom = Header;
    // FooterComponent = AdminFooter;
  }

  return (
    <div className="app-layout">
      <HeaderCustom />
      <main className="content">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
}
