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
import { Calendar, Clock, Plus } from 'lucide-react';
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
      <div dir="rtl" className="w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">حجوزات الساحات</h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  اختر الساحة والفترة الزمنية ثم اعرضها كتقويم أسبوعي
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
              <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                <span className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700 font-medium text-xs">
                  • توجد حجوزات
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الساحة</label>
                  <select
                    value={selectedArena}
                    onChange={(e) => setSelectedArena(e.target.value)}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {arenas.map((arena) => (
                      <option key={arena.id} value={arena.id}>
                        {arena.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    من تاريخ{' '}
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
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
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    إلى تاريخ{' '}
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
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
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => fetchReservations()}
                  disabled={!selectedArena || loading}
                  className="inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white text-xs sm:text-sm font-semibold hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جارٍ التحميل...' : 'تحديث الحجوزات'}
                </button>
                <button
                  onClick={handleWeekFetch}
                  disabled={!selectedArena || loading}
                  className="inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-emerald-200 text-xs sm:text-sm font-semibold hover:from-emerald-200 hover:to-teal-200 dark:hover:from-emerald-800 dark:hover:to-teal-800 transition-all duration-300 border border-emerald-200 dark:border-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : <span className="hidden sm:inline">جلب حجوزات الأسبوع</span>}
                  {loading ? '...' : <span className="sm:hidden">الأسبوع</span>}
                </button>
                {error && (
                  <span className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-red-200 dark:border-red-800">
                    {error}
                  </span>
                )}
              </div>

              {/* Weekly calendar: days as columns, hours as rows */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-200 dark:border-green-800 px-3 sm:px-4 py-2 sm:py-3">
                  <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                    <span className="hidden sm:inline">المدى المختار: </span>
                    {startDate && format(parseISO(startDate), 'PPP', { locale: arSA })} -{' '}
                    {endDate && format(parseISO(endDate), 'PPP', { locale: arSA })}
                  </div>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[600px] sm:min-w-full px-4 sm:px-0">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm px-4" onClick={() => setDetails(null)}>
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              onClick={() => setDetails(null)}
            >
              ✕
            </button>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">تفاصيل الحجز</h3>
              </div>
              {detailsLoading && (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">جارٍ التحميل...</p>
                </div>
              )}
              {detailsError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="text-sm text-red-700 dark:text-red-400">{detailsError}</p>
                </div>
              )}
              {!detailsLoading && !detailsError && (
                <>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 border border-green-200 dark:border-green-700 font-semibold">
                      {statusLabel(details.status)}
                    </span>
                    {details.id && (
                      <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-mono">
                        #{details.id.slice(0, 8)}...
                      </span>
                    )}
                    <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {format(parseISO(details.dateOfReservation), 'PPP', { locale: arSA })}
                    </span>
                  </div>

                  {details.arena && (
                    <div className="rounded-xl border-2 border-green-200 dark:border-green-800 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="text-base text-gray-900 dark:text-white font-bold mb-1">{details.arena.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {details.arena.categoryName} • {details.arena.locationSummary}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-200 dark:border-gray-600">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium">طريقة الدفع</div>
                      <div className="font-bold text-gray-900 dark:text-white">{details.paymentMethod || '-'}</div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 border border-green-200 dark:border-green-800">
                      <div className="text-gray-600 dark:text-gray-400 text-xs mb-1 font-medium">الإجمالي</div>
                      <div className="font-bold text-green-600 dark:text-green-400 text-lg">{details.totalAmount} ج.م</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-200 dark:border-gray-600">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium">ساعات اللعب</div>
                      <div className="font-bold text-gray-900 dark:text-white">{details.totalHours} ساعة</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-200 dark:border-gray-600">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium">قيمة اللعب</div>
                      <div className="font-bold text-gray-900 dark:text-white">{details.playTotalAmount} ج.م</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                      الأوقات
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(details.slots || []).map((slot) => (
                        <span
                          key={slot.id || slot.hour}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 border border-green-200 dark:border-green-700 font-semibold"
                        >
                          {slot.date || details.dateOfReservation} • {slotRangeLabel(slot)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
                      الإضافات
                    </div>
                    {details.extras && details.extras.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {details.extras.map((ex) => (
                          <span
                            key={ex.id}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs dark:from-blue-900/40 dark:to-cyan-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700 font-semibold"
                          >
                            {ex.name} • {ex.price} ج.م
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        لا توجد إضافات
                      </p>
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
