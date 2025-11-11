import { useState, useEffect } from "react";
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

    // Debounced filter effect for search name (500ms delay)
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (onFilterChange) {
                onFilterChange({
                    categoryId: selectedCategory,
                    name: searchName.trim(),
                });
            }
        }, 500);

        // Cleanup function to clear timeout if user keeps typing
        return () => clearTimeout(debounceTimer);
    }, [searchName, selectedCategory, onFilterChange]);

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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };

    return (
        <div dir="rtl" className="w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-4">
                {/* Search Input */}
                <div className="relative flex-1 sm:flex-initial sm:w-full sm:max-w-md">
                    <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="ابحث عن ملعب..."
                        value={searchName}
                        onChange={handleSearchChange}
                        className="w-full py-3 pr-12 pl-4 rounded-xl focus:outline-none text-gray-700 bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                </div>

                {/* Sport Type Dropdown */}
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={loading}
                        className="w-full sm:w-auto sm:min-w-[200px] py-3 px-4 pr-10 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 font-medium hover:bg-white hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">كل أنواع الرياضة</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
