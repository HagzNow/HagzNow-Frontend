import React from "react";
import { Home, Calendar, Plus, Settings ,CircleDotDashed} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
      const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* عنوان الصفحة */}
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">لوحة القيادة</h1>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow dark:shadow-gray-900/50 text-center border border-green-400 dark:border-green-500 transition-colors">
    <Home className="w-6 h-6 mx-auto text-green-500 dark:text-green-400 mb-2" />
    <div className="text-gray-500 dark:text-gray-400 text-sm">إجمالي الملاعب</div>
    <div className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">12</div>
    <div className="text-green-500 dark:text-green-400 text-xs mt-1">+20%</div>
  </div>

        <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow dark:shadow-gray-900/50 text-center border border-blue-400 dark:border-blue-500 transition-colors">
    <Calendar className="w-6 h-6 mx-auto text-blue-500 dark:text-blue-400 mb-2" />
    <div className="text-gray-500 dark:text-gray-400 text-sm">الحجوزات الشهرية</div>
    <div className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">150</div>
    <div className="text-green-500 dark:text-green-400 text-xs mt-1">+15%</div>
  </div>

  {/* الإيرادات */}
  <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow dark:shadow-gray-900/50 text-center border border-orange-400 dark:border-orange-500 transition-colors">
    <Home className="w-6 h-6 mx-auto text-orange-500 dark:text-orange-400 mb-2" />
    <div className="text-gray-500 dark:text-gray-400 text-sm">الإيرادات</div>
    <div className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">45,000 جنيه</div>
    <div className="text-green-500 dark:text-green-400 text-xs mt-1">+10%</div>
  </div>

 
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:shadow-gray-900/50 text-center border border-gray-300 dark:border-gray-600 transition-colors">
    <CircleDotDashed className="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
    <div className="text-gray-500 dark:text-gray-400 text-sm">معدل الاشغال</div>
    <div className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">75%</div>
    <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">لا تغيير</div>
  </div>
      </div>

      {/* الأداء والرؤى */}
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">الأداء والرؤى</h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 border-3 border-green-700 dark:border-green-500 p-10 rounded-xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition flex flex-col">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">الملاعب الأفضل أداءً</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ملعب النجوم - 50 حجزا هذا الشهر.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border-3 border-orange-700 dark:border-orange-500 p-10 rounded-xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition flex flex-col">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">أوقات الحجز الشائعة</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            6:00 مساء - 9:00 مساء (80% من الحجوزات).
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border-3 border-blue-700 dark:border-blue-500 p-10 rounded-xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition flex flex-col">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">الملاعب غير المستغلة</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ملعب النمل (10% إشغال) - فكّر في العروض الترويجية.
          </p>
        </div>
      </div>

   

      {/* إجراءات سريعة */}
   <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">إجراءات سريعة</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* بطاقة عرض الساحات */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition cursor-pointer flex flex-col items-center justify-center">
          <Home className="w-10 h-10 mb-3 text-blue-600 dark:text-blue-400" />
          <span className="font-medium mb-4 text-gray-700 dark:text-gray-300">عرض جميع الساحات</span>
          <button
            onClick={() => navigate("/all-grounds")}
            className="bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            الانتقال
          </button>
        </div>

        {/* بطاقة إضافة ساحة جديدة */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition cursor-pointer flex flex-col items-center justify-center">
          <Plus className="w-10 h-10 mb-3 text-blue-600 dark:text-blue-400" />
          <span className="font-medium mb-4 text-gray-700 dark:text-gray-300">إضافة ساحة جديدة</span>
          <button
            onClick={() => navigate("/owner/add-arena")}
            className="bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            الانتقال
          </button>
        </div>

        {/* بطاقة الإعدادات */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition cursor-pointer flex flex-col items-center justify-center">
          <Settings className="w-10 h-10 mb-3 text-blue-600 dark:text-blue-400" />
          <span className="font-medium mb-4 text-gray-700 dark:text-gray-300">الإعدادات</span>
          <button
            onClick={() => navigate("/settings")}
            className="bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            الانتقال
          </button>
        </div>
      </div>
    </div>
  );
}
