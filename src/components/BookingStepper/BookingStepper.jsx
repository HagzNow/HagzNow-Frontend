import React, { useContext } from 'react';
import { reservationContext } from '../../Contexts/ReservationContext';
import { Check, Calendar, Package, Eye } from 'lucide-react';

export default function BookingStepper() {
  const { steps, activeStep } = useContext(reservationContext);

  const getStepIcon = (stepIndex) => {
    const icons = [Calendar, Package, Eye];
    const IconComponent = icons[stepIndex] || Calendar;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 transition-all duration-500 ease-in-out"
            style={{
              width: `${(activeStep / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {steps.map((label, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isUpcoming = index > activeStep;

          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center
                  transition-all duration-500 ease-in-out
                  border-2 shadow-lg
                  ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 border-green-500 dark:border-green-600 text-white scale-110'
                      : isActive
                      ? 'bg-white dark:bg-gray-800 border-green-500 dark:border-green-400 text-green-500 dark:text-green-400 scale-110 shadow-xl'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }
                `}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : getStepIcon(index)}
              </div>

              {/* Step Label */}
              <div className="mt-3 text-center max-w-[120px]">
                <span
                  className={`
                    text-sm font-semibold transition-colors duration-300
                    ${isCompleted ? 'text-green-600 dark:text-green-400' : isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}
                  `}
                >
                  {label}
                </span>
                <div
                  className={`
                    text-xs mt-1 transition-colors duration-300
                    ${isCompleted ? 'text-green-500 dark:text-green-400' : isActive ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}
                  `}
                >
                  {isCompleted && 'مكتمل'}
                  {isActive && 'جاري'}
                  {isUpcoming && 'قادم'}
                </div>
              </div>

              {/* Step Number */}
              <div
                className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold
                  flex items-center justify-center border-2 border-white dark:border-gray-800
                  transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-green-500 dark:bg-green-600 text-white'
                      : isActive
                      ? 'bg-green-500 dark:bg-green-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }
                `}
              >
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-8 bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-4 hidden sm:block">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">تقدم الحجز</span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            {activeStep + 1} / {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>بداية</span>
          <span>نهاية</span>
        </div>
      </div>
    </div>
  );
}
