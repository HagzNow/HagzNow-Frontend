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
  startOfMonth,
  endOfMonth,
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
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  Printer,
  MoreVertical,
  Copy,
  Share2,
  FileText,
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
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'confirmed', 'pending', 'paid', 'canceled', 'completed'
  const [activeDatePreset, setActiveDatePreset] = useState(null);
  const [showRevenueSummary, setShowRevenueSummary] = useState(true);
  const [showDensityHeatmap, setShowDensityHeatmap] = useState(false);

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

  // Merge consecutive slots into ranges
  const mergeConsecutiveSlots = (slots) => {
    if (!slots || slots.length === 0) return [];

    const sorted = [...slots].sort((a, b) => a - b);
    const ranges = [];
    let start = sorted[0];
    let end = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === end + 1) {
        // Consecutive, extend the range
        end = sorted[i];
      } else {
        // Not consecutive, save current range and start new one
        ranges.push([start, end]);
        start = sorted[i];
        end = sorted[i];
      }
    }
    // Don't forget the last range
    ranges.push([start, end]);

    return ranges;
  };

  // Format merged slots as string
  const formatMergedSlots = (slots) => {
    const ranges = mergeConsecutiveSlots(slots);
    return ranges
      .map(([start, end]) => {
        if (start === end) {
          return `${start}:00 - ${start + 1}:00`;
        }
        return `${start}:00 - ${end + 1}:00`;
      })
      .join(', ');
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

  // Map reservations by day/slot with span information for merging consecutive cells
  const reservationsByDaySlot = useMemo(() => {
    const map = new Map();
    const reservationSpans = new Map(); // Track spans for each reservation
    const cellsToSkip = new Set(); // Track cells that should be skipped (part of spans)

    reservations.forEach((r) => {
      const dayKey = r.dateOfReservation;

      // Get consecutive slot ranges for this reservation
      const mergedRanges = mergeConsecutiveSlots(r.slots || []);

      mergedRanges.forEach(([startHour, endHour]) => {
        // Find which time slots this range covers
        const coveredSlots = [];
        for (let hour = startHour; hour <= endHour; hour++) {
          const slot = timeSlots.find((s) => hour >= s.start && hour < s.end);
          if (slot && !coveredSlots.find((s) => s.start === slot.start)) {
            coveredSlots.push(slot);
          }
        }

        if (coveredSlots.length > 0) {
          // Sort slots by start time
          coveredSlots.sort((a, b) => a.start - b.start);
          const firstSlot = coveredSlots[0];

          // Calculate span based on actual hours, not just number of slots
          // This ensures that a 1-hour reservation and 4-hour reservation show different sizes
          const actualHours = endHour - startHour + 1;

          // For vertical orientation: span is based on time slots (columns)
          // For horizontal orientation: span is based on time slots (rows)
          const verticalSpan = coveredSlots.length; // Number of time slot columns
          const horizontalSpan = coveredSlots.length; // Number of time slot rows

          // Mark cells to skip (all except the first one)
          for (let i = 1; i < coveredSlots.length; i++) {
            // For vertical: skip columns (time slots)
            const skipKeyVertical = `${dayKey}-${coveredSlots[i].start}`;
            cellsToSkip.add(skipKeyVertical);

            // For horizontal: skip rows (time slots) - need to mark all days for this slot
            rangeDays.forEach((day) => {
              const dayKeyForSkip = format(day, 'yyyy-MM-dd');
              if (dayKeyForSkip === dayKey) {
                const skipKeyHorizontal = `${dayKeyForSkip}-${coveredSlots[i].start}`;
                cellsToSkip.add(skipKeyHorizontal);
              }
            });
          }

          // Store span information
          const spanKey = `${dayKey}-${firstSlot.start}-${r.id}-${startHour}-${endHour}`;
          reservationSpans.set(spanKey, {
            reservation: r,
            span: verticalSpan, // For vertical orientation
            horizontalSpan: horizontalSpan, // For horizontal orientation
            startSlot: firstSlot.start,
            slotRange: `${startHour}:00 - ${endHour + 1}:00`,
            actualHours,
          });

          // Only add to the first slot cell
          const key = `${dayKey}-${firstSlot.start}`;
          if (!map.has(key)) map.set(key, []);
          // Check if this reservation is already added for this range (avoid duplicates)
          const existingIndex = map
            .get(key)
            .findIndex((existing) => existing.id === r.id && existing.spanKey === spanKey);
          if (existingIndex === -1) {
            map.get(key).push({
              ...r,
              spanKey,
              span: verticalSpan,
              horizontalSpan: horizontalSpan,
              startSlot: firstSlot.start,
              actualHours,
            });
          }
        }
      });
    });

    return { cellMap: map, spans: reservationSpans, cellsToSkip };
  }, [reservations, timeSlots, slotDuration, rangeDays]);

  // Filter reservations by search query and status
  const filteredReservations = useMemo(() => {
    let filtered = reservations;

    // Apply status filter (when API supports it)
    if (statusFilter !== 'all' && reservations.length > 0) {
      // Note: Current API doesn't return status, but prepare for future
      // filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.playerName?.toLowerCase().includes(query) ||
          r.dateOfReservation?.includes(query) ||
          r.totalAmount?.toString().includes(query),
      );
    }

    return filtered;
  }, [reservations, searchQuery, statusFilter]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalReservations = filteredReservations.length;
    const totalRevenue = filteredReservations.reduce((sum, r) => sum + parseFloat(r.totalAmount || 0), 0);
    const averageRevenue = totalReservations > 0 ? totalRevenue / totalReservations : 0;

    // Upcoming reservations (today and future)
    const todayStr = format(startOfDay(new Date()), 'yyyy-MM-dd');
    const upcomingCount = filteredReservations.filter((r) => r.dateOfReservation >= todayStr).length;

    // Most booked day
    const dayCounts = new Map();
    filteredReservations.forEach((r) => {
      const count = dayCounts.get(r.dateOfReservation) || 0;
      dayCounts.set(r.dateOfReservation, count + 1);
    });
    let mostBookedDay = null;
    let maxCount = 0;
    dayCounts.forEach((count, date) => {
      if (count > maxCount) {
        maxCount = count;
        mostBookedDay = date;
      }
    });

    // Peak hours
    const hourCounts = new Map();
    filteredReservations.forEach((r) => {
      (r.slots || []).forEach((hour) => {
        const count = hourCounts.get(hour) || 0;
        hourCounts.set(hour, count + 1);
      });
    });
    let peakHour = null;
    let maxHourCount = 0;
    hourCounts.forEach((count, hour) => {
      if (count > maxHourCount) {
        maxHourCount = count;
        peakHour = hour;
      }
    });

    return {
      totalReservations,
      totalRevenue,
      averageRevenue,
      upcomingCount,
      mostBookedDay,
      peakHour: peakHour !== null ? `${peakHour}:00` : null,
    };
  }, [filteredReservations]);

  // Reservation counts per day
  const reservationsByDay = useMemo(() => {
    const map = new Map();
    filteredReservations.forEach((r) => {
      const count = map.get(r.dateOfReservation) || 0;
      map.set(r.dateOfReservation, count + 1);
    });
    return map;
  }, [filteredReservations]);

  // Get status color helper (for future use when API supports status)
  // const getStatusColor = (status) => {
  //   const colors = {
  //     confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700',
  //     pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  //     paid: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  //     canceled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700',
  //     completed: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  //   };
  //   return colors[status] || colors.confirmed;
  // };

  // Get density color for day
  const getDensityColor = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-700';
    if (count <= 2) return 'bg-green-100 dark:bg-green-900/30';
    if (count <= 5) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-orange-100 dark:bg-orange-900/30';
  };

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

  // Date preset handlers
  const handleDatePreset = (preset) => {
    const today = startOfDay(new Date());
    let start, end;

    switch (preset) {
      case 'today': {
        start = format(today, 'yyyy-MM-dd');
        end = format(today, 'yyyy-MM-dd');
        break;
      }
      case 'tomorrow': {
        const tomorrow = addDays(today, 1);
        start = format(tomorrow, 'yyyy-MM-dd');
        end = format(tomorrow, 'yyyy-MM-dd');
        break;
      }
      case 'thisWeek': {
        start = format(startOfWeek(today, { weekStartsOn: 0 }), 'yyyy-MM-dd');
        end = format(endOfWeek(today, { weekStartsOn: 0 }), 'yyyy-MM-dd');
        break;
      }
      case 'nextWeek': {
        const nextWeekStart = addDays(startOfWeek(today, { weekStartsOn: 0 }), 7);
        start = format(nextWeekStart, 'yyyy-MM-dd');
        end = format(endOfWeek(nextWeekStart, { weekStartsOn: 0 }), 'yyyy-MM-dd');
        break;
      }
      case 'thisMonth': {
        start = format(startOfMonth(today), 'yyyy-MM-dd');
        end = format(endOfMonth(today), 'yyyy-MM-dd');
        break;
      }
      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
    setActiveDatePreset(preset);
    fetchReservations({ startDate: start, endDate: end });
  };

  // Date navigation handlers
  const navigateDateRange = (direction) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const diff = differenceInCalendarDays(end, start);

    let newStart;
    let newEnd;
    if (direction === 'prev') {
      newStart = subDays(start, diff + 1);
      newEnd = subDays(start, 1);
    } else {
      newStart = addDays(end, 1);
      newEnd = addDays(end, diff + 1);
    }

    const newStartStr = format(newStart, 'yyyy-MM-dd');
    const newEndStr = format(newEnd, 'yyyy-MM-dd');

    setStartDate(newStartStr);
    setEndDate(newEndStr);
    setActiveDatePreset(null);
    fetchReservations({ startDate: newStartStr, endDate: newEndStr });
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Copy reservation info
  const copyReservationInfo = (reservation) => {
    const slotRange = formatMergedSlots(reservation.slots || []);
    const info = `الحجز: ${reservation.playerName}\nالتاريخ: ${reservation.dateOfReservation}\nالوقت: ${slotRange}\nالمبلغ: ${reservation.totalAmount} ج.م`;
    navigator.clipboard.writeText(info);
  };

  // Constrain range to max 7 days
  const clampRange = (start, end) => {
    const diff = differenceInCalendarDays(end, start);
    if (diff > 6) return addDays(start, 6);
    return end;
  };

  const endDateMax = useMemo(() => {
    if (!startDate) return '';
    return format(addDays(parseISO(startDate), 6), 'yyyy-MM-dd');
  }, [startDate]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['التاريخ', 'اسم اللاعب', 'الأوقات', 'المبلغ الإجمالي'];
    const rows = reservations.map((r) => {
      const slotRange = formatMergedSlots(r.slots || []) || '-';
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
      // Vertical: Time on top (horizontal), Days on right (vertical)
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
                  gridTemplateRows: `80px repeat(${rangeDays.length || 1}, minmax(80px, auto))`,
                  gridTemplateColumns: `120px repeat(${timeSlots.length || 1}, minmax(100px, 1fr))`,
                }}
              >
                {/* Empty corner */}
                <div className="bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700"></div>
                {/* Time slot headers at top */}
                {timeSlots.map((slot) => (
                  <div
                    key={`time-header-${slot.start}`}
                    className="bg-gray-50 dark:bg-gray-900/60 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-center border-r border-b border-gray-200 dark:border-gray-700 px-2 py-2"
                  >
                    <div className="text-center">
                      <div className="font-semibold text-sm">{slot.start.toString().padStart(2, '0')}:00</div>
                      <div className="text-[10px] text-gray-400">- {slot.end.toString().padStart(2, '0')}:00</div>
                    </div>
                  </div>
                ))}
                {/* Day rows */}
                {rangeDays.map((day) => {
                  const dayKey = format(day, 'yyyy-MM-dd');
                  const count = reservationsByDay.get(dayKey) || 0;
                  return (
                    <>
                      {/* Day header */}
                      <div
                        key={`day-header-${day.toISOString()}`}
                        className={`bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 text-center py-2 px-2 ${
                          showDensityHeatmap ? getDensityColor(count) : ''
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                          {format(day, 'EEEE', { locale: arSA })}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{format(day, 'd')}</div>
                          {count > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500 text-white dark:bg-green-600 font-medium">
                              {count}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400 dark:text-gray-500">
                          {format(day, 'MMM', { locale: arSA })}
                        </div>
                      </div>
                      {/* Time slot cells for this day */}
                      {timeSlots.map((slot) => {
                        const key = `${dayKey}-${slot.start}`;
                        const slotReservations = reservationsByDaySlot.cellMap.get(key) || [];
                        const booked = slotReservations.length > 0;

                        // Skip this cell if it's part of a merged span (but not the start)
                        if (reservationsByDaySlot.cellsToSkip.has(key)) {
                          return null;
                        }

                        // Calculate span based on actual hours for vertical orientation
                        const spanInfo = slotReservations[0]
                          ? reservationsByDaySlot.spans.get(slotReservations[0].spanKey)
                          : null;
                        const cellSpan = spanInfo
                          ? Math.max(1, Math.ceil(spanInfo.actualHours / slotDuration))
                          : slotReservations[0]?.span || 1;

                        return (
                          <div
                            key={key}
                            className={`min-h-[80px] px-2 py-2 border-r border-b border-gray-200 dark:border-gray-700 ${
                              booked ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-white dark:bg-gray-800'
                            }`}
                            style={
                              booked && cellSpan > 1
                                ? {
                                    gridColumn: `span ${cellSpan}`,
                                  }
                                : {}
                            }
                            onClick={() => setSelectedDay(day)}
                          >
                            {booked ? (
                              <div className="space-y-1">
                                {slotReservations.map((r) => {
                                  const spanInfo = reservationsByDaySlot.spans.get(r.spanKey);
                                  const slotRange =
                                    spanInfo?.slotRange || formatMergedSlots(r.slots || []) || `${slot.start}:00`;
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
                  );
                })}
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
                {rangeDays.map((day) => {
                  const dayKey = format(day, 'yyyy-MM-dd');
                  const count = reservationsByDay.get(dayKey) || 0;
                  return (
                    <div
                      key={day.toISOString()}
                      className={`bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 text-center py-2 px-2 ${
                        showDensityHeatmap ? getDensityColor(count) : ''
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        {format(day, 'EEEE', { locale: arSA })}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{format(day, 'd')}</div>
                        {count > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500 text-white dark:bg-green-600 font-medium">
                            {count}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500">
                        {format(day, 'MMM', { locale: arSA })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Time slots rows */}
              {timeSlots.map((slot) => {
                // Check if this row should be skipped (part of a merged span)
                const shouldSkipRow = rangeDays.some((day) => {
                  const dayKey = format(day, 'yyyy-MM-dd');
                  const key = `${dayKey}-${slot.start}`;
                  return reservationsByDaySlot.cellsToSkip.has(key);
                });

                if (shouldSkipRow) {
                  return null;
                }

                return (
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
                      const slotReservations = reservationsByDaySlot.cellMap.get(key) || [];
                      const booked = slotReservations.length > 0;

                      // Skip this cell if it's part of a merged span (but not the start)
                      if (reservationsByDaySlot.cellsToSkip.has(key)) {
                        return null;
                      }

                      // Calculate span based on actual hours for horizontal orientation
                      const spanInfo = slotReservations[0]
                        ? reservationsByDaySlot.spans.get(slotReservations[0].spanKey)
                        : null;
                      const actualHours = spanInfo?.actualHours || slotReservations[0]?.actualHours || slotDuration;
                      const cellHeight = Math.max(80, (actualHours / slotDuration) * 80);

                      return (
                        <div
                          key={key}
                          className={`px-2 py-2 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center ${
                            booked ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-white dark:bg-gray-800'
                          }`}
                          style={{
                            minHeight: `${cellHeight}px`,
                          }}
                          onClick={() => setSelectedDay(day)}
                        >
                          {booked ? (
                            <div className="space-y-1 w-full">
                              {slotReservations.map((r) => {
                                const spanInfo = reservationsByDaySlot.spans.get(r.spanKey);
                                const slotRange =
                                  spanInfo?.slotRange || formatMergedSlots(r.slots || []) || `${slot.start}:00`;
                                return (
                                  <div key={r.id} className="relative group">
                                    <button
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
                                    <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          copyReservationInfo(r);
                                        }}
                                        className="p-1 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        title="نسخ معلومات الحجز"
                                      >
                                        <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                      </button>
                                    </div>
                                  </div>
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
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  // Render list view
  const renderListView = () => {
    const hasSearchOrFilter = searchQuery.trim() || statusFilter !== 'all';
    const isEmpty = filteredReservations.length === 0;
    const hasReservations = reservations.length > 0;

    return (
      <div className="space-y-3">
        {isEmpty ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {hasSearchOrFilter && hasReservations ? 'لا توجد نتائج مطابقة للبحث' : 'لا توجد حجوزات'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {hasSearchOrFilter && hasReservations
                ? 'جرب تغيير معايير البحث أو الفلترة'
                : 'لا توجد حجوزات في الفترة المحددة. جرب تغيير التاريخ أو اختيار ملعب آخر.'}
            </p>
            {hasSearchOrFilter && hasReservations && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm"
              >
                مسح الفلاتر
              </button>
            )}
          </div>
        ) : (
          filteredReservations.map((res) => {
            const slotRange = formatMergedSlots(res.slots || []);
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

  // Loading skeleton component
  const LoadingSkeleton = ({ className = '' }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-after: always;
          }
          body {
            background: white !important;
          }
          .dark {
            color: black !important;
            background: white !important;
          }
        }
        
        /* Mobile scroll improvements */
        @media (max-width: 768px) {
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            height: 8px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-track {
            background: rgba(243, 244, 246, 0.5);
            border-radius: 4px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.7);
            border-radius: 4px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.8);
          }
          
          .dark .overflow-x-auto::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.5);
          }
          
          .dark .overflow-x-auto::-webkit-scrollbar-thumb {
            background: rgba(75, 85, 99, 0.7);
          }
          
          .dark .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.9);
          }
        }
      `,
        }}
      />
      <div dir="rtl" className="w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {/* Page Header */}
          <div className="mb-4 sm:mb-6 no-print">
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
                  onClick={handlePrint}
                  disabled={reservations.length === 0}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">طباعة</span>
                </button>
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

          {/* Statistics Dashboard */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-20 sm:h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-3 sm:p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {statistics.totalReservations}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">إجمالي الحجوزات</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-3 sm:p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {statistics.totalRevenue.toFixed(2)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">إجمالي الإيرادات</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-3 sm:p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {statistics.averageRevenue.toFixed(2)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">متوسط الحجز</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-3 sm:p-4 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {statistics.upcomingCount}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">حجوزات قادمة</div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl p-3 sm:p-4 border border-teal-200 dark:border-teal-800">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {statistics.mostBookedDay ? format(parseISO(statistics.mostBookedDay), 'd', { locale: arSA }) : '-'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">أكثر يوم حجز</div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-3 sm:p-4 border border-pink-200 dark:border-pink-800">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {statistics.peakHour || '-'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">ساعة الذروة</div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow dark:shadow-gray-900/50 p-3 sm:p-4 lg:p-6">
            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <LoadingSkeleton key={i} className="h-12" />
                  ))}
                </div>
                <LoadingSkeleton className="h-10 w-full" />
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <LoadingSkeleton key={i} className="h-64" />
                  ))}
                </div>
              </div>
            )}

            {!loading && (
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
                {/* Quick Date Presets */}
                <div className="flex flex-wrap items-center gap-2 no-print">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اختيار سريع:</span>
                  <button
                    onClick={() => handleDatePreset('today')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      activeDatePreset === 'today'
                        ? 'bg-green-600 text-white dark:bg-green-700'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    اليوم
                  </button>
                  <button
                    onClick={() => handleDatePreset('tomorrow')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      activeDatePreset === 'tomorrow'
                        ? 'bg-green-600 text-white dark:bg-green-700'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    غداً
                  </button>
                  <button
                    onClick={() => handleDatePreset('thisWeek')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      activeDatePreset === 'thisWeek'
                        ? 'bg-green-600 text-white dark:bg-green-700'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    هذا الأسبوع
                  </button>
                  <button
                    onClick={() => handleDatePreset('nextWeek')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      activeDatePreset === 'nextWeek'
                        ? 'bg-green-600 text-white dark:bg-green-700'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    الأسبوع القادم
                  </button>
                  <button
                    onClick={() => handleDatePreset('thisMonth')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      activeDatePreset === 'thisMonth'
                        ? 'bg-green-600 text-white dark:bg-green-700'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    هذا الشهر
                  </button>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الملاعب</label>
                      <select
                        value={selectedArena}
                        onChange={(e) => setSelectedArena(e.target.value)}
                        className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        من تاريخ
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateDateRange('prev')}
                          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          title="الفترة السابقة"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <input
                          type="date"
                          value={startDate}
                          max={endDateMax}
                          onChange={(e) => {
                            const nextStart = e.target.value;
                            const nextEnd = clampRange(parseISO(nextStart), parseISO(endDate));
                            setStartDate(nextStart);
                            setEndDate(format(nextEnd, 'yyyy-MM-dd'));
                            setActiveDatePreset(null);
                          }}
                          className="h-10 flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        إلى تاريخ
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={endDate}
                          min={startDate}
                          max={endDateMax}
                          onChange={(e) => {
                            const nextEnd = clampRange(parseISO(startDate), parseISO(e.target.value));
                            setEndDate(format(nextEnd, 'yyyy-MM-dd'));
                            setActiveDatePreset(null);
                          }}
                          className="h-10 flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                          onClick={() => navigateDateRange('next')}
                          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          title="الفترة القادمة"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
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
                      className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-10 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Action Buttons and Controls */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 no-print">
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
                  <div className="no-print">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                            مدة الخانة (ساعات)
                          </label>
                          <select
                            value={slotDuration}
                            onChange={(e) => setSlotDuration(Number(e.target.value))}
                            className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  </div>
                )}

                {/* Revenue Summary Panel */}
                {showRevenueSummary && !loading && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ملخص الإيرادات
                      </h3>
                      <button
                        onClick={() => setShowRevenueSummary(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">إجمالي الإيرادات</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                          {statistics.totalRevenue.toFixed(2)} ج.م
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">عدد الحجوزات</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {statistics.totalReservations}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">متوسط الحجز</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {statistics.averageRevenue.toFixed(2)} ج.م
                        </div>
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
                  {viewMode === 'calendar' && (
                    <button
                      onClick={() => setShowDensityHeatmap(!showDensityHeatmap)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border font-medium transition-colors ${
                        showDensityHeatmap
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-700'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      خريطة الكثافة
                    </button>
                  )}
                  {!showRevenueSummary && (
                    <button
                      onClick={() => setShowRevenueSummary(true)}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      عرض الملخص
                    </button>
                  )}
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
                      {(
                        reservations.filter((r) => r.dateOfReservation === format(selectedDay, 'yyyy-MM-dd')) || []
                      ).map((res) => {
                        const slotRange = formatMergedSlots(res.slots || []);
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
                      })}
                      {(reservations.filter((r) => r.dateOfReservation === format(selectedDay, 'yyyy-MM-dd')) || [])
                        .length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد حجوزات في هذا اليوم.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
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
