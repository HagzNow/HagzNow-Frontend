import { useEffect, useState } from "react";
import baseUrl from "../../../apis/config";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
  const confirm = await Swal.fire({
    title: "هل أنت متأكد؟",
    text: "لا يمكن التراجع بعد الحذف!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم، احذفها",
    cancelButtonText: "إلغاء",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });
  if (!confirm.isConfirmed) return; 

    try {
      await baseUrl.delete(`${endpoint}/${id}`);
      fetchCategories();
      toast.success("تم حذف الفئة بنجاح.");
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف الفئة.");
      console.log(err);
      
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, fetchCategories, handleDelete, handleSave };
};

export default useCategories;
