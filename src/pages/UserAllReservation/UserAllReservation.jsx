import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import UserAllReservationsList from '../../components/UserAllReservationsList/UserAllReservationsList';
import UserReservationFilter from '../../components/UserReservationFilter/UserReservationFilter';
import Pagination from '../../components/Pagination/Pagination';
import { reservationService } from '../../services/reservationService';
import { getTimeRanges, formatTime } from '../../utils/timeRange';
import toast from 'react-hot-toast';

export default function UserAllReservation() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'past'
  const [error, setError] = useState(null);
  const itemsPerPage = 12;
  const [filters, setFilters] = useState({
    arenaName: '',
    status: '',
    category: '',
  });

  // Separate state for current and past reservations (unfiltered data from API)
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

  // Client-side filtering function
  const applyFilters = (reservations) => {
    return reservations.filter((reservation) => {
      // Filter by arena name
      const matchesName = !filters.arenaName.trim() || 
        reservation.arenaName.toLowerCase().includes(filters.arenaName.toLowerCase().trim());
      
      // Filter by status
      const matchesStatus = !filters.status || reservation.status === filters.status;
      
      // Filter by category (using arenaCategory from API response)
      const matchesCategory = !filters.category || 
        (reservation.arenaCategory && reservation.arenaCategory.toLowerCase() === filters.category.toLowerCase());
      
      return matchesName && matchesStatus && matchesCategory;
    });
  };

  // Format slots to time string
  const formatSlots = (slots) => {
    if (!slots || slots.length === 0) return '';

    const ranges = getTimeRanges(slots);
    return ranges
      .map((range) => {
        const startTime = formatTime(range.start);
        const endTime = formatTime(range.end + 1);
        return `${startTime} - ${endTime}`;
      })
      .join(', ');
  };

  // Transform API data to match component props
  const transformReservation = (reservation) => ({
    id: reservation.id,
    arenaName: reservation.arenaName,
    arenaImage: reservation.arenaThumbnail,
    arenaCategory: reservation.arenaCategory, // Add category from API response
    date: reservation.dateOfReservation,
    timeSlot: formatSlots(reservation.slots),
    price: parseFloat(reservation.totalAmount),
    status: reservation.status, // Use status from API response
  });

  // Fetch reservations for a specific type
  const fetchReservationsData = async (type, page) => {
    try {
      const params = {
        page: page,
        limit: itemsPerPage,
      };

      console.log(`Fetching ${type} reservations, page:`, page);

      const result =
        type === 'current'
          ? await reservationService.getCurrentReservations(params)
          : await reservationService.getPastReservations(params);

      console.log(`${type} API Result:`, result);

      // Transform API data to match component props
      const transformedData = Array.isArray(result.data)
        ? result.data.map((reservation) => transformReservation(reservation))
        : [];

      return {
        data: transformedData,
        totalPages: result.totalPages,
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
          fetchReservationsData('past', 1),
        ]);

        setCurrentReservations({
          data: currentResult.data,
          currentPage: 1,
          totalPages: currentResult.totalPages,
        });

        setPastReservations({
          data: pastResult.data,
          currentPage: 1,
          totalPages: pastResult.totalPages,
        });
      } catch (error) {
        console.error('Error fetching reservations:', error);
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          t('reservations_error_load') ||
          'حدث خطأ أثناء تحميل الحجوزات';
        setError(errorMsg);
        toast.error(errorMsg, {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          icon: '❌',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only fetch once on mount

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
          totalPages: result.totalPages,
        });
      } else {
        setPastReservations({
          data: result.data,
          currentPage: page,
          totalPages: result.totalPages,
        });
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        t('reservations_error_load') ||
        'حدث خطأ أثناء تحميل الحجوزات';
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 4000,
        style: {
          background: '#ef4444',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = useCallback((newFilters) => {
    console.log('Filter changed:', newFilters);
    setFilters(newFilters);
  }, []);

  // Get current active data based on selected tab and apply client-side filters
  const activeData = activeTab === 'past' ? pastReservations : currentReservations;
  const filteredData = applyFilters(activeData.data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {t('my_reservations') || 'حجوزاتي'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full mx-auto"></div>
        </div>

        {/* Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <UserReservationFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => handleTabChange('current')}
            className={`relative px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'current'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/50 scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
            }`}
          >
            {t('reservations_current') || 'القادمة'}
            {activeTab === 'current' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange('past')}
            className={`relative px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'past'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/50 scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
            }`}
          >
            {t('reservations_past') || 'السابقة'}
            {activeTab === 'past' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full"></div>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-auto max-w-2xl mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-center font-medium shadow-sm">
              {error}
            </div>
          </div>
        )}

        {/* Reservations List */}
        <UserAllReservationsList reservations={filteredData} loading={loading} />

        {/* Pagination */}
        {!loading && activeData.totalPages > 1 && (
          <div className="mt-8 mb-6">
            <Pagination
              currentPage={activeData.currentPage}
              totalPages={activeData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
