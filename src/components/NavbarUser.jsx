import { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react"; 
import { authContext } from "../Contexts/AuthContext";

const UserNavbar = () => {
  const { user, setToken, setUser } = useContext(authContext);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation(); // ✅ استيراد

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    console.log("✅ Logged out successfully!");
  };
  //    useEffect(() => {
   //   const fetchUser = async () => {
   //     if (isLoggedIn && !user) {
   //       try {
   //         const res = await baseUrl.get("/users/profile", {
   //           headers: { Authorization: `Bearer ${isLoggedIn}` },
   //         });
   //         setUser(res.data.data);
   //       } catch (err) {
   //         console.error("Failed to fetch user:", err);
   //         setUser(null);
   //         setToken(null);
   //         localStorage.removeItem("token");
   //         navigate("/login", { replace: true });
   //       }
   //     } else if (!isLoggedIn) {
   //       navigate("/login", { replace: true });
   //     }
   //   };
   //      fetchUser();
   // }, [isLoggedIn, user, setUser, setToken, navigate]);

  useEffect(() => {
    const publicPaths = ["/home", "/user-arena", "/login", "/register"];
    if (!isLoggedIn && !publicPaths.includes(location.pathname)) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <nav className="bg-white text-green-700 py-3 px-6 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-center lg:justify-start gap-8 w-full lg:w-auto">
          <Link to="/home" className="text-2xl font-bold whitespace-nowrap">
            ArenaBook
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 lg:ml-14">
            <Link to="/book" className="hover:underline whitespace-nowrap">أحجز معنا</Link>
            <Link to="/userProfile" className="hover:underline whitespace-nowrap">إعدادات الحساب</Link>
            <Link to="/wallet" className="hover:underline whitespace-nowrap">المحفظة</Link>
            <Link to="/my-bookings" className="hover:underline whitespace-nowrap">حجوزاتي</Link>
            <Link to="/user-arena" className="hover:underline whitespace-nowrap">الملاعب</Link>
          </div>
        </div>

        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border hover:bg-gray-100">
              {user?.avatar ? (
                <img
                  src={`${user.avatar}?v=${user.avatarVersion || Date.now()}`} // ✅ تحديث الصورة فوراً
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {`${user?.fName || "User"} ${user?.lName || ""}`}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 text-sm font-medium"
            >
              تسجيل خروج
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;


