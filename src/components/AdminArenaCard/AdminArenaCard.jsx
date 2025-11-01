import { IoLocationOutline } from "react-icons/io5";
import { PiSoccerBall } from "react-icons/pi";
import { BiDollar } from "react-icons/bi";

export default function AdminArenaCard({ title, location, sport, price, image, onApprove, onReject, onViewMore, isProcessing = false }) {
    return (
        <div dir="rtl" className="w-100 bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Image */}
            <img
                src={image}
                alt="arena"
                className="w-full h-40 object-cover"
            />

            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <IoLocationOutline className="ml-2 text-gray-500 text-lg" />
                    <span>{location}</span>
                </div>

                {/* Sport Type */}
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <PiSoccerBall className="ml-2 text-gray-500 text-lg" />
                    <span>{sport}</span>
                </div>

                {/* Price */}
                <div className="flex items-center text-gray-600 text-sm mb-4">
                    <BiDollar className="ml-2 text-gray-500 text-lg" />
                    <span>{price} جنيه/ساعة</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {/* Approve Button */}
                    <button
                        onClick={onApprove}
                        disabled={isProcessing}
                        className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? "جاري المعالجة..." : "موافقة"}
                    </button>

                    {/* Reject Button */}
                    <button
                        onClick={onReject}
                        disabled={isProcessing}
                        className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"

                    >
                        {isProcessing ? "جاري المعالجة..." : "رفض"}
                    </button>

                    {/* View More Button */}
                    <button
                        onClick={onViewMore}
                        disabled={isProcessing}
                        className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        عرض المزيد
                    </button>

                </div>
            </div>
        </div>
    );
}
