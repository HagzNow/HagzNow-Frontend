import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Hourglass,
  CreditCard,
  Package,
  Receipt,
  MapPin,
  User,
} from "lucide-react";
import { formatTime, getTimeRanges } from "../../utils/timeRange";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import baseUrl from "@/apis/config";
import toast from "react-hot-toast";

export default function ReservationInfoCard({ data, i18n, isPreview }) {
  const { arena, date, slots, selectedExtras, totalAmount, extrasTotalAmount } =
    data;

  
    
  const ranges = getTimeRanges(slots);
  const [review, setReview] = useState({
    rating: 0,
    content: "",
  });
  const isPastReservation = dayjs(date).isBefore(dayjs(), "day");

  async function handleSubmitReview() {
    if (!review.rating || !review.content.trim()) {
      toast.error("من فضلك ضع تقييم واكتب تعليق.");
      return;
    }

    try {
      const payload = {
        arenaId: arena?.id,
        rating: review.rating,
        content: review.content,
      };

      const { data: res } = await baseUrl.post(`/reviews`, payload);

      console.log("Review submitted:", res);
      toast.success("تم إرسال تقييمك بنجاح!");

      setReview({
        rating: 0,
        content: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إرسال التقييم");
    }
  }

  const dayName =
    i18n.language === "ar"
      ? dayjs(date).locale("ar").format("dddd")
      : dayjs(date).locale("en").format("dddd");

  const formattedDate = dayjs(date)
    .locale(i18n.language)
    .format("DD MMMM YYYY");
  const totalPrice = Number(totalAmount) + Number(extrasTotalAmount);

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              تفاصيل الحجز
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              مراجعة معلومات حجزك
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Reservation Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  التاريخ
                </p>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {dayName}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  الوقت
                </p>
                <div className="space-y-2">
                  {ranges.map((range, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 px-3 py-2 rounded-xl border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 font-medium text-sm shadow-sm dark:shadow-gray-900/50"
                    >
                       من {formatTime(range.start, i18n.language)} إلى{" "}
                      {formatTime(range.end + 1, i18n.language)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Hourglass className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  المدة
                </p>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {slots.length} {slots.length === 1 ? "ساعة" : "ساعات"}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  ({slots.length * 60} دقيقة)
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  طريقة الدفع
                </p>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  محفظة التطبيق
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  دفع آمن ومضمون
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Extras Section */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                الخدمات الإضافية
              </p>
              {selectedExtras?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedExtras.map((extra) => (
                    <div
                      key={extra.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {extra.name}
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {extra.price}{" "}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ج.م
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Package className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">
                    لا توجد إضافات مختارة
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

       

        {/* ---------------- Review Section ---------------- */}
        {!isPreview && isPastReservation && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <User className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  أضف تقييمك للملعب
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setReview({ ...review, rating: star })}
                      className={`cursor-pointer text-2xl ${
                        review.rating >= star
                          ? "text-yellow-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Content */}
                <textarea
                  value={review.content}
                  onChange={(e) =>
                    setReview({ ...review, content: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
                  rows={4}
                  placeholder="اكتب رأيك عن الملعب..."
                />

                {/* Submit */}
                <button
                  onClick={handleSubmitReview}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                >
                  إرسال التقييم
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="w-8 h-8 text-white" />
              <div>
                <p className="text-white/80 text-sm">المبلغ الإجمالي</p>
                <h3 className="text-2xl font-bold">
                  {isPreview ? totalPrice : totalAmount} ج.م
                </h3>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="text-right text-white/90 text-sm">
              <div>سعر الحجز: {totalAmount} ج.م</div>
              {extrasTotalAmount > 0 && (
                <div>الإضافات: +{extrasTotalAmount} ج.م</div>
              )}
              {isPreview && extrasTotalAmount > 0 && (
                <div className="border-t border-white/30 mt-2 pt-2 font-semibold">
                  الإجمالي: {totalPrice} ج.م
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
