import { FaStar, FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiSoccerBall } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function ArenaCard({
  title,
  location,
  category,
  price,
  averageRating,
  image,
  id,
  depositePercent,
}) {
  const navigate = useNavigate();
  function handleCardClick() {
    // Navigate to booking page
    navigate(`/booking/${id}`);
  }
  const stars = [1, 2, 3, 4, 5];


  return (
    <div
      dir="rtl"
      className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 ease-in-out group border border-gray-100 dark:border-gray-700"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 lg:h-48">
        <img
          src={image}
          alt="playground"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Container with Gradient Background on Hover */}
      <div className="relative p-5 sm:p-6 bg-white dark:bg-gray-800 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-teal-600 dark:group-hover:from-green-500 dark:group-hover:via-emerald-500 dark:group-hover:to-teal-500 transition-all duration-500 ease-in-out">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-white dark:group-hover:text-white transition-colors duration-300 mb-2">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-3 group-hover:text-white/95 dark:group-hover:text-white/95 transition-colors duration-300">
          <IoLocationOutline className="ml-2 flex-shrink-0 text-base text-gray-600 dark:text-gray-300 group-hover:text-white/90 dark:group-hover:text-white/90 transition-colors duration-300" />
          <span className="truncate font-medium">{location}</span>
        </div>

        {/* Category */}
        {category && (
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-2 group-hover:text-white/95 dark:group-hover:text-white/95 transition-colors duration-300">
            <PiSoccerBall className="ml-2 flex-shrink-0 text-base text-gray-600 dark:text-gray-300 group-hover:text-white/90 dark:group-hover:text-white/90 transition-colors duration-300" />
            <span className="truncate font-medium">{category}</span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 group-hover:bg-white/30 dark:group-hover:bg-white/30 transition-colors duration-300"></div>

        {/* Rating and Price Container */}
        <div className="flex items-center justify-between mt-4">
          {/* Rating */}
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-full group-hover:bg-white/20 dark:group-hover:bg-white/20 transition-colors duration-300">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
              {averageRating}
            </span>
            <div className="flex items-center gap-0.5">
              {stars.map((star, i) =>
                averageRating >= star ? (
                  <FaStar
                    key={i}
                    className="text-yellow-400 dark:text-yellow-500 text-sm group-hover:text-yellow-200 dark:group-hover:text-yellow-300 transition-colors duration-300"
                  />
                ) : (
                  <FaRegStar
                    key={i}
                    className="text-gray-300 dark:text-gray-600 text-sm group-hover:text-white/60 dark:group-hover:text-white/60 transition-colors duration-300"
                  />
                )
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              <span className="text-green-600 dark:text-green-400 font-extrabold text-xl sm:text-2xl group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                {price}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm mr-1 group-hover:text-white/90 dark:group-hover:text-white/90 transition-colors duration-300 font-medium">
                ج.م
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 group-hover:text-white/80 dark:group-hover:text-white/80 transition-colors duration-300">
                / ساعة
              </span>
            </div>

            {/* Deposit */}
            {depositePercent && (
              <span className="mt-1 text-xs font-medium text-orange-500 dark:text-orange-400 group-hover:text-white/90 transition-colors duration-300">
                مقدم: {(price * depositePercent) / 100} ج.م / ساعه
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
