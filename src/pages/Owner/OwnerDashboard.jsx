import React from "react";
import { Home, Calendar, Plus, Settings ,CircleDotDashed} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
      const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* عنوان الصفحة */}
      <h1 className="text-2xl font-bold mb-6">لوحة القيادة</h1>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         <div className="bg-white p-10 rounded-xl shadow text-center border border-green-400">
    <Home className="w-6 h-6 mx-auto text-green-500 mb-2" />
    <div className="text-gray-500 text-sm">إجمالي الملاعب</div>
    <div className="text-2xl font-bold mt-2">12</div>
    <div className="text-green-500 text-xs mt-1">+20%</div>
  </div>

        <div className="bg-white p-10 rounded-xl shadow text-center border border-blue-400">
    <Calendar className="w-6 h-6 mx-auto text-blue-500 mb-2" />
    <div className="text-gray-500 text-sm">الحجوزات الشهرية</div>
    <div className="text-2xl font-bold mt-2">150</div>
    <div className="text-green-500 text-xs mt-1">+15%</div>
  </div>

  {/* الإيرادات */}
  <div className="bg-white p-10 rounded-xl shadow text-center border border-orange-400">
    <Home className="w-6 h-6 mx-auto text-orange-500 mb-2" />
    <div className="text-gray-500 text-sm">الإيرادات</div>
    <div className="text-2xl font-bold mt-2">45,000 جنيه</div>
    <div className="text-green-500 text-xs mt-1">+10%</div>
  </div>

 
  <div className="bg-white p-6 rounded-xl shadow text-center border border-gray-300">
    <CircleDotDashed className="w-6 h-6 mx-auto text-gray-400 mb-2" />
    <div className="text-gray-500 text-sm">معدل الاشغال</div>
    <div className="text-2xl font-bold mt-2">75%</div>
    <div className="text-gray-400 text-xs mt-1">لا تغيير</div>
  </div>
      </div>

      {/* الأداء والرؤى */}
      <h1 className="text-2xl font-bold mb-6">الأداء والرؤى</h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-3 border-green-700 p-10 rounded-xl shadow hover:shadow-lg transition flex flex-col">
          <h3 className="font-semibold text-lg mb-2">الملاعب الأفضل أداءً</h3>
          <p className="text-sm text-gray-500">
            ملعب النجوم - 50 حجزا هذا الشهر.
          </p>
        </div>

        <div className="bg-white border-3 border-orange-700 p-10 rounded-xl  shadow hover:shadow-lg transition flex flex-col ">
          <h3 className="font-semibold text-lg  mb-2">أوقات الحجز الشائعة</h3>
          <p className="text-sm text-gray-500">
            6:00 مساء - 9:00 مساء (80% من الحجوزات).
          </p>
        </div>

        <div className=" bg-white border-3 border-blue-700 p-10 rounded-xl  shadow hover:shadow-lg transition flex flex-col">
          <h3 className="font-semibold text-lg  mb-2">الملاعب غير المستغلة</h3>
          <p className="text-sm text-gray-500">
            ملعب النمل (10% إشغال) - فكّر في العروض الترويجية.
          </p>
        </div>
      </div>

   

      {/* إجراءات سريعة */}
   <h1 className="text-2xl font-bold mb-6">إجراءات سريعة</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* بطاقة عرض الساحات */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center">
          <Home className="w-10 h-10 mb-3 text-blue-600" />
          <span className="font-medium mb-4 text-gray-700">عرض جميع الساحات</span>
          <button
            onClick={() => navigate("/all-grounds")}
            className="bg-blue-100 hover:bg-blue-200 text-grey-700 px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            الانتقال
          </button>
        </div>

        {/* بطاقة إضافة ساحة جديدة */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center">
          <Plus className="w-10 h-10 mb-3 text-blue-600" />
          <span className="font-medium mb-4 text-gray-700">إضافة ساحة جديدة</span>
          <button
            onClick={() => navigate("/owner/add-arena")}
            className="bg-blue-100 hover:bg-blue-200 text-gray-700 px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            الانتقال
          </button>
        </div>

        {/* بطاقة الإعدادات */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center">
          <Settings className="w-10 h-10 mb-3 text-blue-600" />
          <span className="font-medium mb-4 text-gray-700">الإعدادات</span>
          <button
            onClick={() => navigate("/settings")}
            className="bg-blue-100 hover:bg-blue-200 text-gray-700 px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            الانتقال
          </button>
        </div>
      </div>
    </div>
  );
}
