import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, MapPin, Clock, Users, Shield, ArrowRight, Edit } from 'lucide-react';
import { arenaService } from '@/services/arenaService';
import toast from 'react-hot-toast';

import StadiumMap from '@/pages/BookingArena/components/StaduimMap';
import StadiumImage from '@/pages/BookingArena/components/StaduimImages';
import StadiumInfo from '@/pages/BookingArena/components/StaduimInfo';
import NotFound from '../NotFound/NotFound';

const OwnerArenaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [arena, setArena] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArena = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await arenaService.getArenaById(id);
        setArena(data);
      } catch (err) {
        console.error('Error fetching arena:', err);
        setError(err.message || 'فشل في تحميل بيانات الملعب');
        toast.error(err.message || 'فشل في تحميل بيانات الملعب');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchArena();
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">جاري تحميل بيانات الملعب...</p>
        </div>
      </div>
    );

  if (error || !arena) return <NotFound />;

  return (
    <div dir="rtl" className="w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/owner/arenas')}
            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>العودة إلى الملاعب</span>
          </button>
          {/* <button
            onClick={() => navigate(`/owner/edit-arena/${id}`)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
          >
            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>تعديل الملعب</span>
          </button> */}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stadium Images */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumImage images={arena.images} name={arena.name} />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Location Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-3 sm:p-4 group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-700 dark:group-hover:to-cyan-700 transition-all duration-300 flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">الموقع</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                      {arena.location?.city || 'غير محدد'} , {arena.location?.governorate || 'غير محدد'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-3 sm:p-4 group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 flex items-center justify-center group-hover:from-orange-600 group-hover:to-amber-600 dark:group-hover:from-orange-700 dark:group-hover:to-amber-700 transition-all duration-300 flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">ساعات العمل</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                      {arena.openingHour || '00'}:00 - {arena.closingHour || '00'}:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-3 sm:p-4 group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-600 dark:group-hover:from-green-700 dark:group-hover:to-emerald-700 transition-all duration-300 flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">النوع</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                      {arena.category?.name || arena.categoryName || 'غير محدد'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arena Header Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 break-words">
                    {arena.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
                        arena.status === 'active'
                          ? 'bg-green-500 text-white'
                          : arena.status === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {arena.status === 'active' ? 'نشط' : arena.status === 'pending' ? 'قيد المراجعة' : 'معطل'}
                    </span>
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                      {arena.pricePerHour}{' '}
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">ج.م/ساعة</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumInfo
                description={arena.description}
                policy={arena.policy}
                extras={arena.extras}
                pricePerHour={arena.pricePerHour}
                minPeriod={arena.minPeriod}
              />
            </div>
          </div>

          {/* Right Column - Map and Stats */}
          <div className="space-y-4 sm:space-y-6">
            {/* Map Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumMap location={arena.location} />
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                معلومات الملعب
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">السعر لكل ساعة</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{arena.pricePerHour} ج.م</span>
                </div>
                {arena.minPeriod && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">أقل مدة حجز</span>
                    <span className="font-bold text-gray-900 dark:text-white">{arena.minPeriod} دقيقة</span>
                  </div>
                )}
                {arena.depositPercent && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">نسبة المقدم</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">{arena.depositPercent}%</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-300">الحالة</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      arena.status === 'active'
                        ? 'bg-green-500 text-white'
                        : arena.status === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {arena.status === 'active' ? 'نشط' : arena.status === 'pending' ? 'قيد المراجعة' : 'معطل'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">الإجراءات</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/owner/reservations?arenaId=${id}`)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-center text-sm sm:text-base"
                >
                  عرض الحجوزات
                </button>
                {/* <button
                  onClick={() => navigate(`/owner/edit-arena/${id}`)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-center text-sm sm:text-base"
                >
                  تعديل الملعب
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerArenaDetails;
