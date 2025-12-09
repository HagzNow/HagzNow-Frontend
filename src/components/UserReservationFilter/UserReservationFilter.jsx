import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { categoryService } from "../../services/categoryService";

export default function UserReservationFilter({ onFilterChange }) {
    const { t } = useTranslation();
    const [searchName, setSearchName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
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

    // Debounced filter effect for search name (500ms delay)
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (onFilterChange) {
                onFilterChange({
                    arenaName: searchName.trim(),
                    status: selectedStatus,
                    category: selectedCategory,
                });
            }
        }, 500);

        // Cleanup function to clear timeout if user keeps typing
        return () => clearTimeout(debounceTimer);
    }, [searchName, selectedStatus, selectedCategory, onFilterChange]);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };

    const statuses = [
        { value: '', label: 'كل الحالات' },
        { value: 'confirmed', label: 'مؤكدة' },
        { value: 'hold', label: 'قيد الانتظار' },
        { value: 'canceled', label: 'ملغاة' },
        { value: 'failed', label: 'فشلت' },
    ];

    return (
        <div dir="rtl" className="w-full bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-4">
                {/* Search Input */}
                <div className="relative flex-1 sm:flex-initial sm:w-full sm:max-w-md">
                    <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="ابحث عن ملعب..."
                        value={searchName}
                        onChange={handleSearchChange}
                        className="w-full py-3 pr-12 pl-4 rounded-xl focus:outline-none text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:bg-white dark:focus:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={loading}
                        className="w-full sm:w-auto sm:min-w-[200px] py-3 px-4 pr-10 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-gray-700 hover:border-green-500 dark:hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">كل أنواع الرياضة</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                    <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="w-full sm:w-auto sm:min-w-[200px] py-3 px-4 pr-10 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-gray-700 hover:border-green-500 dark:hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer"
                    >
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
