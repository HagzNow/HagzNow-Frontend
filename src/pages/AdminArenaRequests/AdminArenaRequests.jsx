import React, { useState, useEffect, useCallback } from 'react'
import AdminArenaFilter from '../../components/AdminArenaFilter/AdminArenaFilter'
import AdminArenasReqsList from '../../components/AdminArenasReqsList/AdminArenasReqsList'
import { arenaService } from '../../services/arenaService'

export default function AdminArenaRequests() {
    const [arenaRequests, setArenaRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArenaRequests = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await arenaService.getArenaRequests({
                page: 1,
                limit: 100,
            });

            setArenaRequests(response.data);
        } catch (err) {
            setError(err.message || 'فشل في تحميل طلبات الملاعب');
            console.error('Error fetching arena requests:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArenaRequests();
    }, [fetchArenaRequests]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Title */}
            <div className="text-center py-4 sm:py-6 px-4">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                    مراجعة وإدارة طلبات الساحة الجديدة المقدمة من الملاكين
                </h1>
            </div>

            {/* Filter */}
            <AdminArenaFilter />

            {/* Error State */}
            {error && !loading && (
                <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 my-6 sm:my-8 md:my-10 p-4 sm:p-5 md:p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    <p className="font-semibold text-sm sm:text-base md:text-lg">حدث خطأ</p>
                    <p className="text-sm sm:text-base mt-1">{error}</p>
                    <button
                        onClick={fetchArenaRequests}
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
                onRefresh={fetchArenaRequests}
            />
        </div>
    )
}
