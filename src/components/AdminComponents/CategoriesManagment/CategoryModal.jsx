import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CategoryModal = ({ open, setOpen, editMode, selectedCategory, onSave }) => {
  const [formData, setFormData] = useState({ id: "", name: "" });

  useEffect(() => {
    if (editMode && selectedCategory) {
      setFormData({ id: selectedCategory._id || selectedCategory.id, name: selectedCategory.name });
    } else {
      setFormData({ id: "", name: "" });
    }
  }, [editMode, selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData, editMode);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
  );
};

export default CategoryModal;
