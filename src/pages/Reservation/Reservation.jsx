import React, { useContext, useEffect } from 'react';
import BookingStepper from '../../components/BookingStepper/BookingStepper';
import { reservationContext } from '../../Contexts/ReservationContext';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationStep from '../../components/Steps/ReservationStep';
import Extras from '../Extras/Extras';
import { useTranslation } from 'react-i18next';
import ReservationPreview from '../ReservationPreview/ReservationPreview';
import { ArrowLeft, ArrowRight, Calendar, Package, Eye } from 'lucide-react';

export default function Reservation() {
  const navigate = useNavigate();
  const { getExtras, extras, activeStep, steps, handleNext, handleBack, slots, resetReservation } =
    useContext(reservationContext);
  let { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    getExtras(id);
  }, [id]);

  useEffect(() => {
    return () => {
      resetReservation();
    };
  }, []);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ReservationStep />;
      case 1:
        return extras?.length > 0 ? <Extras /> : <ReservationPreview />;
      case 2:
        return <ReservationPreview />;
      default:
        return <ReservationStep />;
    }
  };

  const isNextDisabled = activeStep === 0 && (!slots || slots.length === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{'حجز الملعب'}</h1>
          <p className="text-gray-600 text-lg">{'اتبع الخطوات لإكمال حجزك'}</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 p-6 mb-8">
          <BookingStepper steps={steps} activeStep={activeStep} />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {activeStep !== steps.length - 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            {/* Back Button */}
            <button
              onClick={() => handleBack(navigate, id)}
              className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out font-semibold min-w-[140px] justify-center"
            >
              <ArrowRight className="w-5 h-5" />
              {t('reservation.previous') || 'السابق'}
            </button>

            {/* Step Indicator */}
            {/* <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                {activeStep + 1}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">الخطوة الحالية</p>
                <p className="font-semibold text-gray-900">{steps[activeStep]}</p>
              </div>
            </div> */}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isNextDisabled || activeStep === steps.length - 1}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold min-w-[140px] justify-center
                transform transition-all duration-300 ease-in-out
                ${
                  isNextDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:-translate-y-0.5 hover:shadow-xl'
                }
              `}
            >
              {t('reservation.next') || 'التالي'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Progress Info */}
        {/* <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {activeStep + 1} من {steps.length} خطوات مكتملة
          </div>
        </div> */}
      </div>
    </div>
  );
}
