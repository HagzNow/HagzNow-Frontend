import { FaStar, FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiSoccerBall } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OwnerArenaCard({
    title,
    location,
    category,
    price,
    rating = 0,
    image,
    id,
    status,
    isLoading = false,
}) {
    const navigate = useNavigate();

    function handleCardClick() {
        // Navigate to arena details or management page
        navigate(`/owner/arena/${id}`);
    }

    const stars = [1, 2, 3, 4, 5];

    // Loading skeleton
    if (isLoading) {
        return (
            <div dir="rtl" className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Image Skeleton */}
                <Skeleton height={192} className="w-full" />

                <div className="relative p-5 sm:p-6">
                    {/* Title Skeleton */}
                    <Skeleton height={28} className="mb-2" />

                    {/* Location Skeleton */}
                    <div className="flex items-center mt-3">
                        <Skeleton circle width={20} height={20} className="ml-2" />
                        <Skeleton width="80%" height={16} />
                    </div>

                    {/* Category Skeleton */}
                    <div className="flex items-center mt-2">
                        <Skeleton circle width={20} height={20} className="ml-2" />
                        <Skeleton width="60%" height={16} />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-4"></div>

                    {/* Rating and Price Skeleton */}
                    <div className="flex items-center justify-between mt-4">
                        <Skeleton width={120} height={32} className="rounded-full" />
                        <Skeleton width={80} height={40} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            dir="rtl"
            className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 ease-in-out group border border-gray-100 relative"
            onClick={handleCardClick}
        >
            {/* Status Badge */}
            {status && (
                <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${status === 'active'
                            ? 'bg-green-500 text-white'
                            : status === 'pending'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}>
                        {status === 'active' ? 'نشط' : status === 'pending' ? 'قيد المراجعة' : 'معطل'}
                    </span>
                </div>
            )}

            {/* Image Container */}
            <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 lg:h-48">
                <img
                    src={image}
                    alt="playground"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Container with Gradient Background on Hover */}
            <div className="relative p-5 sm:p-6 bg-white group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-teal-600 transition-all duration-500 ease-in-out">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate group-hover:text-white transition-colors duration-300 mb-2">
                    {title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mt-3 group-hover:text-white/95 transition-colors duration-300">
                    <IoLocationOutline className="ml-2 flex-shrink-0 text-base" />
                    <span className="truncate font-medium">{location}</span>
                </div>

                {/* Category */}
                {category && (
                    <div className="flex items-center text-gray-600 text-sm mt-2 group-hover:text-white/95 transition-colors duration-300">
                        <PiSoccerBall className="ml-2 flex-shrink-0 text-base" />
                        <span className="truncate font-medium">{category}</span>
                    </div>
                )}

                {/* Divider */}
                <div className="h-px bg-gray-200 my-4 group-hover:bg-white/30 transition-colors duration-300"></div>

                {/* Rating and Price Container */}
                <div className="flex items-center justify-between mt-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                            {rating}
                        </span>
                        <div className="flex items-center gap-0.5">
                            {stars.map((star, i) =>
                                rating >= star ? (
                                    <FaStar key={i} className="text-yellow-400 text-sm group-hover:text-yellow-200 transition-colors duration-300" />
                                ) : (
                                    <FaRegStar key={i} className="text-gray-300 text-sm group-hover:text-white/60 transition-colors duration-300" />
                                )
                            )}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline">
                            <span className="text-green-600 font-extrabold text-xl sm:text-2xl group-hover:text-white transition-colors duration-300">
                                {price}
                            </span>
                            <span className="text-gray-500 text-sm mr-1 group-hover:text-white/90 transition-colors duration-300 font-medium">
                                ج.م
                            </span>
                        </div>
                        <span className="text-gray-400 text-xs mt-0.5 group-hover:text-white/80 transition-colors duration-300">
                            /ساعة
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
