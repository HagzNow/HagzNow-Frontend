import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function UserArenaFilter() {
    const [price, setPrice] = useState(50);
    const [rating, setRating] = useState(0);

    return (
        <div dir="ltr" className="w-full bg-white shadow-sm rounded-xl p-4 flex items-center justify-around gap-6 flex-wrap my-6">

            {/* Apply Button */}
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                تطبيق الفلاتر
            </button>

            {/* Price Range */}
            <div className="flex flex-col items-center">
                <span className="text-gray-600 text-sm mb-1">نطاق السعر</span>
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-40 accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 w-full">
                    <span>50 ج.م</span>
                    <span>200 ج.م</span>
                </div>
            </div>

            {/* Sport Type */}
            <button className="flex items-center border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition">
                <FaSearch className="ml-2" /> نوع الرياضة
            </button>

            {/* Date Picker */}
            <input
                type="date"
                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
            />

            {/* Rating */}
            <div className="flex flex-col items-center">
                <span className="text-gray-600 text-sm mb-1">التقييم الأدنى</span>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                        >
                            {star <= rating ? (
                                <FaStar className="text-green-600 text-xl" />
                            ) : (
                                <FaRegStar className="text-gray-400 text-xl" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
