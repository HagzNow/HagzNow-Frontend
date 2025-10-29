import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

import UserArenas from "./pages/UserArenas/UserArenas";
import AdminArenaRequests from "./pages/AdminArenaRequests/AdminArenaRequests";
<<<<<<< HEAD
=======
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
>>>>>>> master

function App() {
  const { i18n } = useTranslation();

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/home", element: <Home /> },
<<<<<<< HEAD
        { path: "/login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "user-arena", element: <UserArenas /> },
        { path: "admin-arena-requests", element: <AdminArenaRequests /> },
=======

        {
          path: "/login",
          element: (
            <ProtectedLoginAndRegister>
              <Login />
            </ProtectedLoginAndRegister>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedLoginAndRegister>
              <Register />
            </ProtectedLoginAndRegister>
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
          path: "/reservationDetails",
          element: (
            <ProtectedRoutes role="user">
              <ReservationDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/addarena",
          element: (
            <ProtectedRoutes role="user">
              <AddArena />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/manualbooking",
          element: (
            <ProtectedRoutes role="user">
              <ManualBookingForm />
            </ProtectedRoutes>
          ),
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
          path: "/admin-arena-requests",
          element: (
            <ProtectedRoutes role="admin">
              <AdminArenaRequests />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/booking/:id",
          element: (
            // <ProtectedRoutes role="user">
            <BookingArena />
            // </ProtectedRoutes>
          ),
        },
>>>>>>> master
      ],
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
