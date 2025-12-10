import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import OwnerArenaFilter from '../../components/OwnerComponents/OwnerArenaFilter/OwnerArenaFilter';
import OwnerArenasList from '../../components/OwnerComponents/OwnerArenasList/OwnerArenasList';
import Pagination from '../../components/Pagination/Pagination';
import { arenaService } from '../../services/arenaService';

export default function OwnerArenas() {
  const navigate = useNavigate();
  const [arenas, setArenas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [searchName, setSearchName] = useState('');
  const itemsPerPage = 12;

  const fetchOwnerArenas = useCallback(async (page, categoryFilter, nameFilter) => {
    setLoading(true);
    setError(null);

    try {
      const response = await arenaService.getOwnerArenas({
        page: page,
        limit: itemsPerPage,
        categoryId: categoryFilter,
        name: nameFilter,
      });

      setArenas(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      setError(err.message || 'فشل في تحميل الملاعب');
      console.error('Error fetching owner arenas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOwnerArenas(currentPage, categoryId, searchName);
  }, [currentPage, categoryId, searchName, fetchOwnerArenas]);

  const handleFilterChange = useCallback((newFilters) => {
    setCategoryId(newFilters.categoryId);
    setSearchName(newFilters.name);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Dashboard Header with Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm -m-3 sm:-m-4 md:-m-6 mb-4 sm:mb-6 rounded-t-2xl">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white">إدارة الملاعب</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
                {total > 0 ? (
                  <>
                    إجمالي الملاعب: <span className="font-semibold text-green-600 dark:text-green-400">{total}</span>
                    {' | '}
                    الصفحة <span className="font-semibold">{currentPage}</span> من{' '}
                    <span className="font-semibold">{totalPages}</span>
                  </>
                ) : (
                  'لا توجد ملاعب حتى الآن'
                )}
              </p>
            </div>
            <div className="flex-1 lg:max-w-2xl">
              <OwnerArenaFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => navigate('/owner/add-arena')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-md hover:shadow-lg whitespace-nowrap text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">إضافة ملعب جديد</span>
                <span className="sm:hidden">إضافة</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto my-8">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6 shadow-md dark:shadow-gray-900/50">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-500 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="mr-3 flex-1">
                  <h3 className="text-red-800 dark:text-red-300 font-bold text-lg mb-2">حدث خطأ</h3>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                  <button
                    onClick={() => fetchOwnerArenas(currentPage, categoryId, searchName)}
                    className="mt-4 px-6 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Arenas List */}
        <OwnerArenasList arenas={arenas} loading={loading} />

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-12">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
