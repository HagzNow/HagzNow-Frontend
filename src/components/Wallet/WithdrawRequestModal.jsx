import React, { useState } from 'react';
import { ArrowDownCircle, X, Loader, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import { number, object } from 'yup';
import baseUrl from './../../apis/config';
import toast from 'react-hot-toast';

export default function WithdrawRequestModal({ isOpen, onClose, availableBalance, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const validationSchema = object({
    amount: number()
      .required('المبلغ مطلوب')
      .min(1, 'يجب أن يكون المبلغ أكبر من الصفر')
      .max(
        availableBalance || 0,
        `المبلغ المتاح للسحب هو ${availableBalance ? Number(availableBalance).toLocaleString('ar-EG') : 0} ج.م`
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await baseUrl.post(`/wallet/request-withdraw`, {
          amount: values.amount,
        });

        if (data.isSuccess) {
          toast.success('تم إرسال طلب السحب بنجاح');
          if (onSuccess) {
            onSuccess();
          }
          onClose();
          formik.resetForm();
        } else {
          toast.error(data.message || 'فشل في إرسال طلب السحب');
        }
      } catch (err) {
        let errorMessage = 'حدث خطأ أثناء إرسال طلب السحب';
        if (err.response?.data?.error?.code === 'INSUFFICIENT_BALANCE') {
          errorMessage = 'الرصيد غير كافي';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    validationSchema,
  });

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
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-lg">
                <ArrowDownCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">طلب سحب الأموال</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">سحب الأموال من محفظتك</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Available Balance Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">الرصيد المتاح:</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {availableBalance ? Number(availableBalance).toLocaleString('ar-EG') : 0} ج.م
              </span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">المبلغ المراد سحبه</label>
            <div className="relative">
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl p-4 text-right text-lg font-semibold bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:border-green-300 dark:hover:border-green-600"
                min="1"
                step="0.01"
                max={availableBalance || undefined}
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                ج.م
              </span>
            </div>
            {formik.errors.amount && formik.touched.amount && (
              <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formik.errors.amount}</span>
              </div>
            )}
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-semibold mb-1">ملاحظة مهمة:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>سيتم مراجعة طلب السحب من قبل الإدارة</li>
                  <li>قد يستغرق المعالجة من 1-3 أيام عمل</li>
                  <li>سيتم إشعارك عند الموافقة على الطلب</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
            type="submit"
            onClick={formik.handleSubmit}
            disabled={loading || !formik.isValid}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <ArrowDownCircle className="w-5 h-5" />
                <span>إرسال طلب السحب</span>
              </div>
            )}
          </button>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">جميع المعاملات مشفرة وآمنة</p>
          </div>
        </div>
      </div>
    </div>
  );
}
