import React from "react";
import Pagination from "@/components/Pagination/Pagination";
import UserStatusSwitch from "./UserStatusSwitch";

const UsersTable = ({ users, loading, page, totalPages, setPage, handleStatusToggle }) => {
  if (loading) return <p className="text-center text-gray-500">جارِ التحميل...</p>;
  if (users.length === 0) return <p className="text-center text-gray-500">لا توجد بيانات.</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-gray-800">قائمة المستخدمين</h3>
      </div>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="py-3 px-4">الاسم</th>
            <th className="py-3 px-4">البريد الإلكتروني</th>
            <th className="py-3 px-4">الهاتف</th>
            <th className="py-3 px-4">الدور</th>
            <th className="py-3 px-4 text-center">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{user.fName} {user.lName}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.phone}</td>
              <td className="py-3 px-4">
                {user.role === "owner" ? "مالك" : user.role === "admin" ? "مسؤول" : "لاعب"}
              </td>
              <td className="py-3 px-4">
                <UserStatusSwitch
                  status={user.status}
                  onToggle={() => handleStatusToggle(user.id, user.status !== "active")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default UsersTable;
