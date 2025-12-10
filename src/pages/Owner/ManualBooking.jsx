import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ListChecks, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { format, startOfDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { arenaService } from '@/services/arenaService';
import { reservationService } from '@/services/reservationService';
import baseUrl from '@/apis/config';

const ManualBookingForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const today = format(startOfDay(new Date()), 'yyyy-MM-dd');
  const [arenas, setArenas] = useState([]);
  const [arenaId, setArenaId] = useState('');
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await arenaService.getOwnerArenas({ page: 1, limit: 100 });
        setArenas(res.data || []);
        if (res.data?.length) setArenaId(res.data[0].id);
      } catch (err) {
        toast.error(err.message || 'تعذر تحميل الساحات');
      }
    };
    load();
  }, []);

  // Load available slots for selected arena/date
  useEffect(() => {
    const loadSlots = async () => {
      if (!arenaId || !date) return;
      try {
        const { data } = await baseUrl.get(`/arenas/${arenaId}/slots/available?date=${date}`);
        setAvailableSlots(data.data.availableHours || []);
      } catch (err) {
        setAvailableSlots([]);
        toast.error(err?.response?.data?.message || err.message || 'تعذر تحميل الأوقات المتاحة');
      }
    };
    loadSlots();
  }, [arenaId, date]);

  // Load extras for arena
  useEffect(() => {
    const loadExtras = async () => {
      if (!arenaId) return;
      try {
        const { data } = await baseUrl.get(`/arenas/${arenaId}/extras`);
        setExtras(data.data || []);
      } catch (err) {
        setExtras([]);
      }
    };
    loadExtras();
  }, [arenaId]);

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot].sort((a, b) => a - b)
    );
  };

  const toggleExtra = (id) => {
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!arenaId || !date || selectedSlots.length === 0) {
      toast.error('اختر الساحة والتاريخ والساعة على الأقل');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        arenaId,
        date,
        slots: selectedSlots,
        extras: selectedExtras,
      };
      const data = await reservationService.createOwnerManualReservation(payload);
      toast.success('تم إنشاء حجز يدوي بنجاح');
      setSelectedSlots([]);
      if (data?.dateOfReservation) setDate(data.dateOfReservation);
      navigate('/owner/reservations');
    } catch (err) {
      toast.error(err.message || 'تعذر إنشاء الحجز');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">حجز يدوي</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                أنشئ حجزاً مباشراً لساحتك مع تحديد الساعات والإضافات
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 p-4 sm:p-6 lg:p-8">

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">الساحة</label>
                <select
                  value={arenaId}
                  onChange={(e) => setArenaId(e.target.value)}
                  className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:border-green-300 dark:hover:border-green-600"
                >
                  {arenas.map((arena) => (
                    <option key={arena.id} value={arena.id}>
                      {arena.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">التاريخ</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:border-green-300 dark:hover:border-green-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <ListChecks className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                </div>
                <label className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                  الساعات (يمكن اختيار أكثر من ساعة)
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                {(availableSlots.length ? availableSlots : [10, 11]).map((h) => (
                  <label
                    key={h}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedSlots.includes(h)
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:border-green-600 dark:text-green-300 shadow-md'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedSlots.includes(h)}
                      onChange={() => toggleSlot(h)}
                    />
                    <span className="text-xs sm:text-sm font-medium text-center">
                      {h}:00 - {h + 1}:00
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                </div>
                <label className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">الإضافات</label>
              </div>
              {extras.length === 0 && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 sm:p-3 rounded-lg">
                  لا توجد إضافات متاحة
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {extras.map((ex) => (
                  <label
                    key={ex.id}
                    className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedExtras.includes(ex.id)
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:border-green-600 dark:text-green-300 shadow-md'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedExtras.includes(ex.id)}
                        onChange={() => toggleExtra(ex.id)}
                      />
                      <span className="text-xs sm:text-sm font-semibold">{ex.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">{ex.price} ج.م</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span className="text-xs sm:text-sm">جارٍ الإنشاء...</span>
                </span>
              ) : (
                'إنشاء حجز يدوي'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualBookingForm;
