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

function App() {
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

        { path: "/reservation", element: <Reservation /> },
        { path: "/reservationDetails", element: <ReservationDetails /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
        <Toaster />
      </AuthContextProvider>
    </>
  );
}

export default App;
