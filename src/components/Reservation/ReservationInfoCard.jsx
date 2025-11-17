import React from 'react';
import { Calendar, Clock, Hourglass, CreditCard, Package, Receipt, MapPin, User } from 'lucide-react';
import { formatTime, getTimeRanges } from '../../utils/timeRange';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

export default function ReservationInfoCard({ data, i18n, isPreview }) {
  const { arena, date, slots, selectedExtras, totalAmount, extrasTotalAmount } = data;
  const ranges = getTimeRanges(slots);

  const dayName =
    i18n.language === 'ar' ? dayjs(date).locale('ar').format('dddd') : dayjs(date).locale('en').format('dddd');

  const formattedDate = dayjs(date).locale(i18n.language).format('DD MMMM YYYY');
  const totalPrice = Number(totalAmount) + Number(extrasTotalAmount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">تفاصيل الحجز</h2>
            <p className="text-gray-600 text-sm mt-1">مراجعة معلومات حجزك</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Reservation Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">التاريخ</p>
                <h4 className="font-semibold text-gray-900 text-lg">{dayName}</h4>
                <p className="text-gray-600 text-sm">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-2">الوقت</p>
                <div className="space-y-2">
                  {ranges.map((range, index) => (
                    <div
                      key={index}
                      className="bg-white px-3 py-2 rounded-xl border border-green-200 text-green-700 font-medium text-sm shadow-sm"
                    >
                      ⏰ من {formatTime(range.start, i18n.language)} إلى {formatTime(range.end + 1, i18n.language)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Hourglass className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">المدة</p>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {slots.length} {slots.length === 1 ? 'ساعة' : 'ساعات'}
                </h4>
                <p className="text-gray-600 text-sm">({slots.length * 60} دقيقة)</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">طريقة الدفع</p>
                <h4 className="font-semibold text-gray-900 text-lg">محفظة التطبيق</h4>
                <p className="text-gray-600 text-sm">دفع آمن ومضمون</p>
              </div>
            </div>
          </div>
        </div>

        {/* Extras Section */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">الخدمات الإضافية</p>
              {selectedExtras?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedExtras.map((extra) => (
                    <div
                      key={extra.id}
                      className="bg-white rounded-xl p-3 border border-green-200 hover:border-green-300 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{extra.name}</span>
                        <span className="font-semibold text-green-600">
                          {extra.price} <span className="text-sm text-gray-500">ج.م</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">لا توجد إضافات مختارة</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Arena Location */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">موقع الملعب</p>
              <h4 className="font-semibold text-gray-900">{arena?.location?.city}</h4>
              <p className="text-gray-600 text-sm">{arena?.location?.governorate}</p>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="w-8 h-8 text-white" />
              <div>
                <p className="text-white/80 text-sm">المبلغ الإجمالي</p>
                <h3 className="text-2xl font-bold">{isPreview ? totalPrice : totalAmount} ج.م</h3>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="text-right text-white/90 text-sm">
              <div>سعر الحجز: {totalAmount} ج.م</div>
              {extrasTotalAmount > 0 && <div>الإضافات: +{extrasTotalAmount} ج.م</div>}
              {isPreview && extrasTotalAmount > 0 && (
                <div className="border-t border-white/30 mt-2 pt-2 font-semibold">الإجمالي: {totalPrice} ج.م</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
