import React, { useContext, useEffect, useState } from 'react';
import { reservationContext } from '../../Contexts/ReservationContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import baseUrl from '../../apis/config';
import ReservationInfoCard from '../../components/Reservation/ReservationInfoCard';
import ReservationActions from '../../components/Reservation/ReservationActions';
import toast from 'react-hot-toast';
import ReservationHeader from '@/components/Reservation/ReservationHeader';

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function transformReservationData(raw) {
    const arena = raw.arena;

    return {
      arena: {
        id: arena.id,
        name: arena.name,
        categoryName: arena.category?.name || '',
        pricePerHour: arena.pricePerHour,
        thumbnail: arena.thumbnail,
        status: arena.status,
        locationSummary: `${arena.location?.city || ''}, ${arena.location?.governorate || ''}`,
      },
      date: raw.date?.format ? raw.date.format('YYYY-MM-DD') : raw.date,
      slots: raw.slots || [],

      selectedExtras: raw.selectedExtras || [],
      extrasTotalAmount: raw.extrasTotalAmount ?? 0,
      totalAmount: raw.totalAmount ?? 0,
      status: raw.status,
    };
  }

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
  const totalAmount = (Number(arena?.data.pricePerHour) * slots.length * Number(arena?.data.depositPercent)) / 100;
  const extrasTotalAmount = selectedExtras.reduce((sum, extra) => sum + Number(extra.price || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const data = transformReservationData({
    arena: arena.data,
    date,
    slots,
    selectedExtras,
    totalAmount,
    extrasTotalAmount,
    status: 'pending',
  });

  return (
    <div className="pt-5">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <ReservationHeader data={data} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Reservation Info (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <ReservationInfoCard data={data} i18n={i18n} isPreview={true} />
            </div>
          </div>

          {/* Right Column - Actions (1/3 width) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
              <ReservationActions
                isPreview={true}
                loading={loadbuttom}
                onConfirm={handelSubmit}
                onCancel={handleCancel}
                onEdit={handleBack}
              />
            </div>

            {/* Additional Info Card (optional) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden group">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-700 dark:group-hover:to-cyan-700 transition-all duration-500">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">معلومات مهمة</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">نقاط هامة قبل تأكيد الحجز</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Info Item 1 */}
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-green-800 dark:text-green-300 font-medium text-sm">
                        تأكد من صحة جميع البيانات
                      </p>
                      <p className="text-green-700 dark:text-green-400 text-xs mt-1">
                        تحقق من التاريخ، الوقت، والإضافات المختارة
                      </p>
                    </div>
                  </div>

                  {/* Info Item 2 */}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✎</span>
                    </div>
                    <div>
                      <p className="text-blue-800 dark:text-blue-300 font-medium text-sm">
                        يمكنك تعديل الحجز قبل التأكيد
                      </p>
                      <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">
                        استخدم زر التعديل لإجراء أي تغييرات
                      </p>
                    </div>
                  </div>

                  {/* Info Item 3 */}
                  <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">💰</span>
                    </div>
                    <div>
                      <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">
                        سيتم خصم المبلغ بعد التأكيد
                      </p>
                      <p className="text-amber-700 dark:text-amber-400 text-xs mt-1">المبلغ سيخصم تلقائياً من محفظتك</p>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
                    تأكد من قراءة جميع النقاط قبل المتابعة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-2xl text-sm font-medium border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
            المعاينة النهائية - جاهز للتأكيد
          </div>
        </div>
      </div>
    </div>
  );
}
