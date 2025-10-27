import React, { useContext, useEffect, useState } from "react";
import BookingStepper from "../../components/BookingStepper/BookingStepper";
import { Box } from "@mui/material";
import ReservationStep from "../../components/Steps/ReservationStep";
import { useTranslation } from "react-i18next";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Reservation() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  let { getExtras, extras } = useContext(reservationContext);
  let { id } = useParams();

  const steps = [
    t("reservation.step1"),
    t("reservation.step2"),
    t("reservation.step3"),
  ];

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (extras.length == 0) {
      navigate("/reservationDetails");
    } else {
      navigate(`/extras/${id}`);
    }
  };

  useEffect(() => {
    getExtras(id);
  }, []);

  return (
    <div className="flex flex-col space-y-5 justify-center items-center py-5">
      <BookingStepper steps={steps} activeStep={activeStep} />
      <ReservationStep />

      <div className="w-3/4 container flex justify-between items-center">
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
    </div>
  );
}
