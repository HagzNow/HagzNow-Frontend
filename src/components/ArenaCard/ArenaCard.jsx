import { FaStar, FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiSoccerBall } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function ArenaCard({
    title,
    location,
    category,
    price,
    rating,
    image,
    id,
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
            className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleCardClick}
        >
            {/* Image */}
            <img src={image} alt="playground" className="w-full h-40 sm:h-44 md:h-48 lg:h-40 object-cover" />

            <div className="p-3 sm:p-4">
                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{title}</h3>

                {/* Location */}
                <div className="flex items-center text-gray-500 text-xs sm:text-sm mt-1">
                    <IoLocationOutline className="ml-1 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Category */}
                {category && (
                    <div className="flex items-center text-gray-500 text-xs sm:text-sm mt-1">
                        <PiSoccerBall className="ml-1 text-gray-500 flex-shrink-0" />
                        <span className="truncate">{category}</span>
                    </div>
                )}

                {/* Rating */}
                <div className="flex items-center mt-2 gap-0.5 sm:gap-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">{rating}</span>
                    {stars.map((star, i) =>
                        rating >= star ? (
                            <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                        ) : (
                            <FaRegStar key={i} className="text-gray-300 text-sm sm:text-base" />
                        )
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-end mt-2 sm:mt-3">
                    <span className="text-green-600 font-bold text-lg sm:text-xl">{price} ج.م</span>
                    <span className="text-gray-500 text-xs sm:text-sm mr-1">/ساعة</span>
                </div>
            </div>
        </div>
    );
}
