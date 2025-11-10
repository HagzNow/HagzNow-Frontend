import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const CategoryActions = ({ onEdit, onDelete }) => (
  <div className="flex justify-center gap-3">
    <button
      onClick={onEdit}
      className="text-green-600 hover:text-green-800"
      title="تعديل"
    >
      <Pencil size={18} />
    </button>
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-800"
      title="حذف"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

export default CategoryActions;
