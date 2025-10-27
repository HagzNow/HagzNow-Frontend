import dayjs from "dayjs";
import { createContext, useState } from "react";
import React from "react";
import baseUrl from "../apis/config";

// eslint-disable-next-line react-refresh/only-export-components
export let reservationContext = createContext(null);

export default function ReservationContextProvider({ children }) {
  let [date, setDate] = useState(dayjs());
  const [arenaId, setArenaId] = useState(null);
  const [slots, setSlots] = useState([]);
  let [times, setTimes] = useState([]);
  let [loading, setLoading] = useState(false);
  let [extras, setExtras] = useState(null);

  async function getTimeAvailable(
    selectedDate,
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
      extras,
    };
    console.log("Reservation payload:", payload);
    try {
      let { data } = await baseUrl.post("/reservations/", payload);
      return data;
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </reservationContext.Provider>
  );
}
