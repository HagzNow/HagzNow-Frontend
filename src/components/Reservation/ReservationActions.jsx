import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Edit, Loader, AlertCircle } from 'lucide-react';

export default function ReservationActions({
  isPreview,
  loading,
  onConfirm,
  onCancel,
  onEdit,
  cancelRservation,
  status,
}) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (status === 'hold') {
      cancelRservation();
      setTimeout(() => {
        navigate('/my-bookings');
      }, 1500);
    } else {
      toast.error('لا يمكن إلغاء هذا الحجز لأن حالته ليست قيد الانتظار.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center">
            {isPreview ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <AlertCircle className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{isPreview ? 'إجراءات الحجز' : 'إدارة الحجز'}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{isPreview ? 'أكمل عملية الحجز' : 'تحكم في حجزك الحالي'}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-4">
        {isPreview ? (
          <>
            {/* Confirm Button */}
            <button
              disabled={loading}
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  جاري التأكيد...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  تأكيد الحجز
                </>
              )}
            </button>

            {/* Edit Button */}
            <button
              onClick={onEdit}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <Edit className="w-5 h-5" />
              تعديل الحجز
            </button>

            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-orange-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <XCircle className="w-5 h-5" />
              إلغاء الحجز
            </button>
          </>
        ) : (
          <>
            {/* Cancel Reservation Button */}
            <button
              onClick={handleCancel}
              disabled={status !== 'hold' || loading}
              className={`
                w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold
                transform transition-all duration-300 ease-in-out
                ${
                  status === 'hold' && !loading
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 text-white hover:from-red-600 hover:to-orange-600 dark:hover:from-red-700 dark:hover:to-orange-700 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  جاري الإلغاء...
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  إلغاء الحجز
                </>
              )}
            </button>

            {/* Status Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    status === 'hold' ? 'bg-amber-500' : status === 'confirmed' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">الحالة:</span>
                <span
                  className={`
                  font-semibold
                  ${status === 'hold' ? 'text-amber-600 dark:text-amber-400' : status === 'confirmed' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}
                `}
                >
                  {status === 'hold' ? 'قيد الانتظار' : status === 'confirmed' ? 'مؤكد' : 'غير معروف'}
                </span>
              </div>
              {status !== 'hold' && (
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 text-right">⚠️ يمكن إلغاء الحجز فقط عندما يكون قيد الانتظار</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
