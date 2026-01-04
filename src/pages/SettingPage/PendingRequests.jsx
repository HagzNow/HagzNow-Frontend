import React, { useState, useEffect, useCallback } from 'react';
import { userService } from '../../services/userService';
import Pagination from '../../components/Pagination/Pagination';
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  FileText,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const PendingRequests = () => {
  const { t } = useTranslation();
  const [ownerRequests, setOwnerRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [processingId, setProcessingId] = useState(null);
  const itemsPerPage = 10;

  const fetchOwnerRequests = useCallback(async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.getOwnerRequests({
        page: page,
        limit: itemsPerPage,
      });

      setOwnerRequests(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'فشل في تحميل طلبات الملاك';
      setError(errorMessage);
      console.error('Error fetching owner requests:', err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOwnerRequests(currentPage);
  }, [currentPage, fetchOwnerRequests]);

  const handleAccept = async (id) => {
    setProcessingId(id);
    try {
      await userService.acceptOwnerRequest(id);
      toast.success(t('owner_request_accepted') || 'تم قبول طلب المالك بنجاح');
      // Refresh the list
      await fetchOwnerRequests(currentPage);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'فشل في قبول الطلب';
      toast.error(errorMessage);
      console.error('Error accepting owner request:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    try {
      await userService.rejectOwnerRequest(id);
      toast.success(t('owner_request_rejected') || 'تم رفض طلب المالك بنجاح');
      // Refresh the list
      await fetchOwnerRequests(currentPage);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'فشل في رفض الطلب';
      toast.error(errorMessage);
      console.error('Error rejecting owner request:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handlePageChange = (page) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-gray-900/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {t('pending_owner_requests_title') || 'طلبات الملاك المعلقة'}
              </h1>
              <p className="text-neutral-500 dark:text-gray-400 text-sm mt-1">
                {t('pending_owner_requests_subtitle') || 'مراجعة واعتماد طلبات الملاك الجديدة'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <span className="font-semibold">{total}</span>
                <span>{t('total_requests') || 'طلب'}</span>
              </div>
              <button
                onClick={() => fetchOwnerRequests(currentPage)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{t('refresh') || 'تحديث'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-4 shadow-sm dark:shadow-gray-900/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-800/60">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-red-800 dark:text-red-200 font-semibold mb-1">{t('error') || 'حدث خطأ'}</h3>
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                <button
                  onClick={() => fetchOwnerRequests(currentPage)}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t('retry') || 'إعادة المحاولة'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && ownerRequests.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && ownerRequests.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 shadow-sm dark:shadow-gray-900/40 text-center">
            <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('no_pending_requests') || 'لا توجد طلبات معلقة حالياً'}
            </p>
          </div>
        )}

        {/* Owner Requests List */}
        {!loading && ownerRequests.length > 0 && (
          <div className="space-y-4">
            {ownerRequests.map((owner) => (
              <div
                key={owner.id}
                className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-gray-900/40 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Owner Information */}
                  <div className="lg:col-span-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-green-500" />
                        {t('owner_information') || 'معلومات المالك'}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="text-neutral-500 dark:text-gray-400 text-sm min-w-[80px]">
                            {t('name') || 'الاسم:'}
                          </span>
                          <span className="text-neutral-900 dark:text-white font-medium">
                            {owner.fName} {owner.lName}
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-neutral-400 mt-0.5" />
                          <span className="text-neutral-500 dark:text-gray-400 text-sm min-w-[80px]">
                            {t('email') || 'البريد:'}
                          </span>
                          <span className="text-neutral-900 dark:text-white">{owner.email}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-neutral-400 mt-0.5" />
                          <span className="text-neutral-500 dark:text-gray-400 text-sm min-w-[80px]">
                            {t('phone') || 'الهاتف:'}
                          </span>
                          <span className="text-neutral-900 dark:text-white">{owner.phone}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-neutral-500 dark:text-gray-400 text-sm min-w-[80px]">
                            {t('status') || 'الحالة:'}
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm font-medium">
                            {t('pending') || 'قيد المراجعة'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-gray-700">
                      <button
                        onClick={() => handleAccept(owner.id)}
                        disabled={processingId === owner.id}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === owner.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        {t('accept') || 'قبول'}
                      </button>
                      <button
                        onClick={() => handleReject(owner.id)}
                        disabled={processingId === owner.id}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === owner.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {t('reject') || 'رفض'}
                      </button>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-green-500" />
                      {t('documents') || 'المستندات'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* National ID Front */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-gray-300">
                          {t('national_id_front') || 'صورة الهوية الأمامية'}
                        </label>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
                          {owner.nationalIdFront ? (
                            <img
                              src={owner.nationalIdFront}
                              alt="National ID Front"
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(owner.nationalIdFront, '_blank')}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* National ID Back */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-gray-300">
                          {t('national_id_back') || 'صورة الهوية الخلفية'}
                        </label>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
                          {owner.nationalIdBack ? (
                            <img
                              src={owner.nationalIdBack}
                              alt="National ID Back"
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(owner.nationalIdBack, '_blank')}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Selfie with ID */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-gray-300">
                          {t('selfie_with_id') || 'صورة شخصية مع الهوية'}
                        </label>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
                          {owner.selfieWithId ? (
                            <img
                              src={owner.selfieWithId}
                              alt="Selfie with ID"
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(owner.selfieWithId, '_blank')}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
