import React from "react";

const UserStatusSwitch = ({ status, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
          status === "active" ? "bg-green-500 dark:bg-green-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-300 ${
            status === "active" ? "left-[26px]" : "left-[2px]"
          }`}
        ></span>
      </button>

      <span
        className={`text-sm font-medium ${
          status === "active" ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {status === "active" ? "نشط" : "غير نشط"}
      </span>
    </div>
  );
};

export default UserStatusSwitch;
