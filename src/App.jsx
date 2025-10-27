import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Reservation from "./pages/Reservation/Reservation";
import ReservationDetails from "./pages/ReservationDetails/ReservationDetails";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedLoginAndRegister from "./Routes/protectedLoginAndRegister";
import ProtectedRoutes from "./Routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReservationContextProvider from "./Contexts/ReservationContext";

function App() {
  const { i18n } = useTranslation();

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/home", element: <Home /> },

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
