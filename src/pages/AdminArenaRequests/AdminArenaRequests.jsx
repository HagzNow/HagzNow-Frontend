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
            <div className="text-center py-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    مراجعة وإدارة طلبات الساحة الجديدة المقدمة من الملاكين
                </h1>
            </div>

            {/* Filter */}
            <AdminArenaFilter />

            {/* Error State */}
            {error && !loading && (
                <div className="mx-10 my-10 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    <p className="font-semibold">حدث خطأ</p>
                    <p>{error}</p>
                    <button
                        onClick={fetchArenaRequests}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
