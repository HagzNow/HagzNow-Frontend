import dayjs from "dayjs";
import { createContext, useState } from "react";
import React from "react";
import baseUrl from "../apis/config";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react-refresh/only-export-components
export let reservationContext = createContext(null);

export default function ReservationContextProvider({ children }) {
  const { t } = useTranslation();
  let [date, setDate] = useState(dayjs());
  const [arenaId, setArenaId] = useState(null);
  const [slots, setSlots] = useState([]);
  let [times, setTimes] = useState([]);
  let [loading, setLoading] = useState(false);
  let [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    t("reservation.step1"),
    t("reservation.step2"),
    t("reservation.step3"),
  ];

  async function getTimeAvailable(
    selectedDate = date,
    arenaId = "6bff58ed-88b7-4a31-bfbb-2a2f26ee3f47"
  ) {
    setDate(selectedDate);
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    setLoading(true);
    try {
      let { data } = await baseUrl.get(
        `/arenas/${arenaId}/slots/available?date=${formattedDate}`
      );
      setTimes(data.data.availableHours);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function submitReservation() {
    const payload = {
      arenaId,
      date: date.format("YYYY-MM-DD"),
      slots,
      selectedExtras,
    };
    try {
      let { data } = await baseUrl.post("/reservations/", payload);
      resetReservation();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveStep((prev) => {
      const nextStep = extras && extras.length > 0 ? prev + 1 : prev + 2;
      return Math.min(nextStep, steps.length - 1);
    });
  };

  function resetReservation() {
    setSlots([]);
    setSelectedExtras([]);
    setDate(dayjs());
    setActiveStep(0);
  }

  async function getExtras(arenaId = "6bff58ed-88b7-4a31-bfbb-2a2f26ee3f47") {
    try {
      let { data } = await baseUrl.get(`/arenas/${arenaId}/extras`);
      setExtras(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <reservationContext.Provider
      value={{
        getTimeAvailable,
        times,
        setDate,
        date,
        loading,
        getExtras,
        extras,
        setExtras,
        setSlots,
        slots,
        arenaId,
        setArenaId,
        submitReservation,
        setSelectedExtras,
        selectedExtras,
        resetReservation,
        handleNext,
        handleBack,
        activeStep,
        steps,
      }}
    >
      {children}
    </reservationContext.Provider>
  );
}
