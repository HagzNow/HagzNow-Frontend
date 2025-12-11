import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  Coins,
  CreditCard,
  Globe2,
  ShieldCheck,
  Users2,
  Wallet2,
} from 'lucide-react';
import { useMemo } from 'react';

export default function AdminDashboard() {
  const stats = useMemo(
    () => [
      { label: 'إجمالي الإيرادات', value: '1,240,000 ر.س', delta: '+12.4%', icon: Coins, tone: 'success' },
      { label: 'الحجوزات النشطة', value: '8,312', delta: '+4.1%', icon: CalendarCheck, tone: 'info' },
      { label: 'أرصدة المحافظ', value: '326,500 ر.س', delta: '-1.8%', icon: Wallet2, tone: 'warn' },
      { label: 'شكاوى مفتوحة', value: '18', delta: '-12%', icon: ShieldCheck, tone: 'success' },
    ],
    []
  );

  const revenueByChannel = useMemo(
    () => [
      { channel: 'التطبيق', amount: '720,000', share: 58 },
      { channel: 'الويب', amount: '410,000', share: 33 },
      { channel: 'الحجوزات اليدوية', amount: '110,000', share: 9 },
    ],
    []
  );

  const arenaPerformance = useMemo(
    () => [
      { title: 'ساحة 01', occupancy: 92, bookings: 432, revenue: '84,200' },
      { title: 'ساحة 02', occupancy: 87, bookings: 389, revenue: '73,400' },
      { title: 'ساحة 03', occupancy: 79, bookings: 341, revenue: '64,900' },
      { title: 'ساحة 04', occupancy: 76, bookings: 315, revenue: '58,100' },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      { title: 'تمت الموافقة على 12 طلب سحب', time: 'قبل 12 دقيقة', tone: 'positive' },
      { title: 'إضافة 3 ساحات جديدة للمالكين', time: 'قبل 1 ساعة', tone: 'neutral' },
      { title: 'تحديث سياسات الأمان والدفع', time: 'قبل 3 ساعات', tone: 'neutral' },
      { title: 'إغلاق 7 شكاوى بعد المعالجة', time: 'قبل 5 ساعات', tone: 'positive' },
      { title: 'تنبيه: ارتفاع الإلغاءات في فترة الذروة', time: 'قبل 7 ساعات', tone: 'alert' },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Top KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const toneClass =
            item.tone === 'success'
              ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30'
              : item.tone === 'warn'
              ? 'text-amber-600 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30'
              : 'text-sky-600 bg-sky-50 dark:text-sky-300 dark:bg-sky-900/30';

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-gray-900/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-neutral-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{item.value}</p>
                </div>
                <span className={`p-2 rounded-xl ${toneClass}`}>
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                {item.delta.startsWith('-') ? (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                )}
                <span
                  className={item.delta.startsWith('-') ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}
                >
                  {item.delta}
                </span>
                <span className="text-neutral-500 dark:text-gray-400">آخر 30 يوم</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue + activity */}
      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">تدفق الإيرادات</h2>
              <p className="text-sm text-neutral-500 dark:text-gray-400">
                تمثيل بصري للأشهر الستة الأخيرة (بيانات تجريبية)
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <BarChart3 className="w-4 h-4" />
              تحديث يومي
            </span>
          </div>

          <div className="grid grid-cols-12 gap-3 items-end h-64">
            {[42, 56, 61, 78, 65, 88].map((v, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300 dark:from-emerald-700 dark:via-emerald-600 dark:to-emerald-500 shadow-inner"
                  style={{ height: `${v + 20}px`, minHeight: '60px' }}
                />
                <span className="text-xs text-neutral-500 dark:text-gray-400">م {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">الأنشطة السريعة</h3>
            <span className="text-xs text-neutral-500 dark:text-gray-400">آخر 24 ساعة</span>
          </div>
          <div className="space-y-3">
            {timeline.map((item, idx) => {
              const tone =
                item.tone === 'positive'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : item.tone === 'alert'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                  : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-neutral-100 dark:border-gray-700 bg-neutral-50/50 dark:bg-gray-900/40 p-3"
                >
                  <span className={`mt-0.5 px-2 py-1 text-[11px] rounded-lg ${tone}`}>{item.time}</span>
                  <p className="text-sm text-neutral-800 dark:text-gray-200 leading-6">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Middle grid: channels + bookings + risk */}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">توزيع الإيرادات</h3>
            <CreditCard className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-4">
            {revenueByChannel.map((row) => (
              <div key={row.channel}>
                <div className="flex justify-between text-sm text-neutral-600 dark:text-gray-300 mb-1">
                  <span>{row.channel}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{row.amount} ر.س</span>
                </div>
                <div className="h-2 bg-neutral-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: `${row.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">معدل الإشغال</h3>
            <Globe2 className="w-5 h-5 text-sky-500" />
          </div>
          <div className="space-y-3">
            {arenaPerformance.map((arena) => (
              <div
                key={arena.title}
                className="p-3 rounded-xl bg-neutral-50/70 dark:bg-gray-900/40 border border-neutral-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-neutral-900 dark:text-white">{arena.title}</p>
                  <span className="text-sm text-neutral-500 dark:text-gray-400">{arena.bookings} حجز</span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-neutral-600 dark:text-gray-300">الإشغال</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{arena.occupancy}%</span>
                </div>
                <div className="h-2 mt-2 bg-neutral-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-400"
                    style={{ width: `${arena.occupancy}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-neutral-500 dark:text-gray-400">الإيراد: {arena.revenue} ر.س</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">نظرة عامة على المخاطر</h3>
            <ShieldCheck className="w-5 h-5 text-amber-500" />
          </div>
          <ul className="space-y-3">
            {[
              { label: 'نسبة الإلغاء خلال 24 ساعة', value: '3.4%', tone: 'ok' },
              { label: 'إجمالي النزاعات المفتوحة', value: '5 قضايا', tone: 'warn' },
              { label: 'متوسط زمن معالجة الشكوى', value: '42 دقيقة', tone: 'ok' },
              { label: 'فشل عمليات الدفع آخر 24 ساعة', value: '0.6%', tone: 'ok' },
            ].map((row) => (
              <li
                key={row.label}
                className="p-3 rounded-xl bg-neutral-50/70 dark:bg-gray-900/40 border border-neutral-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700 dark:text-gray-200">{row.label}</span>
                  <span
                    className={`text-sm font-semibold ${
                      row.tone === 'warn'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">أهم مؤشرات العمليات</h3>
              <p className="text-sm text-neutral-500 dark:text-gray-400">بيانات تجريبية مضغوطة</p>
            </div>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'متوسط زمن الموافقة على السحب', value: '18 دقيقة' },
              { label: 'نسبة الإشغال في الذروة', value: '91%' },
              { label: 'حجوزات مكررة اليوم', value: '1,204' },
              { label: 'إجمالي الخصومات المفعلة', value: '64,300 ر.س' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="p-3 rounded-xl border border-neutral-100 dark:border-gray-700 bg-neutral-50/70 dark:bg-gray-900/40 flex items-center justify-between"
              >
                <p className="text-sm text-neutral-600 dark:text-gray-300">{kpi.label}</p>
                <p className="text-base font-semibold text-neutral-900 dark:text-white">{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm dark:shadow-gray-900/40">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">ملخص المستخدمين</h3>
            <Users2 className="w-5 h-5 text-sky-500" />
          </div>
          <div className="space-y-3">
            {[
              { label: 'المستخدمون النشطون هذا الأسبوع', value: '24,800', chip: '+6%' },
              { label: 'حسابات جديدة اليوم', value: '1,120', chip: '+2%' },
              { label: 'حسابات موقوفة', value: '84', chip: '-4%' },
            ].map((row) => (
              <div
                key={row.label}
                className="p-3 rounded-xl bg-neutral-50/70 dark:bg-gray-900/40 border border-neutral-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-600 dark:text-gray-300">{row.label}</p>
                  <span className="text-xs px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {row.chip}
                  </span>
                </div>
                <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
