import React from 'react'
import AdminArenaFilter from '../../components/AdminArenaFilter/AdminArenaFilter'
import AdminArenasReqsList from '../../components/AdminArenasReqsList/AdminArenasReqsList'

export default function AdminArenaRequests() {
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

            {/* Arenas List */}
            <AdminArenasReqsList />
        </div>
    )
}
