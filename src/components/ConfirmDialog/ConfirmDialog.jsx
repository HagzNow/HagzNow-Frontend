export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    type = "info" // "success", "danger", "warning", "info"
}) {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-600 hover:bg-green-700";
            case "danger":
                return "bg-red-600 hover:bg-red-700";
            case "warning":
                return "bg-yellow-600 hover:bg-yellow-700";
            default:
                return "bg-blue-600 hover:bg-blue-700";
        }
    };

    const getIconColor = () => {
        switch (type) {
            case "success":
                return "text-green-600";
            case "danger":
                return "text-red-600";
            case "warning":
                return "text-yellow-600";
            default:
                return "text-blue-600";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 max-w-md w-full mx-4 overflow-hidden transform transition-all border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${type === 'success' ? 'bg-green-100 dark:bg-green-900/30' : type === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'} flex items-center justify-center`}>
                            {type === 'success' && (
                                <svg className={`w-6 h-6 ${getIconColor()} dark:text-green-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {type === 'danger' && (
                                <svg className={`w-6 h-6 ${getIconColor()} dark:text-red-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                            {type === 'warning' && (
                                <svg className={`w-6 h-6 ${getIconColor()} dark:text-yellow-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                            {type === 'info' && (
                                <svg className={`w-6 h-6 ${getIconColor()} dark:text-blue-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    </div>

                    {/* Message */}
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed mr-16">{message}</p>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-5 py-2.5 text-white rounded-lg transition-colors font-medium ${getTypeStyles()} dark:hover:opacity-90`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
