import { useEffect, useState } from "react";
import baseUrl from "../../../apis/config";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

const useCategories = () => {
  const endpoint = `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleSave = async (formData, editMode) => {
    try {
      if (editMode && formData.id) {
        await baseUrl.patch(`${endpoint}/${formData.id}`, { name: formData.name });
      } else {
        await baseUrl.post(endpoint, { name: formData.name });
      }
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    try {
      await baseUrl.delete(`${endpoint}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, fetchCategories, handleDelete, handleSave };
};

export default useCategories;
