import React from "react";
import Pagination from "@/components/Pagination/Pagination";
import UserStatusSwitch from "./UserStatusSwitch";

const UsersTable = ({ users, loading, page, totalPages, setPage, handleStatusToggle }) => {
  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">جارِ التحميل...</p>;
  if (users.length === 0) return <p className="text-center text-gray-500 dark:text-gray-400">لا توجد بيانات.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/50 p-4 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">قائمة المستخدمين</h3>
      </div>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <th className="py-3 px-4">الاسم</th>
            <th className="py-3 px-4">البريد الإلكتروني</th>
            <th className="py-3 px-4">الهاتف</th>
            <th className="py-3 px-4">الدور</th>
            <th className="py-3 px-4 text-center">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.fName} {user.lName}</td>
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.email}</td>
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.phone}</td>
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
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
