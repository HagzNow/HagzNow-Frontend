import { useEffect, useMemo, useState } from 'react';
import {
  format,
  startOfDay,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  differenceInCalendarDays,
  addDays,
} from 'date-fns';
import { arSA } from 'date-fns/locale';
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
  const [viewDate, setViewDate] = useState(() => startOfDay(new Date()));
  const [selectedDay, setSelectedDay] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  const statusLabel = (status) => {
    const map = {
      confirmed: 'مؤكد',
      pending: 'معلق',
      canceled: 'ملغي',
      paid: 'مدفوع',
      completed: 'مكتمل',
    };
    return map[status] || status || '-';
  };

  const slotRangeLabel = (slot) => {
    if (slot && Number.isFinite(slot.hour)) {
      return `${slot.hour}:00 - ${slot.hour + 1}:00`;
    }
    return '-';
  };

  // Fetch arenas for owner
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

  const fetchReservations = async (opts = {}) => {
    const arenaId = opts.arenaId ?? selectedArena;
    const sDate = opts.startDate ?? startDate;
    const eDate = opts.endDate ?? endDate;
    if (!arenaId) return;
    setLoading(true);
    setError('');
    try {
      const data = await reservationService.getOwnerReservations({
        arenaId,
        startDate: sDate,
        endDate: eDate,
      });
      setReservations(data);
    } catch (err) {
      setError(err.message || 'تعذر تحميل الحجوزات');
    } finally {
      setLoading(false);
    }
  };

  // auto-fetch on arena/date change
  useEffect(() => {
    if (selectedArena && startDate && endDate) {
      fetchReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArena, startDate, endDate]);

  // Build visible days from selected range (1-7 days)
  const rangeDays = useMemo(() => {
    if (!startDate || !endDate) return [];
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    return eachDayOfInterval({ start, end });
  }, [startDate, endDate]);

  // Map reservations by day/hour
  const reservationsByDayHour = useMemo(() => {
    const map = new Map();
    reservations.forEach((r) => {
      const dayKey = r.dateOfReservation;
      (r.slots || []).forEach((slot) => {
        const key = `${dayKey}-${slot}`;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(r);
      });
    });
    return map;
  }, [reservations]);

  const loadDetails = async (id) => {
    try {
      setDetailsLoading(true);
      setDetailsError('');
      const data = await reservationService.getReservationById(id);
      setDetails(data);
    } catch (err) {
      setDetailsError(err.message || 'تعذر تحميل التفاصيل');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleWeekFetch = () => {
    const start = format(startOfWeek(viewDate, { weekStartsOn: 0 }), 'yyyy-MM-dd');
    const end = format(endOfWeek(viewDate, { weekStartsOn: 0 }), 'yyyy-MM-dd');
    setStartDate(start);
    setEndDate(end);
    fetchReservations({ startDate: start, endDate: end });
  };

  // Constrain range to max 7 days
  const clampRange = (start, end) => {
    const diff = differenceInCalendarDays(end, start);
    if (diff > 6) return addDays(start, 6);
    return end;
  };

  // Sync viewDate header with selected start date
  useEffect(() => {
    if (startDate) {
      setViewDate(startOfDay(parseISO(startDate)));
    }
  }, [startDate]);

  const endDateMax = useMemo(() => {
    if (!startDate) return '';
    return format(addDays(parseISO(startDate), 6), 'yyyy-MM-dd');
  }, [startDate]);

  const shortDayNames = ['أحد', 'اثنـ', 'ثلا', 'أربـ', 'خميـ', 'جمعة', 'سبت'];

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-gray-900/40 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">حجوزات الساحات</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    اختر الساحة والفترة الزمنية ثم اعرضها كتقويم أسبوعي.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    • توجد حجوزات
                  </span>
                </div>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    من تاريخ{' '}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({format(parseISO(startDate), 'EEEE', { locale: arSA })})
                    </span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    max={endDateMax}
                    onChange={(e) => {
                      const nextStart = e.target.value;
                      const nextEnd = clampRange(parseISO(nextStart), parseISO(endDate));
                      setStartDate(nextStart);
                      setEndDate(format(nextEnd, 'yyyy-MM-dd'));
                    }}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    إلى تاريخ{' '}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({format(parseISO(endDate), 'EEEE', { locale: arSA })})
                    </span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    max={endDateMax}
                    onChange={(e) => {
                      const nextEnd = clampRange(parseISO(startDate), parseISO(e.target.value));
                      setEndDate(format(nextEnd, 'yyyy-MM-dd'));
                    }}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => fetchReservations()}
                  disabled={!selectedArena || loading}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'جارٍ التحميل...' : 'تحديث الحجوزات'}
                </button>
                <button
                  onClick={handleWeekFetch}
                  disabled={!selectedArena || loading}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'جلب حجوزات الأسبوع'}
                </button>
                {error && <span className="text-sm text-red-500">{error}</span>}
              </div>

              {/* Weekly calendar: days as columns, hours as rows */}
              <div className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/80 px-4 py-3">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    المدى المختار: {startDate && format(parseISO(startDate), 'PPP', { locale: arSA })} -{' '}
                    {endDate && format(parseISO(endDate), 'PPP', { locale: arSA })}
                  </div>
                </div>

                <div className="overflow-auto">
                  <div className="min-w-[960px]">
                    <div
                      className="grid"
                      style={{ gridTemplateColumns: `80px repeat(${rangeDays.length || 1}, minmax(0, 1fr))` }}
                    >
                      {/* Header row */}
                      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"></div>
                      {rangeDays.map((day) => (
                        <div
                          key={day.toISOString()}
                          className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 text-center py-2"
                        >
                          <div className="text-xs text-gray-500 dark:text-gray-400">{shortDayNames[day.getDay()]}</div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{format(day, 'd')}</div>
                        </div>
                      ))}
                    </div>

                    {/* Hours rows */}
                    {Array.from({ length: 24 }, (_, hour) => hour).map((hour) => (
                      <div
                        key={hour}
                        className="grid border-t border-gray-100 dark:border-gray-700"
                        style={{ gridTemplateColumns: `80px repeat(${rangeDays.length || 1}, minmax(0, 1fr))` }}
                      >
                        <div className="bg-gray-50 dark:bg-gray-900/60 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-center border-r border-gray-100 dark:border-gray-700">
                          {hour}:00
                        </div>
                        {rangeDays.map((day) => {
                          const dayKey = format(day, 'yyyy-MM-dd');
                          const key = `${dayKey}-${hour}`;
                          const slotReservations = reservationsByDayHour.get(key) || [];
                          const booked = slotReservations.length > 0;
                          return (
                            <div
                              key={key}
                              className={`min-h-[64px] px-2 py-1 border-r border-gray-100 dark:border-gray-700 ${
                                booked ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-white dark:bg-gray-800'
                              }`}
                              onClick={() => setSelectedDay(day)}
                            >
                              {booked ? (
                                <div className="space-y-1">
                                  {slotReservations.map((r) => {
                                    const slotHours = (r.slots || []).sort((a, b) => a - b);
                                    const slotRange =
                                      slotHours.length > 0
                                        ? `${slotHours[0]}:00 - ${slotHours[slotHours.length - 1] + 1}:00`
                                        : `${hour}:00`;
                                    return (
                                      <button
                                        key={r.id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedDay(day);
                                          loadDetails(r.id);
                                        }}
                                        className="w-full text-left text-[11px] text-emerald-800 dark:text-emerald-200 bg-white/70 dark:bg-gray-900/40 rounded-md px-2 py-1 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                      >
                                        <div className="font-semibold">{r.playerName}</div>
                                        <div className="text-[10px] text-gray-600 dark:text-gray-400">
                                          {slotRange} • {r.totalAmount}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span className="text-[11px] text-gray-400 dark:text-gray-500">متاح</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected day details */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                {selectedDay && (
                  <div className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                    التفاصيل ليوم {format(selectedDay, 'PPP', { locale: arSA })}
                  </div>
                )}
                {!selectedDay && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">اختر يوماً من الجدول لعرض التفاصيل.</p>
                )}
                {selectedDay && (
                  <div className="space-y-3">
                    {(reservations.filter((r) => r.dateOfReservation === format(selectedDay, 'yyyy-MM-dd')) || []).map(
                      (res) => {
                        const slotHours = (res.slots || []).sort((a, b) => a - b);
                        const slotRange =
                          slotHours.length > 0 ? `${slotHours[0]}:00 - ${slotHours[slotHours.length - 1] + 1}:00` : '';
                        return (
                          <button
                            key={res.id}
                            onClick={() => loadDetails(res.id)}
                            className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4 flex flex-col gap-2 hover:border-green-300 dark:hover:border-green-500 transition-colors"
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {res.playerName}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                المبلغ: {res.totalAmount}
                              </span>
                              {slotRange && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">الوقت: {slotRange}</span>
                              )}
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
                          </button>
                        );
                      }
                    )}
                    {(reservations.filter((r) => r.dateOfReservation === format(selectedDay, 'yyyy-MM-dd')) || [])
                      .length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد حجوزات في هذا اليوم.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Details Modal */}
      {details && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 relative">
            <button
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setDetails(null)}
            >
              ✕
            </button>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">تفاصيل الحجز</h3>
              {detailsLoading && <p className="text-sm text-gray-500">جارٍ التحميل...</p>}
              {detailsError && <p className="text-sm text-red-500">{detailsError}</p>}
              {!detailsLoading && !detailsError && (
                <>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300">
                    {/* <span className="font-semibold text-gray-900 dark:text-white">
                      {details.playerName || details.userId}
                    </span> */}
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                      {statusLabel(details.status)}
                    </span>
                    {details.id && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        رقم الحجز: #{details.id.slice(0, 8)}...
                      </span>
                    )}
                    <span className="text-gray-600 dark:text-gray-400">
                      التاريخ: {format(parseISO(details.dateOfReservation), 'PPP', { locale: arSA })}
                    </span>
                  </div>

                  {details.arena && (
                    <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/60">
                      <div className="text-sm text-gray-900 dark:text-white font-semibold">{details.arena.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {details.arena.categoryName} • {details.arena.locationSummary}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">طريقة الدفع</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{details.paymentMethod || '-'}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">الإجمالي</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{details.totalAmount}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">ساعات اللعب</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{details.totalHours}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">قيمة اللعب</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{details.playTotalAmount}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">الأوقات</div>
                    <div className="flex flex-wrap gap-2">
                      {(details.slots || []).map((slot) => (
                        <span
                          key={slot.id || slot.hour}
                          className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs dark:bg-green-900/30 dark:text-green-300"
                        >
                          {slot.date || details.dateOfReservation} • {slotRangeLabel(slot)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">الإضافات</div>
                    {details.extras && details.extras.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {details.extras.map((ex) => (
                          <span
                            key={ex.id}
                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs dark:bg-blue-900/30 dark:text-blue-200"
                          >
                            {ex.name} • {ex.price}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">لا توجد إضافات</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
