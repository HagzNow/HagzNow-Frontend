import React, { useContext, useEffect } from 'react';
import { reservationContext } from '../../Contexts/ReservationContext';
import { useParams } from 'react-router-dom';
import { Package, Check, X, Plus, Minus } from 'lucide-react';

export default function Extras() {
  const { getExtras, extras, selectedExtras, setSelectedExtras } = useContext(reservationContext);

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
        return [...prev, { id: extra.id, name: extra.name, price: extra.price }];
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">الخدمات الإضافية</h2>
            <p className="text-gray-600 text-sm mt-1">اختر الخدمات التي ترغب بإضافتها لتحسين تجربتك</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Selected Extras Summary */}
        {selectedExtras.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold text-sm">{selectedExtras.length} خدمة مختارة</span>
              </div>
              <div className="text-green-700 font-bold">
                +{selectedExtras.reduce((sum, extra) => sum + parseFloat(extra.price), 0)} ج.م
              </div>
            </div>
          </div>
        )}

        {/* Extras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {extras?.map((extra) => {
            const isSelected = selectedExtras.some((item) => item.id === extra.id);
            const isActive = extra.isActive;

            return (
              <div
                key={extra?.id}
                className={`
                  relative p-5 rounded-2xl border-2 transition-all duration-300 ease-in-out cursor-pointer
                  ${
                    isSelected
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md scale-[1.02]'
                      : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-sm'
                  }
                  ${!isActive ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01]'}
                `}
                onClick={() => isActive && toggleSelect(extra)}
              >
                {/* Selection Indicator */}
                {/* <div
                  className={`
                  absolute top-4 left-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isSelected ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}
                  ${!isActive && 'border-gray-200'}
                `}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div> */}

                {/* Content */}
                <div className="text-right space-y-3">
                  <h3
                    className={`
                    font-semibold text-lg
                    ${isSelected ? 'text-green-700' : 'text-gray-800'}
                    ${!isActive && 'text-gray-500'}
                  `}
                  >
                    {extra.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div
                      className={`
                      flex items-center gap-1 text-lg font-bold
                      ${isSelected ? 'text-green-600' : 'text-gray-700'}
                      ${!isActive && 'text-gray-400'}
                    `}
                    >
                      {extra.price}
                      <span className="text-sm text-gray-500 font-normal">ج.م</span>
                    </div>

                    {isActive && (
                      <div
                        className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}
                      `}
                      >
                        {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                {isActive && !isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {(!extras || extras.length === 0) && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-600 text-lg font-medium mb-2">لا توجد خدمات إضافية</h3>
            <p className="text-gray-500 text-sm">لا توجد خدمات إضافية متاحة لهذا الملعب حالياً</p>
          </div>
        )}

        {/* Footer Info */}
      </div>
    </div>
  );
}
