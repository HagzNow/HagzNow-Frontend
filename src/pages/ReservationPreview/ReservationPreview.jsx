import React, { useContext, useEffect, useState } from 'react';
import { reservationContext } from '../../Contexts/ReservationContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import baseUrl from '../../apis/config';
import ReservationInfoCard from '../../components/Reservation/ReservationInfoCard';
import ReservationActions from '../../components/Reservation/ReservationActions';
import toast from 'react-hot-toast';
import ReservationHeader from '@/components/Reservation/reservationHeader';

export default function ReservationPreview() {
  const [arena, setArena] = useState(null);
  const [loading, setLoading] = useState(true);
  let [loadbuttom, setLoadButtom] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { selectedExtras, slots, date, submitReservation, arenaId, resetReservation, handleBack } =
    useContext(reservationContext);

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
        toast.error('فشل في إنشاء الحجز');
      }
    } catch (err) {
      console.error('Error in handelSubmit:', err);
    } finally {
      setLoadButtom(false);
    }
  }

  const handleCancel = () => {
    resetReservation();
    navigate('/user-arena');
  };
  console.log('price per hour : ', arena?.data.pricePerHour);
  console.log('slots length', slots.length);
  console.log('deposit percent', arena?.data.depositPercent);
  const totalAmount = (Number(arena?.data.pricePerHour) * slots.length * Number(arena?.data.depositPercent)) / 100;
  const extrasTotalAmount = selectedExtras.reduce((sum, extra) => sum + Number(extra.price || 0), 0);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <ReservationHeader data={data} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Reservation Info (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden">
              <ReservationInfoCard data={data} i18n={i18n} isPreview={true} />
            </div>
          </div>

          {/* Right Column - Actions (1/3 width) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden">
              <ReservationActions
                isPreview={true}
                loading={loadbuttom}
                onConfirm={handelSubmit}
                onCancel={handleCancel}
                onEdit={handleBack}
              />
            </div>

            {/* Additional Info Card (optional) */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden group">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-500">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">معلومات مهمة</h3>
                    <p className="text-gray-600 text-sm mt-1">نقاط هامة قبل تأكيد الحجز</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Info Item 1 */}
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium text-sm">تأكد من صحة جميع البيانات</p>
                      <p className="text-green-700 text-xs mt-1">تحقق من التاريخ، الوقت، والإضافات المختارة</p>
                    </div>
                  </div>

                  {/* Info Item 2 */}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✎</span>
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium text-sm">يمكنك تعديل الحجز قبل التأكيد</p>
                      <p className="text-blue-700 text-xs mt-1">استخدم زر التعديل لإجراء أي تغييرات</p>
                    </div>
                  </div>

                  {/* Info Item 3 */}
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">💰</span>
                    </div>
                    <div>
                      <p className="text-amber-800 font-medium text-sm">سيتم خصم المبلغ بعد التأكيد</p>
                      <p className="text-amber-700 text-xs mt-1">المبلغ سيخصم تلقائياً من محفظتك</p>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    تأكد من قراءة جميع النقاط قبل المتابعة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            المعاينة النهائية - جاهز للتأكيد
          </div>
        </div>
      </div>
    </div>
  );
}
