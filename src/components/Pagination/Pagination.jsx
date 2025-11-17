import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Pagination({ currentPage = 1, totalPages = 4, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const reversedPages = [...pages].reverse();

    // Show all pages if 5 or less, otherwise show smart pagination
    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return reversedPages;
        }
        
        // For RTL: show pages around current page
        // If currentPage is near the end (lower numbers in RTL), show last 5
        if (currentPage <= 3) {
            return reversedPages.slice(0, 5);
        }
        // If currentPage is near the start (higher numbers in RTL), show first 5
        if (currentPage >= totalPages - 2) {
            return reversedPages.slice(totalPages - 5);
        }
        // Otherwise show pages around current
        const currentIndex = reversedPages.indexOf(currentPage);
        const start = Math.max(0, currentIndex - 2);
        const end = Math.min(reversedPages.length, start + 5);
        return reversedPages.slice(start, end);
    };

    const visiblePages = getVisiblePages();

    return (
        <div dir="ltr" className="flex items-center justify-center gap-2 sm:gap-3">
            {/* Previous Button */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:bg-green-50 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                aria-label="الصفحة السابقة"
            >
                <IoChevronBack className="text-lg" />
            </button>

            {/* Page Numbers */}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md
                        ${currentPage === page
                            ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white border-2 border-green-600 shadow-md scale-105'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-green-50 hover:border-green-500 hover:text-green-600'
                        }`}
                    aria-label={`الصفحة ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Show ellipsis if there are more pages */}
            {currentPage > 3 && totalPages > 5 && (
                <span className="px-2 text-gray-400">...</span>
            )}

            {/* Next Button */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:bg-green-50 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                aria-label="الصفحة التالية"
            >
                <IoChevronForward className="text-lg" />
            </button>

            {/* Page Info */}
            <div className="mr-4 text-sm text-gray-600 hidden sm:block">
                <span className="font-medium">{currentPage}</span>
                <span className="mx-1">من</span>
                <span className="font-medium">{totalPages}</span>
            </div>
        </div>
    );
}
