import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

// <<<<<<< HEAD
import UserArenas from "./pages/UserArenas/UserArenas";
import AdminArenaRequests from "./pages/AdminArenaRequests/AdminArenaRequests";
// =======
import Reservation from "./pages/Reservation/Reservation";
import ReservationDetails from "./pages/ReservationDetails/ReservationDetails";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedLoginAndRegister from "./Routes/protectedLoginAndRegister";
import ProtectedRoutes from "./Routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
// >>>>>>> origin/master

function App() {
  const { i18n } = useTranslation();

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/home", element: <Home /> },
        // <<<<<<< HEAD
        //         { path: "/login", element: <Login /> },
        //         { path: "register", element: <Register /> },
        //         { path: "user-arena", element: <UserArenas /> },
        //         { path: "admin-arena-requests", element: <AdminArenaRequests /> },
        // =======

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
          path: "/reservation",
          element: (
            <ProtectedRoutes role="user">
              <Reservation />
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
          path: "/user-arena",
          element: (
            <ProtectedRoutes role="user">
              <UserArenas />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/admin-arena-requests",
          element: (
            <ProtectedRoutes role="admin">
              <AdminArenaRequests />
            </ProtectedRoutes>
          ),
        },
        // >>>>>>> origin/master
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
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
      </AuthContextProvider>
    </>
  );
}

export default App;
