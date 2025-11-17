import { Calendar, Clock, MapPin } from 'lucide-react';
import DateSelector from './DateSelector';
import TimeSlots from './TimeSlots';

export default function ReservationStep() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">اختر التاريخ والوقت</h2>
            <p className="text-gray-600 text-sm mt-1">حدد موعد حجزك المثالي</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Date Selection Section */}
          <div className="space-y-6">
            {/* Date Selector */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-300">
              <DateSelector />
            </div>

            {/* Quick Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-amber-800 text-sm font-medium">نصائح سريعة</p>
                  <p className="text-amber-700 text-xs mt-1">
                    • احجز مسبقاً لتجنب الإشغال الكامل
                    <br />• الأوقات المسائية الأكثر إقبالاً
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="space-y-6">
            {/* Time Slots Container */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-green-300 transition-colors duration-300">
              <div className="space-y-4">
                {/* Time Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  <TimeSlots />
                </div>

                {/* No Slots Message */}
                <div className="text-center py-8 hidden" id="no-slots-message">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">لا توجد أوقات متاحة لهذا التاريخ</p>
                  <p className="text-gray-400 text-xs mt-1">حاول اختيار تاريخ مختلف</p>
                </div>
              </div>
            </div>

            {/* Selection Info */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-green-800 text-sm font-medium">معلومات التحديد</p>
                  <p className="text-green-700 text-xs mt-1">اختر الوقت المناسب وسيتم احتساب التكلفة تلقائياً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
