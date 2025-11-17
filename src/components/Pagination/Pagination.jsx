import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage = 1, totalPages = 4, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // In RTL, keep natural order (1 → totalPages) and layout will flip
  const reversedPages = pages;

  // Utility: convert Latin digits to Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩)
  //   const toArabicNumerals = (value) => {
  //     const map = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
  //     return String(value).replace(/\d/g, (d) => String.fromCharCode(parseInt(map[d].slice(2), 10) + 0));
  //   };

  // Simpler and safer implementation of mapping digits
  // (fallback if above method becomes confusing):
  const toArabic = (val) => String(val).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

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
    <div
      dir="rtl"
      className="flex items-center justify-center gap-2 sm:gap-3 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 max-w-fit mx-auto"
    >
      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600 hidden sm:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
        <span className="font-semibold text-green-600">{toArabic(currentPage)}</span>
        <span className="text-gray-500">من</span>
        <span className="font-semibold text-gray-700">{toArabic(totalPages)}</span>
      </div>

      {/* Previous Button (in RTL previous is to the right) */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 font-medium group"
        aria-label={`الصفحة السابقة ${toArabic(currentPage)}`}
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
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-2 border-green-500 shadow-lg scale-110'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 hover:text-green-600'
                            }`}
            aria-label={`الصفحة ${toArabic(page)}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {toArabic(page)}
          </button>
        ))}

        {/* Show ellipsis if there are more pages at the start */}
        {currentPage < totalPages - 2 && totalPages > 5 && <span className="px-2 text-gray-400 font-medium">...</span>}

        {/* Always show first page if not in visible pages */}
        {!visiblePages.includes(totalPages) && totalPages > 5 && (
          <>
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-gray-700 border-2 border-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 hover:text-green-600 font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105"
              aria-label={`الصفحة ${toArabic(totalPages)}`}
            >
              {toArabic(totalPages)}
            </button>
            {totalPages > 1 && <span className="px-2 text-gray-400 font-medium">...</span>}
          </>
        )}

        {/* Show ellipsis if there are more pages at the end */}
        {currentPage > 3 && totalPages > 5 && <span className="px-2 text-gray-400 font-medium">...</span>}

        {/* Always show last page if not in visible pages */}
        {!visiblePages.includes(1) && totalPages > 5 && (
          <button
            onClick={() => onPageChange(1)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-gray-700 border-2 border-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 hover:text-green-600 font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105"
            aria-label={`الصفحة ${toArabic(1)}`}
          >
            {toArabic(1)}
          </button>
        )}
      </div>

      {/* Next Button (in RTL next is to the left) */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white text-gray-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 font-medium group"
        aria-label={`الصفحة التالية ${toArabic(currentPage)}`}
      >
        <ChevronLeft className="text-lg group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Mobile Page Info */}
      <div className="sm:hidden flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
        <span className="font-semibold text-green-600 text-sm">{toArabic(currentPage)}</span>
        <span className="text-gray-500 text-sm">من</span>
        <span className="font-semibold text-gray-700 text-sm">{toArabic(totalPages)}</span>
      </div>
    </div>
  );
}
