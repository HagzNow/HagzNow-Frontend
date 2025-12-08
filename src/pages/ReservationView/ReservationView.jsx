import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import baseUrl from '../../apis/config';
import ReservationInfoCard from '../../components/Reservation/ReservationInfoCard';
import ReservationActions from '../../components/Reservation/ReservationActions';
import toast from 'react-hot-toast';
import ReservationHeader from '@/components/Reservation/reservationHeader';

export default function ReservationView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  let [loadbuttom, setLoadButtom] = useState(false);

  const fetchReservation = useCallback(async () => {
    try {
      const { data } = await baseUrl.get(`/reservations/${id}`);
      setData({
        date: data.data.dateOfReservation,
        slots: data.data.slots,
        selectedExtras: data.data.extras || [],
        totalAmount: data.data.totalAmount,
        extrasTotalAmount: data.data.extrasTotalAmount,
        arena: data.data.arena,
        status: data.data.status,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  let cancelRservation = async () => {
    setLoadButtom(true);
    try {
      let { data } = await baseUrl.patch(`/reservations/cancel/${id}`);
      console.log(data);
      toast.success('تم الغاء الحجز ');
    } catch (error) {
      toast.error(error?.response?.data.message);
    } finally {
      setLoadButtom(false);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [fetchReservation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container w-3/4 py-16 flex flex-col gap-8 mx-auto">
        <div className="w-full">
          <ReservationHeader data={data} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          <div className="lg:w-2/3 w-full">
            <ReservationInfoCard data={data} i18n={i18n} isPreview={false} />
          </div>

          <div className="lg:w-1/3 w-full">
            <ReservationActions
              isPreview={false}
              cancelRservation={cancelRservation}
              status={data?.status}
              loading={loadbuttom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
