import React, { useContext, useEffect } from "react";
import BookingStepper from "../../components/BookingStepper/BookingStepper";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useParams } from "react-router-dom";
import ReservationStep from "../../components/Steps/ReservationStep";
import ReservationDetails from "../ReservationDetails/ReservationDetails";
import Extras from "../Extras/Extras";
import { useTranslation } from "react-i18next";

export default function Reservation() {
  const {
    getExtras,
    extras,
    activeStep,
    steps,
    handleNext,
    handleBack,
    slots,
  } = useContext(reservationContext);
  let { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    getExtras(id);
  }, [id]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ReservationStep />;
      case 1:
        return extras?.length > 0 ? <Extras /> : <ReservationDetails />;
      case 2:
        return <ReservationDetails />;
      default:
        return <ReservationStep />;
    }
  };

  return (
    <div className="flex flex-col space-y-5 justify-center items-center py-5">
      <BookingStepper steps={steps} activeStep={activeStep} />

      <div className="w-full flex justify-center">{renderStepContent()}</div>

      {activeStep !== steps.length - 1 && (
        <div className="w-3/4 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="btn text-black"
          >
            {t("reservation.previous")}
          </button>
          <button
            onClick={handleNext}
            disabled={
              (activeStep === 0 && (!slots || slots.length === 0)) ||
              activeStep === steps.length - 1
            }
            className={`
    ${
      activeStep === 0 && (!slots || slots.length === 0)
        ? "opacity-50 cursor-not-allowed bg-gray-300 btn text-black"
        : "btn text-black bg-mainColor"
    }`}
          >
            {t("reservation.next")}
          </button>
        </div>
      )}
    </div>
  );
}
