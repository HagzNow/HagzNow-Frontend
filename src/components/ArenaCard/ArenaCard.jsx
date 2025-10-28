import { FaStar, FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiSoccerBall } from "react-icons/pi";

export default function ArenaCard({ title, location, category, price, rating, image }) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div dir="rtl" className="w-100 bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Image */}
            <img
                src={image}
                alt="playground"
                className="w-full h-50 object-cover"
            />

            <div className="p-4">

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

                {/* Location */}
                <div className="flex items-center text-gray-500 text-sm mt-1">
                    <IoLocationOutline className="ml-1 text-gray-500" />
                    {location}
                </div>

                {/* Category */}
                {category && (
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                        <PiSoccerBall className="ml-1 text-gray-500" />
                        {category}
                    </div>
                )}

                {/* Rating */}
                <div className="flex items-center mt-2 gap-1">
                    <span className="text-sm font-medium text-gray-600">{rating}</span>
                    {stars.map((star, i) =>
                        rating >= star ? (
                            <FaStar key={i} className="text-yellow-400" />
                        ) : (
                            <FaRegStar key={i} className="text-gray-300" />
                        )
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-end mt-3">
                    <span className="text-green-600 font-bold text-xl">{price} ج.م</span>
                    <span className="text-gray-500 text-sm mr-1">/ساعة</span>
                </div>
            </div>
        </div>
    );
}
