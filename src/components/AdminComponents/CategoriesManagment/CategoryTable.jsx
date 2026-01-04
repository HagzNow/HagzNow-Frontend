import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import CategoryActions from "./CategoryActions";

const CategoryTable = ({ loading, categories, onEdit, onDelete }) => {
  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">جارِ التحميل...</p>;
  if (categories.length === 0)
    return <p className="text-center text-gray-500 dark:text-gray-400">لا توجد فئات حتى الآن.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/50 p-4 border border-gray-200 dark:border-gray-700 transition-colors">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <th className="py-3 px-4">اسم الفئة</th>
            <th className="py-3 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id || cat.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{cat.name}</td>
              <td className="py-3 px-4 text-center">
                <CategoryActions
                  onEdit={() => onEdit(cat)}
                  onDelete={() => onDelete(cat._id || cat.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
