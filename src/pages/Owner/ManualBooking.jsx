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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300"
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-gray-900/40 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">حجز يدوي (مالك)</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                أنشئ حجزاً مباشراً لساحتك مع تحديد الساعات والإضافات.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">الساحة</label>
                <select
                  value={arenaId}
                  onChange={(e) => setArenaId(e.target.value)}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {arenas.map((arena) => (
                    <option key={arena.id} value={arena.id}>
                      {arena.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">التاريخ</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-green-600 dark:text-green-300" />
                <label className="text-sm font-semibold text-gray-900 dark:text-white">
                  الساعات (يمكن اختيار أكثر من ساعة)
                </label>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {(availableSlots.length ? availableSlots : [10, 11]).map((h) => (
                  <label
                    key={h}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${
                      selectedSlots.includes(h)
                        ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedSlots.includes(h)}
                      onChange={() => toggleSlot(h)}
                    />
                    <span className="text-sm">
                      {h}:00 - {h + 1}:00
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-500" />
                <label className="text-sm font-semibold text-gray-900 dark:text-white">الإضافات</label>
              </div>
              {extras.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد إضافات متاحة.</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {extras.map((ex) => (
                  <label
                    key={ex.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition ${
                      selectedExtras.includes(ex.id)
                        ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedExtras.includes(ex.id)}
                        onChange={() => toggleExtra(ex.id)}
                      />
                      <span className="text-sm font-semibold">{ex.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{ex.price}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 dark:bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? 'جارٍ الإنشاء...' : 'إنشاء حجز يدوي'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualBookingForm;
