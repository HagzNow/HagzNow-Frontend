import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  Filter,
  Users,
  Shield,
  UserCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import baseUrl from "../../apis/config";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    owners: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
  });
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  });

  const endpoint = `${API_BASE_URL}${API_ENDPOINTS.USERS}`;

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(endpoint);
      const data = res.data.data || res.data || [];
      setUsers(data);
      setStats({
        total: data.length,
        owners: data.filter((u) => u.role === "owner").length,
        users: data.filter((u) => u.role === "user").length,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.fName]: e.target.value });
  };

  // Handle Select
  const handleSelect = (fName, value) => {
    setFormData({ ...formData, [fName]: value });
  };

  // Submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${endpoint}/${selectedUser.id}`, formData);
      } else {
        await axios.post(endpoint, formData);
      }
      fetchUsers();
      setModalOpen(false);
      setEditMode(false);
      setFormData({
        fName: "",
        lName: "",
        email: "",
        phone: "",
        role: "user",
        status: "active",
      });
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Filters
  const filteredUsers = users.filter(
    (u) =>
      (!filters.role || u.role === filters.role) &&
      (!filters.status || u.status === filters.status)
  );

  // Open Add Modal
  const openAddModal = () => {
    setEditMode(false);
    setFormData({
      fName: "",
      lName: "",
      email: "",
      phone: "",
      role: "user",
      status: "active",
    });
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setFormData({
      fName: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        إدارة المستخدمين
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
          <Users className="text-green-600 mb-2" />
          <p className="text-gray-500">إجمالي المستخدمين</p>
          <h3 className="text-xl font-bold">{stats.total}</h3>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
          <Shield className="text-blue-600 mb-2" />
          <p className="text-gray-500">إجمالي المالكين</p>
          <h3 className="text-xl font-bold">{stats.owners}</h3>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
          <UserCheck className="text-emerald-600 mb-2" />
          <p className="text-gray-500">إجمالي اللاعبين</p>
          <h3 className="text-xl font-bold">{stats.users}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800 flex items-center gap-2">
            <Filter size={18} /> فلتر المستخدمين
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Select
            onValueChange={(v) => setFilters({ ...filters, role: v })}
            value={filters.role}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر دور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">لاعب</SelectItem>
              <SelectItem value="owner">مالك</SelectItem>
              <SelectItem value="admin">مسؤول</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(v) => setFilters({ ...filters, status: v })}
            value={filters.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر حالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-gray-800">قائمة المستخدمين</h3>
          <Button
            onClick={openAddModal}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="ml-2" size={16} /> إضافة مستخدم
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">جارِ التحميل...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد بيانات.</p>
        ) : (
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-700">
                <th className="py-3 px-4">الاسم</th>
                <th className="py-3 px-4">البريد الإلكتروني</th>
                <th className="py-3 px-4">الهاتف</th>
                <th className="py-3 px-4">الدور</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {user.fName} {user.lName}
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">
                    {user.role === "owner"
                      ? "مالك"
                      : user.role === "admin"
                      ? "مسؤول"
                      : user.role === "user"
                      ? "لاعب" 
                      : "غير محدد"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-green-600 hover:text-green-800"
                        title="تعديل"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              name="name"
              value={formData.fName + " " + formData.lName}
              onChange={handleChange}
              placeholder="الاسم"
              required
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني"
              required
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="رقم الهاتف"
              required
            />
            <Select
              value={formData.role}
              onValueChange={(v) => handleSelect("role", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">لاعب</SelectItem>
                <SelectItem value="owner">مالك</SelectItem>
                <SelectItem value="admin">مسؤول</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={formData.status}
              onValueChange={(v) => handleSelect("status", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 w-full"
              >
                {editMode ? "حفظ التعديل" : "إضافة"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
