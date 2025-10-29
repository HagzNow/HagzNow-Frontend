import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";
import { categoryService } from "../../services/categoryService";
import { CiSearch } from "react-icons/ci";

export default function UserArenaFilter({ onFilterChange }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchName, setSearchName] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyFilter = () => {
        if (onFilterChange) {
            onFilterChange({
                categoryId: selectedCategory,
                name: searchName.trim(),
            });
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleApplyFilter();
        }
    };

    return (
        <div dir="rtl" className="w-full bg-white shadow-sm rounded-xl p-4 flex items-center justify-center gap-6 flex-wrap my-6">

            {/* Sport Type Dropdown */}
            <div className="flex items-center gap-2">
                {/* <FaSearch className="text-green-600" /> */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    disabled={loading}
                    className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[150px]"
                >
                    <option value="">نوع الرياضة - الكل</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div className="relative w-full sm:w-[240px] md:w-[280px] lg:w-[300px]">
                    <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="ابحث عن ملعب ..."
                        value={searchName}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        className="w-full py-2 pr-10 pl-3 rounded-md focus:outline-none text-black-600 bg-transparent border border-green-500 focus:border-green-600 placeholder-green-300 transition"
                    />
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={handleApplyFilter}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
                تطبيق الفلاتر
            </button>

            {/* Price Range */}
            {/* <div className="flex flex-col items-center">
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
            </div> */}

            {/* Date Picker */}
            {/* <input
                type="date"
                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
            /> */}

            {/* Rating */}
            {/* <div className="flex flex-col items-center">
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
            </div> */}
        </div>
    );
}
