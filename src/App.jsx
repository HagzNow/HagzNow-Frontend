import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

import UserArenas from "./pages/UserArenas/UserArenas";
import AdminArenaRequests from "./pages/AdminArenaRequests/AdminArenaRequests";
import Reservation from "./pages/Reservation/Reservation";
import ReservationDetails from "./pages/ReservationDetails/ReservationDetails";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedLoginAndRegister from "./Routes/protectedLoginAndRegister";
import ProtectedRoutes from "./Routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReservationContextProvider from "./Contexts/ReservationContext";
import Extras from "./pages/Extras/Extras";
import ManualBookingForm from "./pages/Owner/ManualBooking";
import ArenaCardPremium from "./components/OwnerComponents/ArenaCardComponent/ArenaCard";
import AddArena from "./pages/Owner/AddArenas";
import BookingArena from "./pages/BookingArena/BookingArena";
import ConfirmReservation from "./pages/ConfirmReservation/ConfirmReservation";
import Wallet from "./pages/Wallet/Wallet";

import AdminLayout from "./components/AdminLayout/AdminLayout";
import SettingsPage from "./pages/SettingPage/SettingsPage";
import OwnerLayout from "./components/OwnerComponents/OwnerLayout/OwnerLayout";
import ReservationStep from "./components/Steps/ReservationStep";
import PendingRequests from "./pages/SettingPage/PendingRequests";
import UserAllReservation from "./pages/UserAllReservation/UserAllReservation";
import UserManagement from "./pages/AdminPages/UserManagement";
import ArenaMangmentCategories from "./pages/AdminPages/ArenaMangmentCategories";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  const { i18n } = useTranslation();

  // const routes = createBrowserRouter([
  //   {
  //     path: "",
  //     element: <Layout />,
  //     children: [
  //       { path: "/home", element: <Home /> },

  //       {
  //         path: "/login",
  //         element: (
  //           // <ProtectedLoginAndRegister>
  //           <Login />
  //           // </ProtectedLoginAndRegister>
  //         ),
  //       },
  //       {
  //         path: "/register",
  //         element: (
  //           // <ProtectedLoginAndRegister>
  //           <Register />
  //           // </ProtectedLoginAndRegister>
  //         ),
  //       },

  //       {
  //         path: "/reservation/:id",
  //         element: (
  //           <ProtectedRoutes role="user">
  //             <Reservation />
  //           </ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/extras/:id",
  //         element: (
  //           <ProtectedRoutes role="user">
  //             <Extras />
  //           </ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/addarena",
  //         element: (
  //           //<ProtectedRoutes role="owner">

  //             <AddArena />
  //           //</ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/manualbooking",
  //         element: (
  //           // <ProtectedRoutes role="user">
  //           <ManualBookingForm />
  //           //</ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/arenacard",
  //         element: (
  //           // <ProtectedRoutes role="user">
  //           <ArenaCardPremium />
  //           // </ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/confirm",
  //         element: (
  //           // <ProtectedRoutes role="user">
  //           <ConfirmReservation />
  //           // </ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/user-arena",
  //         element: <UserArenas />,
  //       },
  //       {
  //         path: "/admin-arena-requests",
  //         element: (
  //           <ProtectedRoutes role="admin">
  //             <AdminArenaRequests />
  //           </ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/booking/:id",
  //         element: (
  //           // <ProtectedRoutes role="user">
  //           <BookingArena />
  //           // </ProtectedRoutes>
  //         ),
  //       },
  //       {
  //         path: "/wallet",
  //         element: <Wallet />,
  //       },

  //       {
  //         path: "/SettingsPage",
  //         element: (
  //           <ProtectedRoutes role="admin">
  //             <AdminLayout />
  //           </ProtectedRoutes>
  //         ),
  //       },
  //     ],
  //   },
  // ]);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />, // فقط user وguest
      children: [
        { path: "/home", element: <Home /> },
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/userProfile",
          element: (
            <ProtectedRoutes role="user">
              <UserProfile />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/reservation/:id",
          element: (
            <ProtectedRoutes role="user">
              <Reservation />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/extras/:id",
          element: (
            <ProtectedRoutes role="user">
              <Extras />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/booking/:id",
          element: <BookingArena />,
        },
        {
          path: "/all-reservations",
          element: (
            <ProtectedRoutes role="user">
              <UserAllReservation />
            </ProtectedRoutes>
          ),
        },
      ],
    },

    // ✅ Owner routes
    {
      path: "/owner",
      element: (
        //  <ProtectedRoutes role="owner">
        <OwnerLayout />
        // </ProtectedRoutes>
      ),
      children: [
        { path: "add-arena", element: <AddArena /> },
        { path: "manual-booking", element: <ManualBookingForm /> },
      ],
    },

    // ✅ Admin routes
    {
      path: "/admin",
      element: (
        <ProtectedRoutes role="admin">
          <AdminLayout />
        </ProtectedRoutes>
      ),
      children: [

        { path: "settings", element: <SettingsPage /> },
        { path: "pending-requests", element: <PendingRequests /> },
        // { path: "all-reservations", element:  <UserAllReservation /> },
        { path: "admin-arena-requests", element: <AdminArenaRequests /> },

      ],
    },


    // {
    //         path: "/admin-arena-requests",
    //         element: (
    //           <ProtectedRoutes role="admin">
    //             
    //           </ProtectedRoutes>
    //         ),
    //       },






    {
      path: "/confirm",
      element: (
        // <ProtectedRoutes role="user">
        <ConfirmReservation />
        // </ProtectedRoutes>
      ),
    },
    {
      path: "/user-arena",
      element: <UserArenas />,
    },
    {
      path: "/arenacard",
      element: (
        // <ProtectedRoutes role="user">
        <ArenaCardPremium />
        // </ProtectedRoutes>
      ),
    },
    {
      path: "/wallet",

      element: (
        <ProtectedRoutes role="user">
          <Wallet />
        </ProtectedRoutes>
      ),
    },

    {
      path: "/SettingsPage",
      element: (
        <ProtectedRoutes role="admin">
          <AdminLayout />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/all-reservations",
      element: (
        <ProtectedRoutes role="user">
          <UserAllReservation />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/categoriesmanagment",
      element: (
        <ProtectedRoutes role="admin">
          <ArenaMangmentCategories />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/usermanagment",
      element: (
        <ProtectedRoutes role="admin">
          <UserManagement />
        </ProtectedRoutes>
      ),
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <ReservationContextProvider>
          <Toaster
            key={i18n.language}
            position="bottom-left"
            toastOptions={{
              style: {
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              },
            }}
          />
          <RouterProvider router={routes} />
        </ReservationContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
