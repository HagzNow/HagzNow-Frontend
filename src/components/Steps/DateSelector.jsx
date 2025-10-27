import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import baseUrl from "../../apis/config";

export default function DateSelector({ getTimeAvailable }) {
  let [date, setDate] = useState(dayjs());

  async function getTimeAvailable(selectedDate) {
    setDate(selectedDate);
    const formattedDate = date.format("YYYY-MM-DD");
    try {
      let { data } = await baseUrl.get(
        `/arenas/0d730fd2-1c4b-4a0d-8ddf-5462be0a58c6/slots/available?date=${formattedDate}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-2xl bg-secondColor">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={date}
          onChange={getTimeAvailable}
          minDate={dayjs()}
          sx={{
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            },
            "& .MuiPickersDay-root": {
              "&:hover": {
                backgroundColor: "rgba(0,128,0,0.2)",
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
