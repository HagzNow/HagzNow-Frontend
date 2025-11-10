import React, { useState, useEffect } from 'react'
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
    const itemsPerPage = 12;

    const fetchArenaRequests = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await arenaService.getArenaRequests({
                page: page,
                limit: itemsPerPage,
            });

            console.log('Full response:', response);
            console.log('Response data:', response.data);
            console.log('Is array?', Array.isArray(response.data));
            console.log('Setting states - page:', response.page, 'totalPages:', response.totalPages, 'total:', response.total);

            setArenaRequests(response.data);
            console.log('After setting arenaRequests:', response.data);
            setCurrentPage(response.page);
            setTotalPages(response.totalPages);
            setTotal(response.total);
            
            console.log('State should now be - arenaRequests:', response.data, 'currentPage:', response.page, 'totalPages:', response.totalPages);
        } catch (err) {
            setError(err.message || 'فشل في تحميل طلبات الملاعب');
            console.error('Error fetching arena requests:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArenaRequests(currentPage);
    }, [currentPage]); // Remove fetchArenaRequests from dependencies

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Title */}
            <div className="text-center py-4 sm:py-6 px-4">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                    مراجعة وإدارة طلبات الساحة الجديدة المقدمة من الملاكين
                </h1>
                {total > 0 && (
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                        إجمالي الطلبات: {total} | الصفحة {currentPage} من {totalPages}
                    </p>
                )}
            </div>
            <hr />

            {/* Filter */}
            {/* <AdminArenaFilter /> */}

            {/* Error State */}
            {error && !loading && (
                <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 my-6 sm:my-8 md:my-10 p-4 sm:p-5 md:p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    <p className="font-semibold text-sm sm:text-base md:text-lg">حدث خطأ</p>
                    <p className="text-sm sm:text-base mt-1">{error}</p>
                    <button
                        onClick={() => fetchArenaRequests(currentPage)}
                        className="mt-3 sm:mt-4 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            )}

            {/* Arenas List */}
            <AdminArenasReqsList
                arenaRequests={arenaRequests}
                loading={loading}
                onRefresh={() => fetchArenaRequests(currentPage)}
            />

            {/* Pagination */}
            {console.log('Pagination check - loading:', loading, 'error:', error, 'totalPages:', totalPages, 'Show pagination?', !loading && !error && totalPages > 1)}
            {!loading && !error && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}
