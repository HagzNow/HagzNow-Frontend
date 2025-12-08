import React from 'react';
import { CheckCircle, XCircle, X, Wallet, AlertCircle } from 'lucide-react';

export default function PaymentResultModal({ status, amount, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md mx-4 shadow-2xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transform transition-all duration-500 ease-in-out hover:shadow-2xl dark:hover:shadow-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl ${
            status ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  status
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-red-500 to-orange-500'
                }`}
              >
                {status ? <CheckCircle className="w-6 h-6 text-white" /> : <XCircle className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h2 className={`text-xl font-bold ${status ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>
                  {status ? 'عملية ناجحة' : 'فشل العملية'}
                </h2>
                <p className={`text-sm mt-1 ${status ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {status ? 'تمت العملية بنجاح' : 'حدث خطأ في المعاملة'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                status ? 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Icon */}
          <div className="flex justify-center">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                status
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`}
            >
              {status ? <CheckCircle className="w-10 h-10 text-white" /> : <XCircle className="w-10 h-10 text-white" />}
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-3">
            {status ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">تم شحن الرصيد بنجاح</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  تم إضافة <span className="font-bold text-green-600 dark:text-green-400 text-xl">{amount?.toLocaleString('ar-EG')}</span>{' '}
                  ج.م إلى رصيدك
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 mt-4">
                  <p className="text-green-700 dark:text-green-300 text-sm font-medium">🎉 يمكنك الآن استخدام الرصيد الجديد للحجز فوراً</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">تعذر إتمام العملية</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">حدث خطأ أثناء عملية الدفع، برجاء المحاولة مرة أخرى.</p>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mt-4">
                  <p className="text-red-700 dark:text-red-300 text-sm font-medium">💡 ننصح بالتحقق من بيانات الدفع والمحاولة مرة أخرى</p>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold text-white shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out ${
                status
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-800 dark:hover:to-gray-900'
              }`}
            >
              {status ? 'متابعة' : 'إغلاق'}
            </button>
          </div>

          {/* Security Note */}
          <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">جميع المعاملات مشفرة وآمنة بنظام SSL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
