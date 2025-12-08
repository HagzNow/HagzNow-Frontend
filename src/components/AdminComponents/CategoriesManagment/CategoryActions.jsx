import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const CategoryActions = ({ onEdit, onDelete }) => (
  <div className="flex justify-center gap-3">
    <button
      onClick={onEdit}
      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
      title="تعديل"
    >
      <Pencil size={18} />
    </button>
    <button
      onClick={onDelete}
      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
      title="حذف"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

export default CategoryActions;
