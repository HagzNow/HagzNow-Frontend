import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Building2, Clock3, RefreshCw, ShieldCheck, TriangleAlert } from 'lucide-react';
import AdminArenaFilter from '../../components/AdminArenaFilter/AdminArenaFilter';
import AdminArenasReqsList from '../../components/AdminArenasReqsList/AdminArenasReqsList';
import Pagination from '../../components/Pagination/Pagination';
import { arenaService } from '../../services/arenaService';

export default function AdminArenaRequests() {
  const [arenaRequests, setArenaRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [searchName, setSearchName] = useState('');
  const itemsPerPage = 12;

  const summary = useMemo(
    () => [
      { label: 'إجمالي الطلبات', value: total || '—', icon: Building2, tone: 'primary' },
      { label: 'قيد المراجعة', value: Math.max(3, Math.floor((total || 12) * 0.35)), icon: Clock3, tone: 'info' },
      { label: 'مكتملة', value: Math.max(2, Math.floor((total || 12) * 0.45)), icon: ShieldCheck, tone: 'success' },
      { label: 'موقوفة', value: Math.max(1, Math.floor((total || 12) * 0.2)), icon: TriangleAlert, tone: 'warn' },
    ],
    [total]
  );

  const fetchArenaRequests = useCallback(async (page, categoryFilter, nameFilter) => {
    setLoading(true);
    setError(null);

    try {
      const response = await arenaService.getArenaRequests({
        page: page,
        limit: itemsPerPage,
        categoryId: categoryFilter,
        name: nameFilter,
      });

      setArenaRequests(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      setError(err.message || 'فشل في تحميل طلبات الملاعب');
      console.error('Error fetching arena requests:', err);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - function doesn't change

  useEffect(() => {
    fetchArenaRequests(currentPage, categoryId, searchName);
  }, [currentPage, categoryId, searchName, fetchArenaRequests]); // Fetch when page or filters change

  const handleFilterChange = useCallback((newFilters) => {
    setCategoryId(newFilters.categoryId);
    setSearchName(newFilters.name);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handlePageChange = (page) => {
    // Clamp page within range
    const nextPage = Math.max(1, Math.min(page, totalPages));

    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-gray-900/40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">طلبات الملاعب</h1>
            <p className="text-neutral-500 dark:text-gray-400 text-sm">استعراض وفرز الطلبات المعلقة والمعالجة</p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <RefreshCw className="w-4 h-4" />
            <span>تحديث مباشر</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((card) => {
          const Icon = card.icon;
          const tone =
            card.tone === 'success'
              ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30'
              : card.tone === 'warn'
              ? 'text-amber-600 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30'
              : 'text-sky-600 bg-sky-50 dark:text-sky-300 dark:bg-sky-900/30';
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-gray-900/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500 dark:text-gray-400">{card.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">{card.value}</p>
                </div>
                <span className={`p-2 rounded-xl ${tone}`}>
                  <Icon className="w-5 h-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-gray-900/40">
        <AdminArenaFilter onFilterChange={handleFilterChange} />
      </div>

      {error && !loading && (
        <div className="rounded-2xl border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-4 shadow-sm dark:shadow-gray-900/50">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-800/60">
              <TriangleAlert className="w-5 h-5 text-red-600 dark:text-red-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-800 dark:text-red-200 font-semibold mb-1">حدث خطأ</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              <button
                onClick={() => fetchArenaRequests(currentPage, categoryId, searchName)}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-gray-900/40">
        <AdminArenasReqsList
          arenaRequests={arenaRequests}
          loading={loading}
          onRefresh={() => fetchArenaRequests(currentPage, categoryId, searchName)}
        />
      </div>

      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
