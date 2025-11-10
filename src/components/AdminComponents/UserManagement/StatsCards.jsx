import React from "react";
import { Users, Shield, UserCheck } from "lucide-react";

const StatsCards = ({ displayStats }) => {
  const cards = [
    { icon: <Users className="text-green-600 mb-2" />, label: "إجمالي المستخدمين", value: displayStats.total },
    { icon: <Shield className="text-blue-600 mb-2" />, label: "إجمالي المالكين", value: displayStats.owners },
    { icon: <UserCheck className="text-emerald-600 mb-2" />, label: "إجمالي اللاعبين", value: displayStats.users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
          {card.icon}
          <p className="text-gray-500">{card.label}</p>
          <h3 className="text-xl font-bold">{card.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
