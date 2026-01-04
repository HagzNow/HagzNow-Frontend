import React, { useState } from 'react';
import { CreditCard, Wallet, Banknote, Apple, X, Loader } from 'lucide-react';
import { useFormik } from 'formik';
import { number, object } from 'yup';
import baseUrl from './../../apis/config';

export default function AddFundsModal({ isOpen, onClose }) {
  let [loadbuttom, setLoadButtom] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState('بطاقة ائتمان');

  const validationSchema = object({
    amount: number().required('المبلغ مطلوب').min(1, 'يجب أن يكون المبلغ أكبر من الصفر'),
  });

  async function sendMoneyToAdd(value) {
    setLoadButtom(true);
    try {
      const { data } = await baseUrl.post(`/wallet/add-funds`, value);
      if (data.isSuccess) {
        window.location.href = data?.data.paymentUrl;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadButtom(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: sendMoneyToAdd,
    validationSchema,
  });

  const paymentMethods = [
    { name: 'بطاقة ائتمان', icon: CreditCard, color: 'text-blue-600' },
    { name: 'Apple Pay', icon: Apple, color: 'text-black' },
    { name: 'محفظة رقمية', icon: Wallet, color: 'text-purple-600' },
    { name: 'تحويل بنكي', icon: Banknote, color: 'text-green-600' },
  ];

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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">إضافة الأموال</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">قم بشحن محفظتك بسهولة</p>
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
          {/* Amount Input */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">المبلغ المراد إضافته</label>
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
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">ج.م</span>
            </div>
            {formik.errors.amount && formik.touched.amount && (
              <p className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                <X className="w-4 h-4" />
                {formik.errors.amount}
              </p>
            )}
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">طرق الدفع المتاحة</p>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.name}
                    onClick={() => setSelectedMethod(method.name)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 group ${
                      selectedMethod === method.name
                        ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedMethod === method.name
                            ? 'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600'
                            : 'border-gray-400 dark:border-gray-500 group-hover:border-green-400 dark:group-hover:border-green-500'
                        }`}
                      >
                        {selectedMethod === method.name && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{method.name}</span>
                    </div>
                    <IconComponent
                      className={`w-5 h-5 ${method.color} dark:text-gray-300 transition-transform duration-300 group-hover:scale-110`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
            type="submit"
            onClick={formik.handleSubmit}
            disabled={loadbuttom || !formik.isValid}
          >
            {loadbuttom ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Wallet className="w-5 h-5" />
                <span>إضافة الأموال</span>
              </div>
            )}
          </button>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">جميع المعاملات مشفرة وآمنة بنظام SSL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
