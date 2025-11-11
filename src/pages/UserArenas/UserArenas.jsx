import React, { useState, useEffect, useCallback } from 'react'
import UserArenaFilter from '../../components/UserArenaFilter/UserArenaFilter'
import ArenasList from '../../components/UserArenasList/ArenasList'
import Pagination from '../../components/Pagination/Pagination'
import { arenaService } from '../../services/arenaService'
import UserNavbar from '@/components/NavbarUser'
import Footer from '@/components/Footer'

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
        <>
            <UserNavbar/>
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12 sm:py-16 md:py-20">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                ابحث عن ملعبك المثالي
                            </h1>
                            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                                اكتشف أفضل الملاعب الرياضية واحجز وقتك المفضل بسهولة
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                    <UserArenaFilter onFilterChange={handleFilterChange} />
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Results Count */}
                    {!loading && !error && arenas.length > 0 && (
                        <div className="mb-6">
                            <p className="text-gray-600 text-sm sm:text-base">
                                تم العثور على <span className="font-semibold text-green-600">{arenas.length}</span> ملعب
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="max-w-2xl mx-auto my-12">
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="mr-3 flex-1">
                                        <h3 className="text-red-800 font-bold text-lg mb-2">حدث خطأ</h3>
                                        <p className="text-red-700">{error}</p>
                                        <button
                                            onClick={fetchArenas}
                                            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                                        >
                                            إعادة المحاولة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Arenas List with Loading and Empty States */}
                    <ArenasList arenas={arenas} loading={loading} />

                    {/* Pagination */}
                    {!loading && !error && arenas.length > 0 && totalPages > 1 && (
                        <div className="mt-12 mb-8">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            
            <Footer/>
        </>
    )
}
