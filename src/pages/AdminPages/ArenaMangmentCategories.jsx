import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryTable from "@/components/AdminComponents/CategoriesManagment/CategoryTable";
import CategoryModal from "@/components/AdminComponents/CategoriesManagment/CategoryModal";
import useCategories from "@/components/AdminComponents/CategoriesManagment/useCategories";

const ArenaMangmentCategories = () => {
  const { categories, loading, fetchCategories, handleDelete, handleSave } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openAddModal = () => {
    setEditMode(false);
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditMode(true);
    setSelectedCategory(cat);
    setModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">إدارة الفئات</h2>
        <Button onClick={openAddModal} className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 ml-2" />
          إضافة فئة جديدة
        </Button>
      </div>

      <CategoryTable
        loading={loading}
        categories={categories}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <CategoryModal
        open={modalOpen}
        setOpen={setModalOpen}
        editMode={editMode}
        selectedCategory={selectedCategory}
        onSave={handleSave}
      />
    </div>
  );
};

export default ArenaMangmentCategories;
