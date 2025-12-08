import React, { useState, useEffect, useCallback } from 'react'
import AdminArenaFilter from '../../components/AdminArenaFilter/AdminArenaFilter'
import AdminArenasReqsList from '../../components/AdminArenasReqsList/AdminArenasReqsList'
import Pagination from '../../components/Pagination/Pagination'
import { arenaService } from '../../services/arenaService'

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Hero */}
            <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-700 dark:via-emerald-700 dark:to-teal-700 text-white py-10 sm:py-14 md:py-16">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-md text-center">
                        مراجعة طلبات الملاعب
                    </h1>
                    {total > 0 && (
                        <p className="text-white/90 text-center mt-3">
                            إجمالي الطلبات: <span className="font-semibold">{total}</span> | الصفحة <span className="font-semibold">{currentPage}</span> من <span className="font-semibold">{totalPages}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <AdminArenaFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Error State */}
                {error && !loading && (
                    <div className="max-w-2xl mx-auto my-8">
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6 shadow-md dark:shadow-gray-900/50">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="mr-3 flex-1">
                                    <h3 className="text-red-800 dark:text-red-300 font-bold text-lg mb-2">حدث خطأ</h3>
                                    <p className="text-red-700 dark:text-red-300">{error}</p>
                                    <button
                                        onClick={() => fetchArenaRequests(currentPage, categoryId, searchName)}
                                        className="mt-4 px-6 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                                    >
                                        إعادة المحاولة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* List */}
                <AdminArenasReqsList
                    arenaRequests={arenaRequests}
                    loading={loading}
                    onRefresh={() => fetchArenaRequests(currentPage, categoryId, searchName)}
                />

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <div className="mt-12">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
