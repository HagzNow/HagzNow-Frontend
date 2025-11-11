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
            <div dir="rtl" className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Image Skeleton */}
                <Skeleton height={192} className="w-full" />

                <div className="p-5 sm:p-6">
                    {/* Title Skeleton */}
                    <Skeleton height={28} className="mb-2" />

                    {/* Location Skeleton */}
                    <div className="flex items-center mt-3">
                        <Skeleton circle width={20} height={20} className="ml-2" />
                        <Skeleton width="80%" height={16} />
                    </div>

                    {/* Sport Type Skeleton */}
                    <div className="flex items-center mt-2">
                        <Skeleton circle width={20} height={20} className="ml-2" />
                        <Skeleton width="60%" height={16} />
                    </div>

                    {/* Price Skeleton */}
                    <div className="flex items-center mt-2">
                        <Skeleton circle width={20} height={20} className="ml-2" />
                        <Skeleton width="40%" height={16} />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-4"></div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-col gap-2 mt-4">
                        <Skeleton height={40} className="w-full rounded-lg" />
                        <Skeleton height={40} className="w-full rounded-lg" />
                        <Skeleton height={40} className="w-full rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div dir="rtl" className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 ease-in-out group border border-gray-100">
            {/* Image Container */}
            <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 lg:h-48">
                <img
                    src={image}
                    alt="arena"
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

                {/* Sport Type */}
                <div className="flex items-center text-gray-600 text-sm mt-2 group-hover:text-white/95 transition-colors duration-300">
                    <PiSoccerBall className="ml-2 flex-shrink-0 text-base" />
                    <span className="truncate font-medium">{sport}</span>
                </div>

                {/* Price */}
                <div className="flex items-center text-gray-600 text-sm mt-2 group-hover:text-white/95 transition-colors duration-300">
                    <BiDollar className="ml-2 flex-shrink-0 text-base" />
                    <span className="font-medium">{price} جنيه/ساعة</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-4 group-hover:bg-white/30 transition-colors duration-300"></div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-4">
                    {/* Approve Button */}
                    <button
                        onClick={onApprove}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-white group-hover:text-green-600 shadow-sm hover:shadow-md"
                    >
                        {isProcessing ? "جاري المعالجة..." : "موافقة"}
                    </button>

                    {/* Reject Button */}
                    <button
                        onClick={onReject}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-white group-hover:text-red-600 shadow-sm hover:shadow-md"
                    >
                        {isProcessing ? "جاري المعالجة..." : "رفض"}
                    </button>

                    {/* View More Button */}
                    <button
                        onClick={handleViewMore}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-white/20 group-hover:text-white group-hover:border-white/50 shadow-sm hover:shadow-md"
                    >
                        عرض المزيد
                    </button>
                </div>
            </div>
        </div>
    );
}
