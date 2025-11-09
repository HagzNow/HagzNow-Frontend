import React, { useState, useEffect } from 'react'
import UserAllReservationsList from '../../components/UserAllReservationsList/UserAllReservationsList'
import Pagination from '../../components/Pagination/Pagination'
import { reservationService } from '../../services/reservationService'
import { getTimeRanges, formatTime } from '../../utils/timeRange'

export default function UserAllReservation() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('current'); // 'current' or 'past'
    const [error, setError] = useState(null);
    const itemsPerPage = 12;

    // Separate state for current and past reservations
    const [currentReservations, setCurrentReservations] = useState({
        data: [],
        currentPage: 1,
        totalPages: 1,
    });

    const [pastReservations, setPastReservations] = useState({
        data: [],
        currentPage: 1,
        totalPages: 1,
    });

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

    // Transform API data to match component props
    const transformReservation = (reservation, status) => ({
        id: reservation.id,
        arenaName: reservation.arenaName,
        arenaImage: reservation.arenaThumbnail,
        date: reservation.dateOfReservation,
        timeSlot: formatSlots(reservation.slots),
        price: parseFloat(reservation.totalAmount),
        status: status
    });

    // Fetch reservations for a specific type
    const fetchReservationsData = async (type, page) => {
        try {
            const params = {
                page: page,
                limit: itemsPerPage
            };

            console.log(`Fetching ${type} reservations, page:`, page);

            const result = type === 'current'
                ? await reservationService.getCurrentReservations(params)
                : await reservationService.getPastReservations(params);

            console.log(`${type} API Result:`, result);

            // Transform API data to match component props
            // const transformedData = result.data.map(reservation =>
            //     transformReservation(reservation, type === 'current' ? 'قادمة' : 'منتهية')
            // );

            const transformedData = Array.isArray(result.data)
                ? result.data.map(reservation =>
                    transformReservation(reservation, type === 'current' ? 'قادمة' : 'منتهية')
                    )
                : [];

            return {
                data: transformedData,
                totalPages: result.totalPages
            };
        } catch (error) {
            console.error(`Error fetching ${type} reservations:`, error);
            throw error;
        }
    };

    // Fetch both current and past reservations on initial load
    useEffect(() => {
        const fetchAllReservations = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch both current and past reservations in parallel
                const [currentResult, pastResult] = await Promise.all([
                    fetchReservationsData('current', 1),
                    fetchReservationsData('past', 1)
                ]);

                setCurrentReservations({
                    data: currentResult.data,
                    currentPage: 1,
                    totalPages: currentResult.totalPages
                });

                setPastReservations({
                    data: pastResult.data,
                    currentPage: 1,
                    totalPages: pastResult.totalPages
                });
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setError(error.message || 'حدث خطأ أثناء تحميل الحجوزات');
            } finally {
                setLoading(false);
            }
        };

        fetchAllReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle page change for the active tab
    const handlePageChange = async (page) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchReservationsData(activeTab, page);

            if (activeTab === 'current') {
                setCurrentReservations({
                    data: result.data,
                    currentPage: page,
                    totalPages: result.totalPages
                });
            } else {
                setPastReservations({
                    data: result.data,
                    currentPage: page,
                    totalPages: result.totalPages
                });
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setError(error.message || 'حدث خطأ أثناء تحميل الحجوزات');
        } finally {
            setLoading(false);
        }
    };

    // Get current active data based on selected tab
    const activeData = activeTab === 'current' ? currentReservations : pastReservations;

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
                reservations={activeData.data}
                loading={loading}
            />

            {/* Pagination */}
            {!loading && activeData.data.length > 0 && (
                <Pagination
                    currentPage={activeData.currentPage}
                    totalPages={activeData.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}
