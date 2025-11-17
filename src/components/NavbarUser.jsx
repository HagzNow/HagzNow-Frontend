import { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Settings, Wallet, Calendar, MapPin, ChevronDown, UserCircle } from 'lucide-react';
import { authContext } from '../Contexts/AuthContext';

const UserNavbar = () => {
  const { user, setToken, setUser } = useContext(authContext);
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsDropdownOpen(false);
    console.log('✅ Logged out successfully!');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const publicPaths = ['/home', '/user-arena', '/login', '/register'];
    if (!isLoggedIn && !publicPaths.includes(location.pathname)) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out relative">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center lg:justify-start gap-8 w-full lg:w-auto">
          <Link
            to="/home"
            className="text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
          >
            ArenaBook
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex flex-wrap justify-center sm:flex-row items-center gap-3 sm:gap-4 lg:ml-14">
            <Link
              to="/book"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 ease-in-out group font-medium"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="whitespace-nowrap">أحجز معنا</span>
            </Link>

            <Link
              to="/my-bookings"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 ease-in-out group font-medium"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="whitespace-nowrap">حجوزاتي</span>
            </Link>

            <Link
              to="/user-arena"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 ease-in-out group font-medium"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="whitespace-nowrap">الملاعب</span>
            </Link>
          </div>
        </div>

        {/* User Section with Dropdown */}
        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            {/* User Dropdown Trigger */}
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-200 transition-all duration-500 ease-in-out group cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user?.avatar ? (
                <img
                  src={`${user.avatar}?v=${user.avatarVersion || Date.now()}`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white group-hover:border-green-200 transition-all duration-300 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  {`${user?.fName || 'User'} ${user?.lName || ''}`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu - Now properly positioned relative to the trigger */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95">
                {/* User Info Header */}
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <div className="flex items-center gap-3">
                    {user?.avatar ? (
                      <img
                        src={`${user.avatar}?v=${user.avatarVersion || Date.now()}`}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm">{`${user?.fName || 'User'} ${user?.lName || ''}`}</p>
                      <p className="text-white/80 text-xs mt-1">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}
                <div className="p-2">
                  <Link
                    to="/userProfile"
                    className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all duration-300 ease-in-out group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <UserCircle className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                    <span className="font-medium">تعديل الملف الشخصي</span>
                  </Link>

                  <Link
                    to="/wallet"
                    className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all duration-300 ease-in-out group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Wallet className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                    <span className="font-medium">محفظتي</span>
                  </Link>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-300 ease-in-out group w-full text-right"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">تسجيل خروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Border Gradient Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </nav>
  );
};

export default UserNavbar;
