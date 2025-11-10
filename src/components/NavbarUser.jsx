import { useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"; 
import { authContext } from "../Contexts/AuthContext";
import baseUrl from "@/apis/config";

const UserNavbar = () => {
  const {  user, setToken, setUser  } = useContext(authContext);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token"); // فقط احذف التوكن بدل clear الكلي
      setUser(null);
      setToken(null);
      console.log("✅ Logged out successfully!");
      
    };
    console.log(user)
  
    

     useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn && !user) {
        try {
          const res = await baseUrl.get("/users/profile", {
            headers: { Authorization: `Bearer ${isLoggedIn}` },
          });
          setUser(res.data.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      } else if (!isLoggedIn) {
        navigate("/login", { replace: true });
      }
    };
       fetchUser();
  }, [isLoggedIn, user, setUser, setToken, navigate]);


  return (
    <nav className="bg-white text-green-700 py-3 px-6 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* ✅ Logo + Search */}
        <div className="flex items-center justify-center lg:justify-start gap-8 w-full lg:w-auto">
          {/* Logo */}
          <Link to="/home" className="text-2xl font-bold whitespace-nowrap">
            ArenaBook
          </Link>

          {/* Search box */}
          {/* <div className="relative w-full sm:w-[240px] md:w-[280px] lg:w-[300px]">
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن ملعب..."
              className="w-full py-2 pr-10 pl-3 rounded-md focus:outline-none text-green-700 bg-transparent border border-green-300 focus:border-green-700 placeholder-green-400 transition"
            />
          </div> */}
        </div>

        {/* ✅ Links */}
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 lg:ml-14">
            <Link to="/book" className="hover:underline whitespace-nowrap">
              أحجز معنا
            </Link>
            <Link to="/userProfile" className="hover:underline whitespace-nowrap">
              إعدادات الحساب
            </Link>
            <Link to="/wallet" className="hover:underline whitespace-nowrap">
              المحفظة
            </Link>
            <Link
              to="/my-bookings"
              className="hover:underline whitespace-nowrap"
            >
              حجوزاتي
            </Link>
            <Link
              to="/user-arena"
              className="hover:underline whitespace-nowrap"
            >
              الملاعب
            </Link>
          </div>
        </div>

        {/* ✅ User Info + Logout */}
       {isLoggedIn && (
  <div className="flex items-center gap-3">
    {/* user info */}
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border hover:bg-gray-100">
      {user?.avatar ? (
        <img
          src={user.avatar} // رابط الصورة من بيانات اليوزر
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
