import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDownCircle, CheckCircle, XCircle, Loader, User, Mail, Phone, Wallet } from 'lucide-react';
import baseUrl from '../../apis/config';
import Pagination from '../../components/Pagination/Pagination';
import toast from 'react-hot-toast';

export default function WithdrawalRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [processingId, setProcessingId] = useState(null);
  const [processingAction, setProcessingAction] = useState(null); // 'accept' or 'reject'
  const itemsPerPage = 10;

  const fetchWithdrawalRequests = useCallback(async (page) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await baseUrl.get(`/wallet/withdrawal-requests?page=${page}&limit=${itemsPerPage}`);

      if (data.isSuccess) {
        setRequests(data.data.data);
        setTotalPages(data.data.totalPages);
        setTotal(data.data.total);
      } else {
        setError(data.message || 'فشل في تحميل طلبات السحب');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في تحميل طلبات السحب');
      console.error('Error fetching withdrawal requests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawalRequests(currentPage);
  }, [currentPage, fetchWithdrawalRequests]);

  const handleAccept = async (requestId) => {
    setProcessingId(requestId);
    setProcessingAction('accept');
    try {
      console.log('Accepting withdrawal request:', requestId);
      const { data } = await baseUrl.post(`/wallet/accept-withdrawal-requests/${requestId}`);

      console.log('Accept response:', data);

      if (data.isSuccess) {
        toast.success('تم قبول طلب السحب بنجاح');
        // Wait a bit before refreshing to show the success message
        setTimeout(() => {
          fetchWithdrawalRequests(currentPage);
        }, 500);
      } else {
        toast.error(data.message || 'فشل في قبول طلب السحب');
      }
    } catch (err) {
      console.error('Error accepting withdrawal request:', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'فشل في قبول طلب السحب. يرجى المحاولة مرة أخرى.';
      toast.error(errorMessage);
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
    }
  };

  const handleReject = async (requestId) => {
    setProcessingId(requestId);
    setProcessingAction('reject');
    try {
      console.log('Rejecting withdrawal request:', requestId);
      const { data } = await baseUrl.post(`/wallet/reject-withdrawal-requests/${requestId}`);

      console.log('Reject response:', data);

      if (data.isSuccess) {
        toast.success('تم رفض طلب السحب بنجاح');
        // Wait a bit before refreshing to show the success message
        setTimeout(() => {
          fetchWithdrawalRequests(currentPage);
        }, 500);
      } else {
        toast.error(data.message || 'فشل في رفض طلب السحب');
      }
    } catch (err) {
      console.error('Error rejecting withdrawal request:', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'فشل في رفض طلب السحب. يرجى المحاولة مرة أخرى.';
      toast.error(errorMessage);
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
    }
  };

  const handlePageChange = (page) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStageBadge = (stage) => {
    const badges = {
      pending: {
        label: 'قيد الانتظار',
        className:
          'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700',
        icon: '⏳',
      },
      accepted: {
        label: 'مقبول',
        className:
          'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700',
        icon: '✓',
      },
      rejected: {
        label: 'مرفوض',
        className:
          'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700',
        icon: '✗',
      },
    };

    const badge = badges[stage] || badges.pending;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badge.className}`}
      >
        <span className="text-xs leading-none">{badge.icon}</span>
        <span>{badge.label}</span>
      </span>
    );
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-lg">
              <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">إدارة طلبات السحب</h2>
              {total > 0 && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  إجمالي الطلبات: <span className="font-semibold text-green-600 dark:text-green-400">{total}</span> |
                  الصفحة <span className="font-semibold">{currentPage}</span> من{' '}
                  <span className="font-semibold">{totalPages}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto my-8">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6 shadow-md dark:shadow-gray-900/50">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <XCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
                </div>
                <div className="mr-3 flex-1">
                  <h3 className="text-red-800 dark:text-red-300 font-bold text-lg mb-2">حدث خطأ</h3>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                  <button
                    onClick={() => fetchWithdrawalRequests(currentPage)}
                    className="mt-4 px-6 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
          </div>
        )}

        {/* Requests Table */}
        {!loading && !error && (
          <>
            {requests.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-12 text-center border border-gray-200 dark:border-gray-700">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <ArrowDownCircle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد طلبات سحب حتى الآن</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  سيظهر سجل طلبات السحب هنا عند وجود طلبات جديدة
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border-b-2 border-green-200 dark:border-green-700">
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap border-l border-green-200 dark:border-green-700 first:border-l-0">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-sm">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <span>المستخدم</span>
                          </div>
                        </th>
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap border-l border-green-200 dark:border-green-700">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-sm">
                              <Mail className="w-4 h-4 text-white" />
                            </div>
                            <span>البريد الإلكتروني</span>
                          </div>
                        </th>
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap border-l border-green-200 dark:border-green-700">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-sm">
                              <Phone className="w-4 h-4 text-white" />
                            </div>
                            <span>الهاتف</span>
                          </div>
                        </th>
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap border-l border-green-200 dark:border-green-700">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-sm">
                              <ArrowDownCircle className="w-4 h-4 text-white" />
                            </div>
                            <span>المبلغ</span>
                          </div>
                        </th>
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap border-l border-green-200 dark:border-green-700">
                          <span>طريقة الدفع</span>
                        </th>
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap border-l border-green-200 dark:border-green-700">
                          <span>الحالة</span>
                        </th>
                        <th className="py-5 px-6 text-sm font-bold text-gray-800 dark:text-gray-200 text-center whitespace-nowrap">
                          <span>الإجراءات</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request, index) => (
                        <tr
                          key={request.id}
                          className={`border-b border-gray-100 dark:border-gray-700/50 transition-all duration-200 group ${
                            index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                          } hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 hover:shadow-sm`}
                        >
                          {/* User Name */}
                          <td className="py-5 px-6 border-l border-gray-100 dark:border-gray-700/50 first:border-l-0">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center shadow-sm group-hover:from-green-200 group-hover:to-emerald-200 dark:group-hover:from-green-800/60 dark:group-hover:to-emerald-800/60 group-hover:scale-110 transition-all duration-200">
                                <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {request.userName}
                              </span>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-5 px-6 border-l border-gray-100 dark:border-gray-700/50">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {request.userEmail}
                            </span>
                          </td>

                          {/* Phone */}
                          <td className="py-5 px-6 border-l border-gray-100 dark:border-gray-700/50">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {request.userPhone}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="py-5 px-6 border-l border-gray-100 dark:border-gray-700/50">
                            <div className="flex items-center justify-center gap-3">
                              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                {Number(request.amount).toLocaleString('ar-EG')}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">ج.م</span>
                            </div>
                          </td>

                          {/* Payment Method */}
                          <td className="py-5 px-6 border-l border-gray-100 dark:border-gray-700/50">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700 shadow-sm">
                              {request.userPayoutMethod === 'wallet' ? 'محفظة' : request.userPayoutMethod}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-5 px-6 border-l border-gray-100 dark:border-gray-700/50">
                            {getStageBadge(request.stage)}
                          </td>

                          {/* Actions */}
                          <td className="py-5 px-6">
                            {request.stage === 'pending' ? (
                              <div className="flex items-center justify-center gap-2.5">
                                <button
                                  onClick={() => handleAccept(request.id)}
                                  disabled={processingId === request.id}
                                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all duration-200 text-xs font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-0.5 disabled:transform-none"
                                  title="قبول الطلب"
                                >
                                  {processingId === request.id && processingAction === 'accept' ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                  <span className="hidden sm:inline">قبول</span>
                                </button>
                                <button
                                  onClick={() => handleReject(request.id)}
                                  disabled={processingId === request.id}
                                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 dark:from-red-600 dark:to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-600 dark:hover:from-red-700 dark:hover:to-rose-700 transition-all duration-200 text-xs font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-0.5 disabled:transform-none"
                                  title="رفض الطلب"
                                >
                                  {processingId === request.id && processingAction === 'reject' ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <XCircle className="w-4 h-4" />
                                  )}
                                  <span className="hidden sm:inline">رفض</span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                  تم المعالجة
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
