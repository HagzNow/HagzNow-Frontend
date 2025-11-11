import React, { useContext, useEffect, useState } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import baseUrl from "../../apis/config";
import ReservationInfoCard from "../../components/Reservation/ReservationInfoCard";
import ReservationActions from "../../components/Reservation/ReservationActions";
import toast from "react-hot-toast";

export default function ReservationPreview() {
  const [arena, setArena] = useState(null);
  const [loading, setLoading] = useState(true);
  let [loadbuttom, setLoadButtom] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const {
    selectedExtras,
    slots,
    date,
    submitReservation,
    arenaId,
    resetReservation,
    handleBack,
  } = useContext(reservationContext);

  const fetchArena = async () => {
    try {
      const { data } = await baseUrl.get(`/arenas/${arenaId}`);
      setArena(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArena();
  }, []);

  async function handelSubmit() {
    setLoadButtom(true);
    try {
      const response = await submitReservation();
      if (response?.isSuccess) {
        const reservationId = response.data.id;
        navigate(`/confirm/${reservationId}`);
      } else {
        toast.error("فشل في إنشاء الحجز");
      }
    } catch (err) {
      console.error("Error in handelSubmit:", err);
    } finally {
      setLoadButtom(false);
    }
  }

  const handleCancel = () => {
    resetReservation();
    navigate("/user-arena");
  };

  const totalAmount =
    (arena?.data.pricePerHour * slots.length * arena?.data.depositPercent) /
    100;
  const extrasTotalAmount = selectedExtras.reduce(
    (sum, extra) => sum + Number(extra.price || 0),
    0
  );

  if (loading) return <p>Loading...</p>;

  const data = {
    arena: arena.data,
    date,
    slots,
    selectedExtras,
    totalAmount,
    extrasTotalAmount,
  };
  console.log(slots);
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <ReservationInfoCard data={data} i18n={i18n} />
      <ReservationActions
        isPreview={true}
        loading={loadbuttom}
        onConfirm={handelSubmit}
        onCancel={handleCancel}
        onEdit={handleBack}
      />
    </div>
  );
}
