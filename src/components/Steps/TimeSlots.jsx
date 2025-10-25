import { Button, Grid } from "@mui/material";
export default function TimeSlots() {
  const times = [
    "09:00 ص",
    "10:00 ص",
    "11:00 ص",
    "12:00 م",
    "12:00 م",
    "12:00 م",
    "12:00 م",
    "12:00 م",
    "12:00 م",
    "12:00 م",
    "12:00 م",
    "12:00 م",
  ];

  return (
    <>
      {times.map((time, i) => {
        return (
          <button className="btn bg-mainColor" key={i}>
            {time}
          </button>
        );
      })}
    </>
  );
}
