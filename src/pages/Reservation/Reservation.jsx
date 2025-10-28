import React, { useContext, useEffect, useState } from "react";
import BookingStepper from "../../components/BookingStepper/BookingStepper";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReservationStep from "../../components/Steps/ReservationStep";
import ReservationDetails from "../ReservationDetails/ReservationDetails";
import Extras from "../Extras/Extras";

export default function Reservation() {
  const { t } = useTranslation();
  const { getExtras, extras } = useContext(reservationContext);
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();

  const steps = [
    t("reservation.step1"),
    t("reservation.step2"),
    t("reservation.step3"),
  ];

  useEffect(() => {
    getExtras(id);
  }, [id]);

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveStep((prev) => {
      if (prev === 0 && (!extras || extras.length === 0)) {
        return Math.min(prev + 2, steps.length - 1);
      }
      return Math.min(prev + 1, steps.length - 1);
    });
  };
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
            disabled={activeStep === steps.length - 1}
            className="btn text-black bg-mainColor"
          >
            {t("reservation.next")}
          </button>
        </div>
      )}
    </div>
  );
}
