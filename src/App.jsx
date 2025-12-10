import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import AdminArenaRequests from './pages/AdminArenaRequests/AdminArenaRequests';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Reservation from './pages/Reservation/Reservation';
import UserArenas from './pages/UserArenas/UserArenas';
// import ReservationDetails from "./pages/ReservationDetails/ReservationDetails";
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ArenaCardPremium from './components/OwnerComponents/ArenaCardComponent/ArenaCard';
import AuthContextProvider from './Contexts/AuthContext';
import ReservationContextProvider from './Contexts/ReservationContext';
import { ThemeProvider } from './Contexts/ThemeContext';
import BookingArena from './pages/BookingArena/BookingArena';
import ConfirmReservation from './pages/ConfirmReservation/ConfirmReservation';
import Extras from './pages/Extras/Extras';
import AddArena from './pages/Owner/AddArenas';
import ManualBookingForm from './pages/Owner/ManualBooking';
import Wallet from './pages/Wallet/Wallet';
import ProtectedRoutes from './Routes/ProtectedRoute';

import AdminLayout from './components/AdminLayout/AdminLayout';
import OwnerLayout from './components/OwnerComponents/OwnerLayout/OwnerLayout';
import SettingsPage from './pages/SettingPage/SettingsPage';
// import ReservationStep from "./components/Steps/ReservationStep";
import ArenaMangmentCategories from './pages/AdminPages/ArenaMangmentCategories';
import UserManagement from './pages/AdminPages/UserManagement';
import WithdrawalRequests from './pages/AdminPages/WithdrawalRequests';
import OwnerArenas from './pages/Owner/OwnerArenas';
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import ReservationView from './pages/ReservationView/ReservationView';
import PendingRequests from './pages/SettingPage/PendingRequests';
import UserAllReservation from './pages/UserAllReservation/UserAllReservation';
import UserProfile from './pages/UserProfile/UserProfile';
import OwnerReservations from './pages/Owner/OwnerReservations';
import OwnerArenaDetails from './pages/Owner/OwnerArenaDetails';

function App() {
  const { i18n } = useTranslation();

 
  const routes = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        {
          path: '/userProfile',
          element: (
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/reservation/:id',
          element: (
            <ProtectedRoutes role="user">
              <Reservation />
            </ProtectedRoutes>
          ),
        },
        { path: '/reservations/:id', element: <ReservationView /> },
        {
          path: '/extras/:id',
          element: (
            <ProtectedRoutes role="user">
              <Extras />
            </ProtectedRoutes>
          ),
        },
        { path: '/booking/:id', element: <BookingArena /> },
        {
          path: '/my-bookings',
          element: (
            <ProtectedRoutes role="user">
              <UserAllReservation />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/wallet',
          element: (
            <ProtectedRoutes>
              <Wallet />
            </ProtectedRoutes>
          ),
        },
        { path: '/confirm/:id', element: <ConfirmReservation /> },
        { path: '/user-arena', element: <UserArenas /> },
        { path: '/arenacard', element: <ArenaCardPremium /> },
        {
          path: '/all-reservations',
          element: (
            <ProtectedRoutes role="user">
              <UserAllReservation />
            </ProtectedRoutes>
          ),
        },
      ],
    },

    // Owner routes
    {
      path: '/owner',
      element: (
        <ProtectedRoutes role="owner">
          <OwnerLayout />
        </ProtectedRoutes>
      ),
      children: [
        { path: 'dashboard', element: <OwnerDashboard /> },
        { path: 'add-arena', element: <AddArena /> },
        { path: 'manual-booking', element: <ManualBookingForm /> },
        { path: 'arenas', element: <OwnerArenas /> },
        { path: 'arena/:id', element: <OwnerArenaDetails /> },
        { path: 'reservations', element: <OwnerReservations /> },
        { path: 'wallet', element: <Wallet /> },
        { path: 'userProfile', element: <UserProfile /> },
        { path: 'reservations/:id', element: <ReservationView /> },
      ],
    },

    // Admin routes
    {
      path: '/admin',
      element: (
        <ProtectedRoutes role="admin">
          <AdminLayout />
        </ProtectedRoutes>
      ),
      children: [
        { path: 'settings', element: <SettingsPage /> },
        { path: 'pending-requests', element: <PendingRequests /> },
        { path: 'admin-arena-requests', element: <AdminArenaRequests /> },
        { path: 'categoriesmanagment', element: <ArenaMangmentCategories /> },
        { path: 'usermanagment', element: <UserManagement /> },
        { path: 'wallet', element: <Wallet /> },
        { path: 'withdrawal-requests', element: <WithdrawalRequests /> },
      ],
    },
  ]);
  return (
    <>
      <ThemeProvider>
        <AuthContextProvider>
          <ReservationContextProvider>
            <Toaster
              key={i18n.language}
              position="bottom-left"
              toastOptions={{
                style: {
                  direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                },
              }}
            />
            <RouterProvider router={routes} />
          </ReservationContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
