import dayjs from "dayjs";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let reservationContext = createContext(null);

import React from "react";
import baseUrl from "../apis/config";

export default function ReservationContextProvider({ children }) {
  let [date, setDate] = useState(dayjs());
  let [times, setTimes] = useState([]);
  let [loading, setLoading] = useState(false);

  async function getTimeAvailable(selectedDate) {
    setDate(selectedDate);
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    setLoading(true);
    try {
      let { data } = await baseUrl.get(
        `/arenas/0d730fd2-1c4b-4a0d-8ddf-5462be0a58c6/slots/available?date=${formattedDate}`
      );
      console.log(data);
      setTimes(data.data.availableHours);
      console.log(times);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <reservationContext.Provider
      value={{ getTimeAvailable, times, setDate, date, loading }}
    >
      {children}
    </reservationContext.Provider>
  );
}
