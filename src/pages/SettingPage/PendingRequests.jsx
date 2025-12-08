import React from 'react'

const PendingRequests = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">الطلبات المعلقة</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">لا توجد طلبات معلقة حالياً</p>
        </div>
      </div>
    </div>
  )
}

export default PendingRequests