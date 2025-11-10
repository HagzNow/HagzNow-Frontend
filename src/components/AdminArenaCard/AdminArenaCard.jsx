import { IoLocationOutline } from "react-icons/io5";
import { PiSoccerBall } from "react-icons/pi";
import { BiDollar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AdminArenaCard({ id, title, location, sport, price, image, onApprove, onReject, isProcessing = false, isLoading = false }) {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/booking/${id}`);
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <div dir="rtl" className="w-full bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
                {/* Image Skeleton */}
                <Skeleton height={150} className="sm:h-40 md:h-44 lg:h-40" />

                <div className="p-3 sm:p-4">
                    {/* Title Skeleton */}
                    <Skeleton height={24} className="mb-2 sm:mb-3" />

                    {/* Location Skeleton */}
                    <div className="flex items-center mb-1.5 sm:mb-2">
                        <Skeleton circle width={20} height={20} className="ml-1.5 sm:ml-2" />
                        <Skeleton width="80%" height={16} />
                    </div>

                    {/* Sport Type Skeleton */}
                    <div className="flex items-center mb-1.5 sm:mb-2">
                        <Skeleton circle width={20} height={20} className="ml-1.5 sm:ml-2" />
                        <Skeleton width="60%" height={16} />
                    </div>

                    {/* Price Skeleton */}
                    <div className="flex items-center mb-3 sm:mb-4">
                        <Skeleton circle width={20} height={20} className="ml-1.5 sm:ml-2" />
                        <Skeleton width="40%" height={16} />
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Skeleton height={40} className="flex-1" />
                        <Skeleton height={40} className="flex-1" />
                        <Skeleton height={40} className="flex-1" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div dir="rtl" className="w-full bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:bg-green-600 transition-all duration-300 ease-in-out group">
            {/* Image */}
            <div className="overflow-hidden">
                <img
                    src={image}
                    alt="arena"
                    className="w-full h-36 sm:h-40 md:h-44 lg:h-40 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
            </div>

            <div className="p-3 sm:p-4">
                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 truncate group-hover:text-white transition-colors duration-200">{title}</h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1.5 sm:mb-2 group-hover:text-white transition-colors duration-200">
                    <IoLocationOutline className="ml-1.5 sm:ml-2 text-base sm:text-lg flex-shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Sport Type */}
                <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1.5 sm:mb-2 group-hover:text-white transition-colors duration-200">
                    <PiSoccerBall className="ml-1.5 sm:ml-2 text-base sm:text-lg flex-shrink-0" />
                    <span className="truncate">{sport}</span>
                </div>

                {/* Price */}
                <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 group-hover:text-white transition-colors duration-200">
                    <BiDollar className="ml-1.5 sm:ml-2 text-base sm:text-lg flex-shrink-0" />
                    <span>{price} جنيه/ساعة</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                    {/* Approve Button */}
                    <button
                        onClick={onApprove}
                        disabled={isProcessing}
                        className="flex-1 py-2 px-3 sm:px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-white group-hover:text-green-600 group-hover:border group-hover:border-white"
                    >
                        {isProcessing ? "جاري المعالجة..." : "موافقة"}
                    </button>

                    {/* Reject Button */}
                    <button
                        onClick={onReject}
                        disabled={isProcessing}
                        className="flex-1 py-2 px-3 sm:px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:text-white group-hover:border group-hover:border-white"

                    >
                        {isProcessing ? "جاري المعالجة..." : "رفض"}
                    </button>

                    {/* View More Button */}
                    <button
                        onClick={handleViewMore}
                        disabled={isProcessing}
                        className="flex-1 py-2 px-3 sm:px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-white group-hover:text-gray-700 group-hover:border-white"
                    >
                        عرض المزيد
                    </button>

                </div>
            </div>
        </div>
    );
}
