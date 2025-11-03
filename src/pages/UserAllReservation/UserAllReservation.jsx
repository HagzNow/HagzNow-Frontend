import React, { useState, useEffect, useCallback } from 'react'
import UserAllReservationsList from '../../components/UserAllReservationsList/UserAllReservationsList'
import Pagination from '../../components/Pagination/Pagination'
import { reservationService } from '../../services/reservationService'
import { getTimeRanges, formatTime } from '../../utils/timeRange'

export default function UserAllReservation() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('current'); // 'current' or 'past'
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const itemsPerPage = 12;

    // Format slots to time string
    const formatSlots = (slots) => {
        if (!slots || slots.length === 0) return '';

        const ranges = getTimeRanges(slots);
        return ranges.map(range => {
            const startTime = formatTime(range.start);
            const endTime = formatTime(range.end + 1);
            return `${startTime} - ${endTime}`;
        }).join(', ');
    };

    // Fetch reservations based on active tab
    const fetchReservations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                limit: itemsPerPage
            };

            console.log('Fetching reservations for tab:', activeTab, 'params:', params);

            const result = activeTab === 'current'
                ? await reservationService.getCurrentReservations(params)
                : await reservationService.getPastReservations(params);

            console.log('API Result:', result);
            console.log('Result data:', result.data);

            // Transform API data to match component props
            const transformedData = result.data.map(reservation => ({
                id: reservation.id,
                arenaName: reservation.arenaName,
                arenaImage: reservation.arenaThumbnail,
                date: reservation.dateOfReservation,
                timeSlot: formatSlots(reservation.slots),
                price: parseFloat(reservation.totalAmount),
                status: activeTab === 'current' ? 'قادمة' : 'منتهية'
            }));

            console.log('Transformed data:', transformedData);

            setReservations(transformedData);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setError(error.message || 'حدث خطأ أثناء تحميل الحجوزات');
            setReservations([]);
        } finally {
            setLoading(false);
        }
    }, [activeTab, currentPage]);

    // Fetch reservations when tab or page changes
    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    // Reset to page 1 when switching tabs
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Title */}
            <div className="text-center py-4 sm:py-6 px-4">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                    حجوزاتي
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 sm:gap-4 px-4 mb-6">
                <button
                    onClick={() => handleTabChange('current')}
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${activeTab === 'current'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    القادمة
                </button>
                <button
                    onClick={() => handleTabChange('past')}
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${activeTab === 'past'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    السابقة
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 mb-6">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                </div>
            )}

            {/* Reservations List */}
            <UserAllReservationsList
                reservations={reservations}
                loading={loading}
            />

            {/* Pagination */}
            {!loading && reservations.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}
