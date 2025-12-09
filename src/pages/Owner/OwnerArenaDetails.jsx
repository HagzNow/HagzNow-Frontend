import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, MapPin, Clock, Users, Shield, ArrowRight, Edit } from 'lucide-react';
import { arenaService } from '@/services/arenaService';
import toast from 'react-hot-toast';

import StadiumMap from '@/pages/BookingArena/components/StaduimMap';
import StadiumImage from '@/pages/BookingArena/components/StaduimImages';
import StadiumInfo from '@/pages/BookingArena/components/StaduimInfo';

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

  if (error || !arena)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            {error || 'حدث خطأ أثناء تحميل البيانات.'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">يرجى المحاولة مرة أخرى</p>
          <button
            onClick={() => navigate('/owner/arenas')}
            className="mt-4 px-6 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            العودة إلى الملاعب
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/owner/arenas')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة إلى الملاعب</span>
          </button>
          <button
            onClick={() => navigate(`/owner/edit-arena/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>تعديل الملعب</span>
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stadium Images */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumImage images={arena.images} name={arena.name} />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-4 group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-700 dark:group-hover:to-cyan-700 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">الموقع</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {arena.location?.city || 'غير محدد'} , {arena.location?.governorate || 'غير محدد'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-4 group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 flex items-center justify-center group-hover:from-orange-600 group-hover:to-amber-600 dark:group-hover:from-orange-700 dark:group-hover:to-amber-700 transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">ساعات العمل</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {arena.openingHour || '00'}:00 - {arena.closingHour || '00'}:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-4 group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-600 dark:group-hover:from-green-700 dark:group-hover:to-emerald-700 transition-all duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">النوع</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {arena.category?.name || arena.categoryName || 'غير محدد'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arena Header Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{arena.name}</h1>
                  <div className="flex items-center gap-3">
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
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {arena.pricePerHour} <span className="text-sm text-gray-500 dark:text-gray-400">ج.م/ساعة</span>
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
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumMap location={arena.location} />
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
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
                    <span className="text-gray-600 dark:text-gray-300">نسبة العربون</span>
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">الإجراءات</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/owner/reservations?arenaId=${id}`)}
                  className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-center"
                >
                  عرض الحجوزات
                </button>
                <button
                  onClick={() => navigate(`/owner/edit-arena/${id}`)}
                  className="w-full px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-center"
                >
                  تعديل الملعب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerArenaDetails;

