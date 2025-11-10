import { useState } from "react";
import AdminArenaCard from "../AdminArenaCard/AdminArenaCard";
import { arenaService } from "../../services/arenaService";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import Toast from "../Toast/Toast";

export default function AdminArenasReqsList({ arenaRequests = [], loading, onRefresh }) {
    const [processingId, setProcessingId] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: "", arenaId: null });
    const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

    const showToast = (message, type = "success") => {
        setToast({ isVisible: true, message, type });
    };

    const handleApprove = async (id) => {
        setConfirmDialog({ isOpen: true, type: "approve", arenaId: id });
    };

    const handleReject = async (id) => {
        setConfirmDialog({ isOpen: true, type: "reject", arenaId: id });
    };

    const handleConfirmAction = async () => {
        const { type, arenaId } = confirmDialog;
        setProcessingId(arenaId);

        try {
            if (type === "approve") {
                await arenaService.updateArenaStatus(arenaId, "active");
                showToast("تم الموافقة على الملعب بنجاح", "success");
            } else if (type === "reject") {
                await arenaService.updateArenaStatus(arenaId, "disabled");
                showToast("تم رفض الملعب بنجاح", "success");
            }

            // Refresh the list after action
            if (onRefresh) {
                onRefresh();
            }
        } catch (error) {
            showToast(
                type === "approve"
                    ? "فشل في الموافقة على الملعب: " + error.message
                    : "فشل في رفض الملعب: " + error.message,
                "error"
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
                onClose={() => setConfirmDialog({ isOpen: false, type: "", arenaId: null })}
                onConfirm={handleConfirmAction}
                title={confirmDialog.type === "approve" ? "تأكيد الموافقة" : "تأكيد الرفض"}
                message={
                    confirmDialog.type === "approve"
                        ? "هل أنت متأكد من الموافقة على هذا الملعب؟ سيتم تفعيل الملعب وإتاحته للمستخدمين."
                        : "هل أنت متأكد من رفض هذا الملعب؟ سيتم إلغاء الطلب ولن يكون الملعب متاحاً."
                }
                confirmText={confirmDialog.type === "approve" ? "موافقة" : "رفض"}
                cancelText="إلغاء"
                type={confirmDialog.type === "approve" ? "success" : "danger"}
            />

            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />

            {loading ? (
                <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-600"></div>
                </div>
            ) : !arenaRequests || arenaRequests.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20 px-4">
                    <p className="text-gray-500 text-base sm:text-lg md:text-xl">لا توجد طلبات ملاعب متاحة</p>
                </div>
            ) : (
                <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 my-6 sm:my-8 md:my-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10">
                    {arenaRequests.map((arena) => (
                        <AdminArenaCard
                            key={arena.id}
                            id={arena.id}
                            title={arena.name}
                            location={arena.locationSummary}
                            sport={arena.categoryName}
                            price={arena.pricePerHour}
                            image={arena.thumbnail || 'src/assets/imgs/arena-img.png'}
                            onApprove={() => handleApprove(arena.id)}
                            onReject={() => handleReject(arena.id)}
                            isProcessing={processingId === arena.id}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
