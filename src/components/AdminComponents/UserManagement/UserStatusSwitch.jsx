import React from "react";

const UserStatusSwitch = ({ status, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
          status === "active" ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            status === "active" ? "translate-x-6" : "translate-x-0"
          }`}
        ></span>
      </button>

      <span
        className={`text-sm font-medium ${
          status === "active" ? "text-green-600" : "text-gray-500"
        }`}
      >
        {status === "active" ? "نشط" : "غير نشط"}
      </span>
    </div>
  );
};

export default UserStatusSwitch;
