import React, { useState } from "react";
import { CreditCard, Wallet, Banknote, Apple } from "lucide-react";
import { useFormik } from "formik";
import { number, object } from "yup";
import baseUrl from "./../../apis/config";

export default function AddFundsModal({ isOpen, onClose }) {
  let [loadbuttom, setLoadButtom] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("بطاقة ائتمان");

  const validationSchema = object({
    amount: number().required("الكميه مطلوبه "),
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
      amount: "",
    },
    onSubmit: sendMoneyToAdd,
    validationSchema,
  });

  const paymentMethods = [
    { name: "بطاقة ائتمان", icon: <CreditCard size={18} /> },
    { name: "Apple Pay", icon: <Apple size={18} /> },
    { name: "محفظة رقمية", icon: <Wallet size={18} /> },
    { name: "تحويل بنكي", icon: <Banknote size={18} /> },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[400px] max-w-[90%] shadow-xl p-6 relative "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">إضافة الأموال</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <label className="block text-sm text-gray-700">المبلغ</label>
        <input
          type="number"
          name="amount"
          placeholder="0.00"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amount}
          className="w-full border border-gray-300 rounded-lg p-2 text-right focus:outline-none focus:ring-2 focus:ring-mainColor mb-5"
        />
        {formik.errors.amount && formik.touched.amount && (
          <p className="text-red-500 text-xs mb-2">{formik.errors.amount}</p>
        )}

        <p className="text-sm text-gray-700 mb-2">طرق الدفع</p>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.name}
              onClick={() => setSelectedMethod(method.name)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border transition-all ${
                selectedMethod === method.name
                  ? "border-mainColor bg-mainColor/10"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full border ${
                    selectedMethod === method.name
                      ? "bg-mainColor border-mainColor"
                      : "border-gray-400"
                  }`}
                ></div>
                <span className="text-sm">{method.name}</span>
              </div>
              <span className="text-gray-600">{method.icon}</span>
            </button>
          ))}
        </div>

        <button
          className="w-full mt-6 bg-mainColor hover:bg-mainColor/90 text-white py-2.5 rounded-xl transition"
          type="submit"
          onClick={formik.handleSubmit}
          disabled={loadbuttom}
        >
          {loadbuttom ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "اضافه الاموال"
          )}
        </button>
      </div>
    </div>
  );
}
