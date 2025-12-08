import { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import { CiSearch } from "react-icons/ci";

export default function AdminArenaFilter({ onFilterChange }) {
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
        <div dir="rtl" className="w-full bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 rounded-xl p-4 my-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 flex items-center justify-center gap-4 sm:gap-6 flex-wrap border border-gray-100 dark:border-gray-700 transition-colors">
            {/* Sport Type Dropdown */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    disabled={loading}
                    className="border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 min-w-[150px] w-full sm:w-auto"
                >
                    <option value="">نوع الرياضة - الكل</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div className="relative w-full sm:w-[240px] md:w-[280px] lg:w-[300px]">
                    <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="ابحث عن ملعب ..."
                        value={searchName}
                        onChange={handleSearchChange}
                        className="w-full py-2 pr-10 pl-3 rounded-md focus:outline-none text-gray-900 dark:text-white bg-transparent dark:bg-gray-700 border border-green-500 dark:border-green-600 focus:border-green-600 dark:focus:border-green-500 placeholder-green-300 dark:placeholder-gray-500 transition"
                    />
                </div>
            </div>
        </div>
    );
}
