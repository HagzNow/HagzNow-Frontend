import { useEffect, useMemo, useState } from 'react';
import { format, startOfDay } from 'date-fns';
import { arSA } from 'date-fns/locale';
import OwnerArenasList from '@/components/OwnerComponents/OwnerArenasList/OwnerArenasList';
import { arenaService } from '@/services/arenaService';
import { reservationService } from '@/services/reservationService';

export default function OwnerReservations() {
  const today = useMemo(() => format(startOfDay(new Date()), 'yyyy-MM-dd'), []);

  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArenas = async () => {
      try {
        const res = await arenaService.getOwnerArenas({ page: 1, limit: 100 });
        setArenas(res.data || []);
        if (res.data?.length) {
          setSelectedArena(res.data[0].id);
        }
      } catch (err) {
        setError(err.message || 'تعذر تحميل الساحات');
      }
    };
    loadArenas();
  }, []);

  const fetchReservations = async () => {
    if (!selectedArena) return;
    setLoading(true);
    setError('');
    try {
      const data = await reservationService.getOwnerReservations({
        arenaId: selectedArena,
        startDate,
        endDate,
      });
      setReservations(data);
    } catch (err) {
      setError(err.message || 'تعذر تحميل الحجوزات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArena]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-gray-900/40 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">حجوزات الساحات</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                اختر الساحة والفترة الزمنية لعرض الحجوزات في التقويم.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">الساحة</label>
                <select
                  value={selectedArena}
                  onChange={(e) => setSelectedArena(e.target.value)}
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
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">من تاريخ</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">إلى تاريخ</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchReservations}
                disabled={!selectedArena || loading}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'جارٍ التحميل...' : 'عرض الحجوزات'}
              </button>
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              {reservations.length === 0 && !loading ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد حجوزات في هذه الفترة.</p>
              ) : (
                <div className="space-y-3">
                  {reservations.map((res) => (
                    <div
                      key={res.id}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4 flex flex-col gap-2"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {format(new Date(res.dateOfReservation), 'PPP', { locale: arSA })}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">المبلغ: {res.totalAmount}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">اللاعب: {res.playerName}</span>
                      </div>
                      {res.slots && (
                        <div className="flex flex-wrap gap-2">
                          {res.slots.map((slot) => (
                            <span
                              key={slot}
                              className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs dark:bg-green-900/30 dark:text-green-300"
                            >
                              الساعة: {slot}:00
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

