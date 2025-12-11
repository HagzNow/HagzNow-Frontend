import { useMemo, useState } from 'react';
import AdminArenaCard from '../AdminArenaCard/AdminArenaCard';
import { arenaService } from '../../services/arenaService';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import Toast from '../Toast/Toast';
import noImage from '../../assets/imgs/no-img.jpg';

export default function AdminArenasReqsList({ arenaRequests = [], loading, onRefresh }) {
  const [processingId, setProcessingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', arenaId: null });
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const [selectedArena, setSelectedArena] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailSlide, setDetailSlide] = useState(0);

  // Handle both array and object with data property
  const arenas = Array.isArray(arenaRequests) ? arenaRequests : arenaRequests?.data || [];

  console.log('AdminArenasReqsList received arenaRequests:', arenaRequests);
  console.log('Processed arenas:', arenas);
  console.log('arenas is array?:', Array.isArray(arenas));
  console.log('arenas length:', arenas?.length);

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const handleApprove = async (id) => {
    setConfirmDialog({ isOpen: true, type: 'approve', arenaId: id });
  };

  const handleReject = async (id) => {
    setConfirmDialog({ isOpen: true, type: 'reject', arenaId: id });
  };

  const handleView = async (arenaId) => {
    setIsDetailOpen(true);
    setDetailLoading(true);
    setSelectedArena(null);
    setDetailSlide(0);
    try {
      const detail = await arenaService.getArenaById(arenaId);
      setSelectedArena(detail);
    } catch (error) {
      showToast('تعذر تحميل تفاصيل الملعب', 'error');
      setIsDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    const { type, arenaId } = confirmDialog;
    setProcessingId(arenaId);
    setConfirmDialog({ isOpen: false, type: '', arenaId: null });

    try {
      if (type === 'approve') {
        await arenaService.approveArena(arenaId);
        showToast('تم الموافقة على الملعب بنجاح', 'success');
      } else if (type === 'reject') {
        await arenaService.rejectArena(arenaId);
        showToast('تم رفض الملعب بنجاح', 'success');
      }

      // Refresh the list after action
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      showToast(
        type === 'approve' ? 'فشل في الموافقة على الملعب: ' + error.message : 'فشل في رفض الملعب: ' + error.message,
        'error'
      );
      console.error(`Error ${type}ing arena:`, error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <>
      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, type: '', arenaId: null })}
        onConfirm={handleConfirmAction}
        title={confirmDialog.type === 'approve' ? 'تأكيد الموافقة' : 'تأكيد الرفض'}
        message={
          confirmDialog.type === 'approve'
            ? 'هل أنت متأكد من الموافقة على هذا الملعب؟ سيتم تفعيل الملعب وإتاحته للمستخدمين.'
            : 'هل أنت متأكد من رفض هذا الملعب؟ سيتم إلغاء الطلب ولن يكون الملعب متاحاً.'
        }
        confirmText={confirmDialog.type === 'approve' ? 'موافقة' : 'رفض'}
        cancelText="إلغاء"
        type={confirmDialog.type === 'approve' ? 'success' : 'danger'}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {loading ? (
        <div
          dir="ltr"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-7 py-2 px-3 sm:px-4 md:px-6 lg:px-8"
        >
          {/* Show 6 skeleton cards while loading */}
          {[...Array(6)].map((_, index) => (
            <AdminArenaCard key={index} isLoading={true} />
          ))}
        </div>
      ) : !arenas || !Array.isArray(arenas) || arenas.length === 0 ? (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-100 dark:bg-gray-800 text-neutral-700 dark:text-gray-300 border border-neutral-200 dark:border-gray-700">
            لا توجد طلبات ملاعب متاحة
          </div>
        </div>
      ) : (
        <div className="relative space-y-4">
          <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">طلبات الملاعب</h3>
            <span className="px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
              {arenas.length} طلب
            </span>
          </div>

          <div
            dir="ltr"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-7 py-2 px-3 sm:px-4 md:px-6 lg:px-8"
          >
            {arenas.map((arena) => {
              const imageToUse = arena.thumbnail && arena.thumbnail.trim() !== '' ? arena.thumbnail : noImage;
              return (
                <AdminArenaCard
                  key={arena.id}
                  id={arena.id}
                  title={arena.name}
                  location={arena.locationSummary}
                  sport={arena.categoryName}
                  price={arena.pricePerHour}
                  image={imageToUse}
                  onApprove={() => handleApprove(arena.id)}
                  onReject={() => handleReject(arena.id)}
                  onView={() => handleView(arena.id)}
                  images={(arena.images || []).map((img) => img.path || img).filter(Boolean)}
                  isProcessing={processingId === arena.id}
                />
              );
            })}
          </div>

          {(isDetailOpen || detailLoading) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => {
                  setSelectedArena(null);
                  setIsDetailOpen(false);
                }}
              ></div>
              <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-gray-900/80 border border-neutral-200 dark:border-gray-700 overflow-hidden">
                {detailLoading ? (
                  <div className="p-8 flex justify-center items-center min-h-[280px]">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : selectedArena ? (
                  (() => {
                    const primaryImage =
                      selectedArena.thumbnail ||
                      (selectedArena.images &&
                        selectedArena.images[0] &&
                        (selectedArena.images[0].path || selectedArena.images[0]));
                    const locationText =
                      selectedArena.locationSummary ||
                      selectedArena.address ||
                      [selectedArena.location?.city, selectedArena.location?.governorate].filter(Boolean).join(' - ') ||
                      'غير محدد';
                    const gallery = [primaryImage, ...galleryFromImages(selectedArena.images, primaryImage)].filter(
                      Boolean
                    );
                    const sportText = selectedArena.categoryName || selectedArena.category?.name || 'غير محدد';
                    const ownerName =
                      selectedArena.ownerName ||
                      (selectedArena.owner
                        ? `${selectedArena.owner.fName || ''} ${selectedArena.owner.lName || ''}`.trim()
                        : '') ||
                      'غير معروف';
                    const ownerPhone = selectedArena.ownerPhone || selectedArena.owner?.phone || 'غير متوفر';
                    const ownerPayout = selectedArena.owner?.payoutMethod || 'غير محدد';
                    const minPeriod = selectedArena.minPeriod ? `${selectedArena.minPeriod} دقيقة` : 'غير محدد';
                    const openClose =
                      selectedArena.openingHour || selectedArena.closingHour
                        ? `${selectedArena.openingHour || '--'}:00 - ${selectedArena.closingHour || '--'}:00`
                        : 'غير محدد';
                    const deposit =
                      selectedArena.depositPercent !== undefined && selectedArena.depositPercent !== null
                        ? `${selectedArena.depositPercent}%`
                        : 'غير محدد';
                    const extras = selectedArena.extras || [];
                    const policy = selectedArena.policy || 'لا توجد سياسة مضافة.';
                    return (
                      <>
                        <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-200 dark:border-gray-700">
                          <div>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                              {selectedArena.name}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-gray-400">
                              {selectedArena.status || 'معلق'} •{' '}
                              {selectedArena.location?.city || selectedArena.location?.governorate || 'غير محدد'}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedArena(null);
                              setIsDetailOpen(false);
                            }}
                            className="text-neutral-500 hover:text-neutral-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 p-5">
                          <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-gray-700 bg-neutral-50 dark:bg-gray-800 shadow-inner relative">
                            {gallery.length > 0 ? (
                              <>
                                <img
                                  src={gallery[detailSlide]}
                                  alt={selectedArena.name}
                                  className="w-full h-72 object-cover"
                                />
                                {gallery.length > 1 && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDetailSlide((s) => (s - 1 + gallery.length) % gallery.length);
                                      }}
                                      className="absolute top-1/2 -translate-y-1/2 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                                    >
                                      ‹
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDetailSlide((s) => (s + 1) % gallery.length);
                                      }}
                                      className="absolute top-1/2 -translate-y-1/2 left-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                                    >
                                      ›
                                    </button>
                                    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                                      {gallery.map((_, idx) => (
                                        <span
                                          key={idx}
                                          className={`h-2.5 w-2.5 rounded-full border border-white/70 ${
                                            idx === detailSlide ? 'bg-white' : 'bg-white/40'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="w-full h-72 flex items-center justify-center text-sm text-neutral-500 dark:text-gray-400">
                                لا توجد صور
                              </div>
                            )}
                          </div>

                          <div className="space-y-3 text-right">
                            <DetailRow label="الموقع" value={locationText} />
                            <DetailRow label="نوع الرياضة" value={sportText} />
                            <DetailRow
                              label="السعر للساعة"
                              value={`${selectedArena.pricePerHour || '--'} جنيه/ساعة`}
                              tone="money"
                            />
                            <DetailRow label="الحد الأدنى للحجز" value={minPeriod} />
                            <DetailRow label="ساعات العمل" value={openClose} />
                            <DetailRow label="نسبة العربون" value={deposit} />
                            <DetailRow label="الحالة" value={selectedArena.status || 'معلق'} />
                            <DetailRow label="المالك" value={ownerName} />
                            <DetailRow label="رقم المالك" value={ownerPhone} />
                            <DetailRow label="طريقة الدفع للمالك" value={ownerPayout} />
                            <DetailRow
                              label="المساحة / المقاس"
                              value={selectedArena.size || selectedArena.dimensions || 'غير محدد'}
                            />
                            <div>
                              <p className="text-sm text-neutral-500 dark:text-gray-400">الوصف</p>
                              <p className="text-neutral-700 dark:text-gray-300 text-sm leading-6">
                                {selectedArena.description || 'لا يوجد وصف متاح.'}
                              </p>
                            </div>
                            {extras.length > 0 && (
                              <div>
                                <p className="text-sm text-neutral-500 dark:text-gray-400 mb-1">الإضافات</p>
                                <div className="flex flex-wrap gap-2">
                                  {extras.map((ex) => (
                                    <span
                                      key={ex.id || ex.name}
                                      className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800"
                                    >
                                      {ex.name} {ex.price ? `- ${ex.price}ج` : ''}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {policy && policy.trim() !== '' && (
                              <div>
                                <p className="text-sm text-neutral-500 dark:text-gray-400 mb-1">السياسة</p>
                                <p className="text-neutral-700 dark:text-gray-300 text-sm leading-6">{policy}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function DetailRow({ label, value, tone }) {
  const toneClass = tone === 'money' ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-900 dark:text-white';

  return (
    <div>
      <p className="text-sm text-neutral-500 dark:text-gray-400">{label}</p>
      <p className={`font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}

function galleryFromImages(images = [], primary) {
  const set = new Set();
  const result = [];
  if (primary) set.add(primary);
  images.forEach((img) => {
    const path = img?.path || img;
    if (path && !set.has(path)) {
      set.add(path);
      result.push(path);
    }
  });
  return result;
}
