import { useState, useEffect } from "react";
import { categoryService } from "../../../services/categoryService";
import { CiSearch } from "react-icons/ci";

export default function OwnerArenaFilter({ onFilterChange }) {
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
        <div dir="rtl" className="w-full bg-white shadow-sm rounded-xl p-4 flex items-center justify-center gap-6 flex-wrap">
            {/* Sport Type Dropdown */}
            <div className="flex items-center gap-2">
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
                        className="w-full py-2 pr-10 pl-3 rounded-md focus:outline-none text-black-600 bg-transparent border border-green-500 focus:border-green-600 placeholder-green-300 transition"
                    />
                </div>
            </div>
        </div>
    );
}
