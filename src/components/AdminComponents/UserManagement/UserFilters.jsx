import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const UserFilters = ({ filters, setFilters, setPage, resetFilters }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/50 p-4 mb-6 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800 dark:text-white flex items-center gap-2">
          <Filter size={18} /> فلتر المستخدمين
        </h3>
        <Button
          variant="outline"
          className="text-gray-600 dark:text-gray-300 border-green-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-900/30"
          onClick={resetFilters}
        >
          إعادة التعيين
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-right">
        <Select
          onValueChange={(v) => {
            setFilters((prev) => ({ ...prev, role: v }));
            setPage(1);
          }}
          value={filters.role}
        >
          <SelectTrigger className="justify-between text-right pr-4 flex-row-reverse">
            <SelectValue placeholder="اختر دور" className="text-right" />
          </SelectTrigger>
          <SelectContent className="text-right">
            <SelectItem value="user">لاعب</SelectItem>
            <SelectItem value="owner">مالك</SelectItem>
            <SelectItem value="admin">مسؤول</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) => {
            setFilters((prev) => ({ ...prev, status: v }));
            setPage(1);
          }}
          value={filters.status}
        >
          <SelectTrigger className="justify-between text-right pr-4 flex-row-reverse">
            <SelectValue placeholder="اختر حالة" className="text-right" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-right" value="active">نشط </SelectItem>
            <SelectItem className="text-right" value="disabled">غير نشط </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserFilters;
