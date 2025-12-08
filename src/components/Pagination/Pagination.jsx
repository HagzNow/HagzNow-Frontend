import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  // Convert Latin digits to Arabic-Indic digits
  const toArabic = (val) => String(val).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

  // Show all pages if 5 or less, otherwise show smart pagination
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Show pages around current page
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    // Adjust if we're near the start
    if (currentPage <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    }
    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
      end = totalPages;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center gap-2 sm:gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 max-w-fit mx-auto"
    >
      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600 dark:text-gray-300 hidden sm:flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl">
        <span className="font-semibold text-green-600 dark:text-green-400">{toArabic(currentPage)}</span>
        <span className="text-gray-500 dark:text-gray-400">من</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300">{toArabic(totalPages)}</span>
      </div>

      {/* Previous Button (goes to lower page number) */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:border-green-500 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 font-medium group"
        aria-label={`الصفحة السابقة ${toArabic(currentPage - 1)}`}
      >
        <ChevronRight className="text-lg group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105
                            ${
                              currentPage === page
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white border-2 border-green-500 dark:border-green-600 shadow-lg scale-110'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:border-green-300 dark:hover:border-green-600 hover:text-green-600 dark:hover:text-green-400'
                            }`}
            aria-label={`الصفحة ${toArabic(page)}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {toArabic(page)}
          </button>
        ))}

        {/* Show ellipsis and first page if not in visible range */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:border-green-300 dark:hover:border-green-600 hover:text-green-600 dark:hover:text-green-400 font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105"
              aria-label={`الصفحة ${toArabic(1)}`}
            >
              {toArabic(1)}
            </button>
            {visiblePages[0] > 2 && <span className="px-2 text-gray-400 dark:text-gray-500 font-medium">...</span>}
          </>
        )}

        {/* Show ellipsis and last page if not in visible range */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400 dark:text-gray-500 font-medium">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:border-green-300 dark:hover:border-green-600 hover:text-green-600 dark:hover:text-green-400 font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105"
              aria-label={`الصفحة ${toArabic(totalPages)}`}
            >
              {toArabic(totalPages)}
            </button>
          </>
        )}
      </div>

      {/* Next Button (goes to higher page number) */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:border-green-500 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 font-medium group"
        aria-label={`الصفحة التالية ${toArabic(currentPage + 1)}`}
      >
        <ChevronLeft className="text-lg group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Mobile Page Info */}
      <div className="sm:hidden flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-xl">
        <span className="font-semibold text-green-600 dark:text-green-400 text-sm">{toArabic(currentPage)}</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">من</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{toArabic(totalPages)}</span>
      </div>
    </div>
  );
}
