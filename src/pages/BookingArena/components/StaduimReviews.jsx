import { Star, Quote, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react';
import baseUrl from '@/apis/config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '@/assets/images/us.webp';

export default function StaduimReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const reviewsPerPage = 3;

  const getReviews = async (arenaId, page = 1, limit = 3) => {
    setLoading(true);
    try {
      const { data } = await baseUrl.get(`reviews/arena/${arenaId}?page=${page}&limit=${limit}`);
      setReviews(data.data.data);
      setTotalPages(data.data.totalPages);
      setTotal(data.data.total);
    } catch (error) {
      console.log(error);
      setReviews([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getReviews(id, currentPage, reviewsPerPage);
    }
  }, [id, currentPage]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 text-yellow-400 dark:text-yellow-500"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 text-yellow-400 dark:text-yellow-500"
        />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />);
    }

    return stars;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-EG', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-600 dark:group-hover:from-green-700 dark:group-hover:to-emerald-700 transition-all duration-500">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">تقييمات المستخدمين</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">آراء العملاء حول تجربتهم</p>
            </div>
          </div>
          {total > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              صفحة {currentPage} من {totalPages} ({total} تقييم)
            </div>
          )}
        </div>
      </div>

      {/* Reviews Slider */}
      <div className="p-6 relative">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">جاري التحميل...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">لا توجد تقييمات حتى الآن</p>
          </div>
        ) : (
          <>
            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  disabled={currentPage === 1 || loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg flex items-center justify-center hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500 dark:hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="السابق"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages || loading}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg flex items-center justify-center hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500 dark:hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="التالي"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </>
            )}

            {/* Reviews Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
              {reviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 hover:border-green-200 dark:hover:border-green-700 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-500 ease-in-out group/card"
                >
                  {/* Quote Icon */}
                  <div className="flex justify-end mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover/card:bg-green-200 dark:group-hover/card:bg-green-800/50 transition-colors duration-300">
                      <Quote className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-right line-clamp-3 group-hover/card:text-gray-800 dark:group-hover/card:text-gray-200 transition-colors duration-300">
                    "{review.content}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <img
                        src={review.userAvatar ? review.userAvatar : avatar}
                        alt={review.userName || 'User'}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm group-hover/card:border-green-200 dark:group-hover/card:border-green-700 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center border-2 border-white dark:border-gray-800">
                        <User className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover/card:text-green-700 dark:group-hover/card:text-green-400 transition-colors duration-300">
                        {review.userName}
                      </h3>
                      <div className="flex items-center gap-2 justify-end mt-1">
                        <div className="flex items-center gap-0.5">{renderStars(review.rating)}</div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{review.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 justify-start pt-4 border-t border-gray-100 dark:border-gray-700 group-hover/card:border-green-100 dark:group-hover/card:border-green-800/50 transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-green-600 dark:bg-green-500 w-8'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`انتقل إلى الصفحة ${page}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
