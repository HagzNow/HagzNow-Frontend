import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import baseUrl from "../../apis/config";
import ReservationInfoCard from "../../components/Reservation/ReservationInfoCard";
import ReservationActions from "../../components/Reservation/ReservationActions";

export default function ReservationView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  const fetchReservation = async () => {
    try {
      const { data } = await baseUrl.get(`/reservations/${id}`);
      setData({
        date: data.data.dateOfReservation,
        slots: data.data.slots,
        selectedExtras: data.data.extras || [],
        totalAmount: data.data.totalAmount,
        extrasTotalAmount: data.data.extrasTotalAmount,
        arena: data.data.arena,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 gap-8 container w-3/4 py-6">
      <ReservationInfoCard data={data} i18n={i18n} />
      <ReservationActions isPreview={false} />
    </div>
  );
}
