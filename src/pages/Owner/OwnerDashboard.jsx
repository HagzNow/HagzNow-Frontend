import React from 'react';
import { Home, Calendar, Plus, Settings, CircleDotDashed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  return (
    <div dir="rtl" className="w-full px-10 overflow-x-hidden">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          لوحة التحكم
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">نظرة عامة على أداء ملاعبك</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +20%
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">إجمالي الملاعب</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">12</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +15%
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">الحجوزات الشهرية</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">150</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +10%
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">الإيرادات</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">45,000</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">جنيه</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <CircleDotDashed className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              ثابت
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">معدل الإشغال</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">75%</div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6">
          الأداء والرؤى
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border-l-4 border-green-500 dark:border-green-600 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">
              الملاعب الأفضل أداءً
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">ملعب النجوم - 50 حجزاً هذا الشهر</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border-l-4 border-emerald-500 dark:border-emerald-600 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">
              أوقات الحجز الشائعة
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              6:00 مساء - 9:00 مساء (80% من الحجوزات)
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 border-l-4 border-teal-500 dark:border-teal-600 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">
              الملاعب غير المستغلة
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              ملعب النمل (10% إشغال) - فكّر في العروض الترويجية
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div
            onClick={() => navigate('/owner/arenas')}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Home className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gray-900 dark:text-white">
                عرض جميع الساحات
              </span>
              <button className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/50 dark:hover:to-emerald-800/50 text-green-700 dark:text-green-400 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors">
                الانتقال
              </button>
            </div>
          </div>

          <div
            onClick={() => navigate('/owner/add-arena')}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gray-900 dark:text-white">
                إضافة ساحة جديدة
              </span>
              <button className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/50 dark:hover:to-emerald-800/50 text-green-700 dark:text-green-400 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors">
                الانتقال
              </button>
            </div>
          </div>

          <div
            onClick={() => navigate('/owner/reservations')}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gray-900 dark:text-white">
                عرض الحجوزات
              </span>
              <button className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/50 dark:hover:to-emerald-800/50 text-green-700 dark:text-green-400 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors">
                الانتقال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
