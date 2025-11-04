import React, { useContext, useEffect } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useParams } from "react-router-dom";

export default function Extras() {
  const { getExtras, extras, selectedExtras, setSelectedExtras } =
    useContext(reservationContext);

  let { id } = useParams();

  useEffect(() => {
    getExtras(id);
  }, [id]);

  const toggleSelect = (extra) => {
    setSelectedExtras((prev) => {
      const isSelected = prev.some((item) => item.id === extra.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== extra.id);
      } else {
        return [
          ...prev,
          { id: extra.id, name: extra.name, price: extra.price },
        ];
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-md mt-10 border border-gray-100">
      <h2 className="text-3xl font-bold text-right text-gray-900 mb-2">
        الخدمات الإضافية
      </h2>
      <p className="text-gray-500 text-right mb-8 leading-relaxed">
        اختر الخدمات التي ترغب بإضافتها لتحسين تجربتك معنا.
      </p>

      <div className="space-y-5">
        {extras?.map((extra) => (
          <div
            key={extra?.id}
            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 border hover:shadow-md ${
              selectedExtras.includes(extra.name)
                ? "bg-green-50 border-green-300"
                : "bg-gray-50 border-gray-200"
            } ${!extra.isActive ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedExtras.some((item) => item.id === extra.id)}
                onChange={() => toggleSelect(extra)}
                className="w-5 h-5 accent-green-600 cursor-pointer rounded"
                disabled={!extra.isActive}
              />
              <div className="text-right">
                <h3 className="font-semibold text-lg text-gray-800">
                  {extra.name}
                </h3>
                <div className="mt-1">
                  {extra.isActive ? (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      ✅ متاحة
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
                      🚫 غير متاحة
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-green-700 font-semibold text-lg">
                {extra.price} <span className="text-sm text-gray-500">ج.م</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
