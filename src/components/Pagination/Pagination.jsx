import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Pagination({ currentPage = 1, totalPages = 4, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div dir="ltr" className="flex items-center justify-center gap-2 my-8">
            {/* Previous Button */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <IoChevronBack className="text-gray-600" />
            </button>

            {/* Page Numbers */}
            {pages.reverse().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-medium transition-colors
                        ${currentPage === page
                            ? 'bg-green-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <IoChevronForward className="text-gray-600" />
            </button>
        </div>
    );
}
