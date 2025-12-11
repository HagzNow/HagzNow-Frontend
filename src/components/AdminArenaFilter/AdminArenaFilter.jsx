import { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import { CiSearch } from 'react-icons/ci';

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
    <div dir="rtl" className="w-full flex items-center gap-4 flex-wrap sm:flex-nowrap">
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          disabled={loading}
          className="min-w-[180px] w-full sm:w-auto rounded-xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-neutral-800 dark:text-white px-3 sm:px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors"
        >
          <option value="">نوع الرياضة - الكل</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="relative flex-1 min-w-[220px]">
          <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن ملعب ..."
            value={searchName}
            onChange={handleSearchChange}
            className="w-full py-2.5 pr-10 pl-3 rounded-xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
