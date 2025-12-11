import { useState, useMemo } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { PiSoccerBall } from 'react-icons/pi';
import { BiDollar } from 'react-icons/bi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AdminArenaCard({
  id,
  title,
  location,
  sport,
  price,
  image,
  images = [],
  onApprove,
  onReject,
  onView,
  isProcessing = false,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const gallery = useMemo(() => {
    const base = [];
    if (image) base.push(image);
    if (images && images.length) {
      images.forEach((img) => {
        if (!base.includes(img)) base.push(img);
      });
    }
    return base;
  }, [image, images]);
  const [slide, setSlide] = useState(0);

  const nextSlide = (e) => {
    e.stopPropagation();
    setSlide((s) => (gallery.length ? (s + 1) % gallery.length : 0));
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    setSlide((s) => (gallery.length ? (s - 1 + gallery.length) % gallery.length : 0));
  };

  const handleViewMore = (e) => {
    e.stopPropagation();
    if (typeof onView === 'function') {
      onView();
      return;
    }
    // keep within admin layout without filtering out the list
    navigate(`/admin/admin-arena-requests`);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse transition-colors"
      >
        {/* Image Skeleton */}
        <div className="h-48 sm:h-52 bg-gray-200 dark:bg-gray-700"></div>

        <div className="p-6">
          {/* Title Skeleton */}
          <Skeleton height={28} className="mb-4 rounded-lg" />

          {/* Info Skeleton */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Skeleton circle width={18} height={18} className="ml-2" />
              <Skeleton width="75%" height={16} className="rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton circle width={18} height={18} className="ml-2" />
              <Skeleton width="60%" height={16} className="rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton circle width={18} height={18} className="ml-2" />
              <Skeleton width="45%" height={16} className="rounded" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-5"></div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton height={44} className="w-full rounded-xl" />
            <Skeleton height={44} className="w-full rounded-xl" />
            <Skeleton height={44} className="w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      onClick={handleViewMore}
      className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 overflow-hidden cursor-pointer group border border-gray-200 dark:border-gray-700 relative transition-colors"
    >
      {/* Image Slider */}
      <div className="relative overflow-hidden h-52 sm:h-56 md:h-60 lg:h-52 bg-gray-100 dark:bg-gray-800">
        {gallery.length > 0 ? (
          <>
            <img
              src={gallery[slide]}
              alt="arena"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 -translate-y-1/2 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 -translate-y-1/2 left-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                  {gallery.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-2.5 w-2.5 rounded-full border border-white/60 ${
                        idx === slide ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-neutral-500 dark:text-gray-400">
            لا توجد صورة
          </div>
        )}
      </div>

      {/* Content Container with Gradient Background on Hover */}
      <div className="relative p-6 bg-white dark:bg-gray-800 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-teal-600 dark:group-hover:from-green-700 dark:group-hover:via-emerald-700 dark:group-hover:to-teal-700 transition-all duration-500 ease-in-out">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white truncate group-hover:text-white dark:group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
          {title}
        </h3>

        {/* Info Items */}
        <div className="space-y-3 mb-4">
          {/* Location */}
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm group-hover:text-white/95 dark:group-hover:text-white/95 transition-colors duration-300">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20 dark:group-hover:bg-white/20 flex items-center justify-center ml-2 transition-colors duration-300">
              <IoLocationOutline className="text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white text-base" />
            </div>
            <span className="truncate font-medium">{location || 'غير محدد'}</span>
          </div>

          {/* Sport Type */}
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm group-hover:text-white/95 dark:group-hover:text-white/95 transition-colors duration-300">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20 dark:group-hover:bg-white/20 flex items-center justify-center ml-2 transition-colors duration-300">
              <PiSoccerBall className="text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white text-base" />
            </div>
            <span className="truncate font-medium">{sport || 'غير محدد'}</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm group-hover:text-white/95 dark:group-hover:text-white/95 transition-colors duration-300">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 group-hover:bg-white/20 dark:group-hover:bg-white/20 flex items-center justify-center ml-2 transition-colors duration-300">
              <BiDollar className="text-green-600 dark:text-green-400 group-hover:text-white dark:group-hover:text-white text-base" />
            </div>
            <span className="font-bold text-green-600 dark:text-green-400 group-hover:text-white dark:group-hover:text-white">
              {price}{' '}
              <span className="font-medium text-gray-500 dark:text-gray-400 group-hover:text-white/80 dark:group-hover:text-white/80">
                جنيه/ساعة
              </span>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-5 group-hover:bg-white/40 dark:group-hover:bg-white/40 transition-colors duration-300"></div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Approve Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApprove();
            }}
            disabled={isProcessing}
            className="btn-approve w-full py-3 px-4 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.02]"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>جاري المعالجة...</span>
              </>
            ) : (
              <span>✓ موافقة</span>
            )}
          </button>

          {/* Reject Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReject();
            }}
            disabled={isProcessing}
            className="btn-reject w-full py-3 px-4 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:scale-[1.02]"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>جاري المعالجة...</span>
              </>
            ) : (
              <span>✕ رفض</span>
            )}
          </button>

          {/* View More Button */}
          {/* <button
                onClick={(e) => {
                e.stopPropagation();
                handleViewMore();
                }}
                disabled={isProcessing}
                className="btn-view w-full py-3 px-4 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md hover:scale-[1.02]"
            >
                <span>عرض المزيد</span>
                <svg
                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button> */}
        </div>
      </div>
    </div>
  );
}
