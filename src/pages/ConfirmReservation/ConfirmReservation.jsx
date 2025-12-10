import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Home, Calendar, Clock, MapPin, User, CreditCard, Package } from 'lucide-react';
import baseUrl from '../../apis/config';
import { formatTime, getTimeRanges } from '../../utils/timeRange';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import NotFound from '../NotFound/NotFound';

export default function ConfirmReservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservation() {
      try {
        setLoading(true);
        const { data } = await baseUrl.get(`/reservations/${id}`);
        setReservation(data.data);
      } catch (err) {
        console.error(err);
        setError('حدث خطأ أثناء جلب بيانات الحجز');
      } finally {
        setLoading(false);
      }
    }

    fetchReservation();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">جاري تحميل بيانات الحجز...</p>
        </div>
      </div>
    );
  }

  if (error) return <NotFound />;

  if (!reservation) return <NotFound />;

  const arena = reservation.arena;
  const ranges = getTimeRanges(reservation.slots || []);
  const reservationDate = dayjs(reservation.dateOfReservation).locale('ar').format('dddd، DD MMMM YYYY');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 py-8 print:bg-white transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg dark:shadow-gray-900/50">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">تم تأكيد حجزك بنجاح!</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            رقم الحجز:{' '}
            <span className="font-mono font-bold text-green-600 dark:text-green-400">{reservation.id.slice(0, 8)}</span>
          </p>
        </div>

        {/* Invoice Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden print:shadow-none">
          {/* Invoice Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">فاتورة الحجز</h2>
                <p className="text-green-100 dark:text-green-200">ArenaBook - نظام حجز الملاعب</p>
              </div>
              <div className="text-right">
                <p className="text-green-100 dark:text-green-200 text-sm">تاريخ الإصدار</p>
                <p className="font-semibold">{dayjs().locale('ar').format('DD/MM/YYYY')}</p>
              </div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-6">
            {/* Reservation Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Arena Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">
                  معلومات الملعب
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">{arena?.name}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{arena?.locationSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{reservationDate}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">تاريخ الحجز</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time & Payment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">
                  التوقيت والدفع
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {ranges.map((range, i) => (
                          <span key={i} className="block">
                            {formatTime(range.start, i18n.language)} - {formatTime(range.end + 1, i18n.language)}
                          </span>
                        ))}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{reservation.totalHours} ساعة</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">محفظة التطبيق</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">طريقة الدفع</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">تفاصيل الفاتورة</h3>
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="col-span-6 text-right font-semibold text-gray-700 dark:text-gray-300">الوصف</div>
                  <div className="col-span-2 text-center font-semibold text-gray-700 dark:text-gray-300">الكميه</div>
                  <div className="col-span-2 text-center font-semibold text-gray-700 dark:text-gray-300">السعر</div>
                  <div className="col-span-2 text-left font-semibold text-gray-700 dark:text-gray-300">المجموع</div>
                </div>

                {/* Play Time Row */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="col-span-6 text-right">
                    <p className="font-medium text-gray-900 dark:text-white">حجز ملعب {arena?.name}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{arena?.categoryName}</p>
                  </div>
                  <div className="col-span-2 text-center text-gray-700 dark:text-gray-300">
                    {reservation.totalHours} ساعة
                  </div>
                  <div className="col-span-2 text-center text-gray-700 dark:text-gray-300">
                    {arena?.pricePerHour} ج.م
                  </div>
                  <div className="col-span-2 text-left font-semibold text-gray-900 dark:text-white">
                    {reservation.playTotalAmount} ج.م
                  </div>
                </div>

                {/* Extras Rows */}
                {reservation.extras?.map((extra) => (
                  <div
                    key={extra.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="col-span-6 text-right">
                      <div className="flex items-center gap-2 justify-start">
                        <Package className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <p className="font-medium text-gray-900 dark:text-white">{extra.name}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-gray-700 dark:text-gray-300">1</div>
                    <div className="col-span-2 text-center text-gray-700 dark:text-gray-300">{extra.price} ج.م</div>
                    <div className="col-span-2 text-left font-semibold text-gray-900 dark:text-white">
                      {extra.price} ج.م
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="text-right lg:text-left">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">حالة الحجز</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
                    <span className="font-semibold text-green-700 dark:text-green-400 text-lg">
                      {reservation.status === 'hold' ? 'قيد الانتظار' : 'مؤكد'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-600 dark:text-gray-300">سعر الحجز:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{reservation.playTotalAmount} ج.م</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-600 dark:text-gray-300">الإضافات:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {reservation.extrasTotalAmount} ج.م
                    </span>
                  </div>
                  <div className="flex justify-between gap-8 border-t border-green-200 dark:border-green-800 pt-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">الإجمالي:</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {reservation.totalAmount} ج.م
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out font-semibold"
          >
            <Download className="w-5 h-5" />
            طباعة الفاتورة
          </button>
          <button
            onClick={() => navigate('/my-bookings')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-800 dark:hover:to-gray-900 hover:shadow-lg dark:hover:shadow-gray-900/50 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out font-semibold"
          >
            <Calendar className="w-5 h-5" />
            عرض حجوزاتي
          </button>
          <button
            onClick={() => navigate('/user-arena')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out font-semibold"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>شكراً لاستخدامك ArenaBook - للحصول على المساعدة يرجى التواصل مع الدعم الفني</p>
        </div>
      </div>
    </div>
  );
}
