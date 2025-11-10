import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import CategoryActions from "./CategoryActions";

const CategoryTable = ({ loading, categories, onEdit, onDelete }) => {
  if (loading) return <p className="text-center text-gray-500">جارِ التحميل...</p>;
  if (categories.length === 0)
    return <p className="text-center text-gray-500">لا توجد فئات حتى الآن.</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="py-3 px-4">اسم الفئة</th>
            <th className="py-3 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id || cat.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{cat.name}</td>
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
