import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Shield, Clock } from 'lucide-react';

export default function StadiumHeader({ name, id, status, pricePerHour, owner }) {
  const navigate = useNavigate();

  function handleBookingClick() {
    navigate(`/reservation/${id}`);
  }

  const isDisabled = status !== 'active';

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side - Stadium Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-green-100">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">4.5</span>
                  <span className="text-gray-500 text-sm">(24 تقييم)</span>
                </div>

                {/* Status Badge */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-medium text-sm ${
                    status === 'active'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {status === 'active' ? 'متاح للحجز' : 'غير متاح'}
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-green-100 w-fit">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-gray-600 text-sm">السعر:</span>
            <span className="font-bold text-green-600 text-lg">{pricePerHour} ج.م</span>
            <span className="text-gray-500 text-sm">/ ساعة</span>
          </div>
        </div>

        {/* Right Side - Booking Button */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleBookingClick}
            disabled={isDisabled}
            className={`
              flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg
              shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out
              min-w-[180px]
              ${
                isDisabled
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed hover:scale-100'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:-translate-y-1 cursor-pointer'
              }
            `}
          >
            <Calendar className="w-5 h-5" />
            احجز الملعب
          </button>

          {isDisabled && (
            <p className="text-red-600 text-sm text-center font-medium">⚠️ الملعب غير متاح للحجز حالياً</p>
          )}
        </div>
      </div>

      {/* Owner Quick Info */}
      {/* <div className="flex items-center gap-3 mt-6 pt-4 border-t border-green-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
          <span className="text-white font-semibold text-sm">
            {owner?.fName?.[0]}
            {owner?.lName?.[0]}
          </span>
        </div>
        <div>
          <p className="text-gray-700 font-medium text-sm">
            {owner?.fName} {owner?.lName}
          </p>
          <p className="text-gray-500 text-xs">مالك الملعب</p>
        </div>
      </div> */}
    </div>
  );
}
