import { useState, useEffect } from 'react';
import { categoryService } from '../../../services/categoryService';
import { CiSearch } from 'react-icons/ci';

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
    <div dir="rtl" className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Sport Type Dropdown */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          disabled={loading}
          className="w-full sm:w-[180px] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-2 rounded-lg hover:border-green-500 dark:hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 transition-all text-sm"
        >
          <option value="">نوع الرياضة - الكل</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <div className="relative flex-1 w-full sm:w-auto sm:min-w-[250px]">
          <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن ملعب..."
            value={searchName}
            onChange={handleSearchChange}
            className="w-full py-2 pr-9 pl-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-600 transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
}
