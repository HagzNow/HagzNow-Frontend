import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import baseUrl from "../../apis/config";


const ArenaMangmentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "" });

  const endpoint = `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`;

  // ✅ Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await baseUrl.get(endpoint);
      setCategories(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Edit category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting:", formData);

      if (editMode && formData.id) {
        // ✅ Use correct id (_id or id)
        await baseUrl.patch(`${endpoint}/${formData.id}`, { name: formData.name });
      } else {
        await baseUrl.post(endpoint, { name: formData.name });
      }

      fetchCategories();
      setModalOpen(false);
      setEditMode(false);
      setFormData({ id: "", name: "" });
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  // ✅ Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // ✅ Open edit modal
  const openEditModal = (cat) => {
    console.log("Editing category:", cat); // 🔍 debug
    setEditMode(true);
    setSelectedCategory(cat);
    setFormData({
      id: cat._id || cat.id, // ✅ يأخذ أي id متاح
      name: cat.name || "",
    });
    setModalOpen(true);
  };

  // ✅ Open add modal
  const openAddModal = () => {
    setEditMode(false);
    setFormData({ id: "", name: "" });
    setModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">إدارة الفئات</h2>
        <Button onClick={openAddModal} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة فئة جديدة
        </Button>
      </div>

      {/* ✅ Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        {loading ? (
          <p className="text-center text-gray-500">جارِ التحميل...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد فئات حتى الآن.</p>
        ) : (
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-700">
                <th className="py-3 px-4">اسم الفئة</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat._id || cat.id || cat.name}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{cat.name}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="text-green-600 hover:text-green-800"
                        title="تعديل"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id || cat.id)}
                        className="text-red-600 hover:text-red-800"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>{editMode ? "تعديل الفئة" : "إضافة فئة جديدة"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block mb-1 text-gray-700">اسم الفئة</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسم الفئة"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editMode ? "حفظ التعديل" : "إضافة"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArenaMangmentCategories;
