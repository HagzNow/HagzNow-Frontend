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
  subDays,
} from 'date-fns';
import { arSA } from 'date-fns/locale';
import {
  Calendar,
  Clock,
  Plus,
  RotateCcw,
  RotateCw,
  Settings,
  Search,
  Filter,
  Download,
  Grid3x3,
  List,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { arenaService } from '@/services/arenaService';
import { reservationService } from '@/services/reservationService';

export default function OwnerReservations() {
  const today = useMemo(() => format(startOfDay(new Date()), 'yyyy-MM-dd'), []);
  const sevenDaysAgo = useMemo(() => format(subDays(startOfDay(new Date()), 6), 'yyyy-MM-dd'), []);

  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState('');
  const [startDate, setStartDate] = useState(sevenDaysAgo);
  const [endDate, setEndDate] = useState(today);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewDate, setViewDate] = useState(() => startOfDay(new Date()));
  const [selectedDay, setSelectedDay] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  // New flexible settings
  const [orientation, setOrientation] = useState('horizontal'); // 'horizontal' (time left, days top) or 'vertical' (time top, days right)
  const [slotDuration, setSlotDuration] = useState(1); // hours per slot (1, 2, 3, etc.)
  const [startHour, setStartHour] = useState(0); // Start hour (0-23)
  const [endHour, setEndHour] = useState(23); // End hour (0-23)
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'list', 'compact'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Check mobile on mount and resize - auto switch to vertical on mobile
  useEffect(() => {
    const checkMobile = () => {
      // Auto switch to vertical on mobile
      if (window.innerWidth < 768 && orientation === 'horizontal') {
        setOrientation('vertical');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [orientation]);

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

  // Generate time slots based on duration
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = startHour; hour <= endHour; hour += slotDuration) {
      slots.push({
        start: hour,
        end: Math.min(hour + slotDuration, 24),
        label: `${hour.toString().padStart(2, '0')}:00 - ${Math.min(hour + slotDuration, 24)
          .toString()
          .padStart(2, '0')}:00`,
      });
    }
    return slots;
  }, [startHour, endHour, slotDuration]);

  // Map reservations by day/slot
  const reservationsByDaySlot = useMemo(() => {
    const map = new Map();
    reservations.forEach((r) => {
      const dayKey = r.dateOfReservation;
      (r.slots || []).forEach((slotHour) => {
        // Find which time slot this hour belongs to
        const slot = timeSlots.find((s) => slotHour >= s.start && slotHour < s.end);
        if (slot) {
          const key = `${dayKey}-${slot.start}`;
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(r);
        }
      });
    });
    return map;
  }, [reservations, timeSlots]);

  // Filter reservations by search query
  const filteredReservations = useMemo(() => {
    if (!searchQuery.trim()) return reservations;
    const query = searchQuery.toLowerCase();
    return reservations.filter(
      (r) =>
        r.playerName?.toLowerCase().includes(query) ||
        r.dateOfReservation?.includes(query) ||
        r.totalAmount?.toString().includes(query),
    );
  }, [reservations, searchQuery]);

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

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['التاريخ', 'اسم اللاعب', 'الأوقات', 'المبلغ الإجمالي'];
    const rows = reservations.map((r) => {
      const slots = (r.slots || []).sort((a, b) => a - b);
      const slotRange = slots.length > 0 ? `${slots[0]}:00 - ${slots[slots.length - 1] + 1}:00` : '-';
      return [r.dateOfReservation, r.playerName, slotRange, r.totalAmount];
    });
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `حجوزات_${startDate}_${endDate}.csv`;
    link.click();
  };

  // Render calendar view
  const renderCalendarView = () => {
    if (orientation === 'vertical') {
      // Vertical: Time on top, Days on right
      return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
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
                style={{
                  gridTemplateRows: `60px repeat(${timeSlots.length || 1}, minmax(80px, auto))`,
                  gridTemplateColumns: `repeat(${rangeDays.length || 1}, minmax(120px, 1fr))`,
                }}
              >
                {/* Empty corner */}
                <div className="bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700"></div>
                {/* Day headers */}
                {rangeDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 text-center py-2 px-2"
                  >
                    <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      {format(day, 'EEEE', { locale: arSA })}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{format(day, 'd')}</div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">
                      {format(day, 'MMM', { locale: arSA })}
                    </div>
                  </div>
                ))}
                {/* Time slots rows */}
                {timeSlots.map((slot) => (
                  <>
                    {/* Time label */}
                    <div
                      key={`time-${slot.start}`}
                      className="bg-gray-50 dark:bg-gray-900/60 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-center border-r border-b border-gray-200 dark:border-gray-700 px-2"
                    >
                      <div className="text-center">
                        <div className="font-semibold">{slot.start.toString().padStart(2, '0')}:00</div>
                        <div className="text-[10px] text-gray-400">{slot.end.toString().padStart(2, '0')}:00</div>
                      </div>
                    </div>
                    {/* Day cells */}
                    {rangeDays.map((day) => {
                      const dayKey = format(day, 'yyyy-MM-dd');
                      const key = `${dayKey}-${slot.start}`;
                      const slotReservations = reservationsByDaySlot.get(key) || [];
                      const booked = slotReservations.length > 0;
                      return (
                        <div
                          key={key}
                          className={`min-h-[80px] px-2 py-2 border-r border-b border-gray-200 dark:border-gray-700 ${
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
                                    : `${slot.start}:00`;
                                return (
                                  <button
                                    key={r.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedDay(day);
                                      loadDetails(r.id);
                                    }}
                                    className="w-full text-right text-[11px] text-emerald-800 dark:text-emerald-200 bg-white/70 dark:bg-gray-900/40 rounded-md px-2 py-1.5 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                  >
                                    <div className="font-semibold truncate">{r.playerName}</div>
                                    <div className="text-[10px] text-gray-600 dark:text-gray-400">{slotRange}</div>
                                    <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                                      {r.totalAmount} ج.م
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
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Horizontal: Time on left, Days on top (original)
      return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
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
                style={{
                  gridTemplateColumns: `100px repeat(${rangeDays.length || 1}, minmax(0, 1fr))`,
                }}
              >
                {/* Header row */}
                <div className="bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700"></div>
                {rangeDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 text-center py-2 px-2"
                  >
                    <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      {format(day, 'EEEE', { locale: arSA })}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{format(day, 'd')}</div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">
                      {format(day, 'MMM', { locale: arSA })}
                    </div>
                  </div>
                ))}
              </div>
              {/* Time slots rows */}
              {timeSlots.map((slot) => (
                <div
                  key={slot.start}
                  className="grid border-t border-gray-200 dark:border-gray-700"
                  style={{
                    gridTemplateColumns: `100px repeat(${rangeDays.length || 1}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="bg-gray-50 dark:bg-gray-900/60 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-center border-r border-gray-200 dark:border-gray-700 px-2 py-3">
                    <div className="text-center">
                      <div className="font-semibold">{slot.start.toString().padStart(2, '0')}:00</div>
                      <div className="text-[10px] text-gray-400">- {slot.end.toString().padStart(2, '0')}:00</div>
                    </div>
                  </div>
                  {rangeDays.map((day) => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const key = `${dayKey}-${slot.start}`;
                    const slotReservations = reservationsByDaySlot.get(key) || [];
                    const booked = slotReservations.length > 0;
                    return (
                      <div
                        key={key}
                        className={`min-h-[80px] px-2 py-2 border-r border-gray-200 dark:border-gray-700 ${
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
                                  : `${slot.start}:00`;
                              return (
                                <button
                                  key={r.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDay(day);
                                    loadDetails(r.id);
                                  }}
                                  className="w-full text-right text-[11px] text-emerald-800 dark:text-emerald-200 bg-white/70 dark:bg-gray-900/40 rounded-md px-2 py-1.5 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                >
                                  <div className="font-semibold truncate">{r.playerName}</div>
                                  <div className="text-[10px] text-gray-600 dark:text-gray-400">{slotRange}</div>
                                  <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                                    {r.totalAmount} ج.م
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
      );
    }
  };

  // Render list view
  const renderListView = () => {
    return (
      <div className="space-y-3">
        {filteredReservations.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">لا توجد حجوزات</div>
        ) : (
          filteredReservations.map((res) => {
            const slotHours = (res.slots || []).sort((a, b) => a - b);
            const slotRange =
              slotHours.length > 0 ? `${slotHours[0]}:00 - ${slotHours[slotHours.length - 1] + 1}:00` : '';
            return (
              <button
                key={res.id}
                onClick={() => loadDetails(res.id)}
                className="w-full text-right rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-green-300 dark:hover:border-green-500 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">{res.playerName}</div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>{format(parseISO(res.dateOfReservation), 'PPP', { locale: arSA })}</span>
                    {slotRange && <span>• {slotRange}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{res.totalAmount} ج.م</div>
                  <div className="flex flex-wrap gap-1">
                    {res.slots?.slice(0, 3).map((slot) => (
                      <span
                        key={slot}
                        className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs dark:bg-green-900/30 dark:text-green-300"
                      >
                        {slot}:00
                      </span>
                    ))}
                    {res.slots && res.slots.length > 3 && (
                      <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs dark:bg-gray-700 dark:text-gray-300">
                        +{res.slots.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    );
  };

  return (
    <>
      <div dir="rtl" className="w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {/* Page Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    حجوزات الساحات
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    إدارة وعرض الحجوزات بطريقة مرنة ومخصصة
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportToCSV}
                  disabled={reservations.length === 0}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">تصدير</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
              {/* Filters and Search */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الملاعب</label>
                    <select
                      value={selectedArena}
                      onChange={(e) => setSelectedArena(e.target.value)}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {arenas.map((arena) => (
                        <option key={arena.id} value={arena.id}>
                          {arena.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">من تاريخ</label>
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
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">إلى تاريخ</label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate}
                      max={endDateMax}
                      onChange={(e) => {
                        const nextEnd = clampRange(parseISO(startDate), parseISO(e.target.value));
                        setEndDate(format(nextEnd, 'yyyy-MM-dd'));
                      }}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن حجز (اسم اللاعب، التاريخ، المبلغ)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-10 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Action Buttons and Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => fetchReservations()}
                  disabled={!selectedArena || loading}
                  className="inline-flex items-center justify-center px-3 sm:px-5 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white text-xs sm:text-sm font-semibold hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جارٍ التحميل...' : 'تحديث الحجوزات'}
                </button>
                <button
                  onClick={handleWeekFetch}
                  disabled={!selectedArena || loading}
                  className="inline-flex items-center justify-center px-3 sm:px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-emerald-200 text-xs sm:text-sm font-semibold hover:from-emerald-200 hover:to-teal-200 dark:hover:from-emerald-800 dark:hover:to-teal-800 transition-all duration-300 border border-emerald-200 dark:border-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : <span className="hidden sm:inline">جلب حجوزات الأسبوع</span>}
                  {loading ? '...' : <span className="sm:hidden">الأسبوع</span>}
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${
                      viewMode === 'calendar'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Orientation Toggle */}
                {viewMode === 'calendar' && (
                  <button
                    onClick={() => setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal')}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                    title={orientation === 'horizontal' ? 'تبديل إلى الوضع العمودي' : 'تبديل إلى الوضع الأفقي'}
                  >
                    {orientation === 'horizontal' ? (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        <span className="hidden sm:inline">عمودي</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-4 h-4" />
                        <span className="hidden sm:inline">أفقي</span>
                      </>
                    )}
                  </button>
                )}

                {/* Settings Button */}
                {viewMode === 'calendar' && (
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                      showSettings
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">إعدادات</span>
                  </button>
                )}

                {error && (
                  <span className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-red-200 dark:border-red-800">
                    {error}
                  </span>
                )}
              </div>

              {/* Settings Panel */}
              {showSettings && viewMode === 'calendar' && (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        مدة الخانة (ساعات)
                      </label>
                      <select
                        value={slotDuration}
                        onChange={(e) => setSlotDuration(Number(e.target.value))}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value={1}>1 ساعة</option>
                        <option value={2}>2 ساعة</option>
                        <option value={3}>3 ساعات</option>
                        <option value={4}>4 ساعات</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        ساعة البداية
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={startHour}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(23, Number(e.target.value)));
                          setStartHour(val);
                          if (val >= endHour) setEndHour(Math.min(23, val + 1));
                        }}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        ساعة النهاية
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={endHour}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(23, Number(e.target.value)));
                          setEndHour(val);
                          if (val <= startHour) setStartHour(Math.max(0, val - 1));
                        }}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setStartHour(0);
                          setEndHour(23);
                          setSlotDuration(1);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        إعادة تعيين
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700 font-medium">
                  • توجد حجوزات
                </span>
                <span className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium">
                  • متاح
                </span>
                <span className="text-gray-500 dark:text-gray-400">إجمالي الحجوزات: {reservations.length}</span>
              </div>

              {/* Calendar or List View */}
              {viewMode === 'calendar' ? renderCalendarView() : renderListView()}

              {/* Selected day details */}
              {selectedDay && viewMode === 'calendar' && (
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                    التفاصيل ليوم {format(selectedDay, 'PPP', { locale: arSA })}
                  </div>
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
                            className="w-full text-right rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4 flex flex-col gap-2 hover:border-green-300 dark:hover:border-green-500 transition-colors"
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
                      },
                    )}
                    {(reservations.filter((r) => r.dateOfReservation === format(selectedDay, 'yyyy-MM-dd')) || [])
                      .length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد حجوزات في هذا اليوم.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {details && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setDetails(null)}
        >
          <div
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              onClick={() => setDetails(null)}
            >
              <X className="w-5 h-5" />
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
                      {format(parseISO(details.dateOfReservation), 'PPP', {
                        locale: arSA,
                      })}
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
                      <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                        {details.totalAmount} ج.م
                      </div>
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
