import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function DateSelector() {
  return (
    <div className="rounded-2xl bg-secondColor">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
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
