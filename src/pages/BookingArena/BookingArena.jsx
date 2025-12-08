import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader, MapPin, Clock, Star, Users, Shield } from 'lucide-react';

import StaduimReviews from './components/StaduimReviews';
import StadiumHeader from './components/StaduimHeader';
import StadiumMap from './components/StaduimMap';
import StadiumInfo from './components/StaduimInfo';
import StadiumImage from './components/StaduimImages';

const BookingArena = () => {
  const { id } = useParams();
  const [arena, setArena] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArena = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/arenas/${id}`);
        if (res.data.isSuccess) {
          setArena(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching arena:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArena();
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

  if (!arena)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">حدث خطأ أثناء تحميل البيانات.</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">يرجى المحاولة مرة أخرى</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
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
                      {arena.location.city} , {arena.location.governorate}
                    </p>
                    {/* <p className="text-gray-500 text-xs"></p> */}
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
                      {arena.openingHour}:00 - {arena.closingHour}:00
                    </p>
                    {/* <p className="text-gray-500 text-xs">أقل مدة {arena.minPeriod} دقيقة</p> */}
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
                    <p className="font-semibold text-gray-900 dark:text-white">{arena.category.name}</p>
                    {/* <p className="text-gray-500 text-xs">ملعب كرة قدم</p> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumHeader
                name={arena.name}
                id={arena.id}
                status={arena.status}
                pricePerHour={arena.pricePerHour}
                owner={arena.owner}
              />
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

            {/* Reviews Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StaduimReviews />
            </div>
          </div>

          {/* Right Column - Map and Booking */}
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <StadiumMap location={arena.location} />
            </div>

            {/* Owner Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                معلومات المالك
              </h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {arena.owner.fName?.[0]}
                    {arena.owner.lName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {arena.owner.fName} {arena.owner.lName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{arena.owner.phone}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">معلومات سريعة</h3>
              <div className="space-y-3">
                {/* <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">السعر لكل ساعة</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{arena.pricePerHour} ج.م</span>
                </div> */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">أقل مدة حجز</span>
                  <span className="font-bold text-gray-900 dark:text-white">{arena.minPeriod} دقيقة</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-300">نسبة العربون</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">{arena.depositPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingArena;
