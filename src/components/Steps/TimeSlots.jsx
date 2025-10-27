import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";
export default function TimeSlots() {
  let { times } = useContext(reservationContext);

  return (
    <>
      {times?.map((time, i) => {
        return (
          <button className="btn bg-mainColor" key={i}>
            {time}
          </button>
        );
      })}
    </>
  );
}
