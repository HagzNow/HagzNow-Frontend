import React, { useState, useEffect, useCallback } from 'react'
import UserArenaFilter from '../../components/UserArenaFilter/UserArenaFilter'
import ArenasList from '../../components/UserArenasList/ArenasList'
import Pagination from '../../components/Pagination/Pagination'
import { arenaService } from '../../services/arenaService'

export default function UserArenas() {
    const [currentPage, setCurrentPage] = useState(1);
    const [arenas, setArenas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        categoryId: '',
        location: '',
        sport: '',
        minPrice: '',
        maxPrice: '',
    });

    const fetchArenas = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await arenaService.getArenas({
                page: currentPage,
                limit: 12, // Show 12 arenas per page (3 rows x 4 columns)
                ...filters,
            });

            setArenas(response.data);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError(err.message || 'فشل في تحميل الملاعب');
            console.error('Error fetching arenas:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters]);

    // Fetch arenas when page or filters change
    useEffect(() => {
        fetchArenas();
    }, [fetchArenas]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <UserArenaFilter onFilterChange={handleFilterChange} />

            {/* Error State */}
            {error && !loading && (
                <div className="mx-10 my-10 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    <p className="font-semibold">حدث خطأ</p>
                    <p>{error}</p>
                    <button
                        onClick={fetchArenas}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            )}

            {/* Arenas List with Loading and Empty States */}
            <ArenasList arenas={arenas} loading={loading} />

            {/* Pagination */}
            {!loading && !error && arenas.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}
