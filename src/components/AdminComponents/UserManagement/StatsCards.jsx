import React from 'react';
import { Users, Shield, UserCheck } from 'lucide-react';

const StatsCards = ({ displayStats }) => {
  const cards = [
    {
      icon: <Users className="text-green-600 mb-2" />,
      label: 'إجمالي المستخدمين',
      value: Number(displayStats.total).toLocaleString('ar-EG'),
    },
    {
      icon: <Shield className="text-blue-600 mb-2" />,
      label: 'إجمالي المالكين',
      value: Number(displayStats.owners).toLocaleString('ar-EG'),
    },
    {
      icon: <UserCheck className="text-emerald-600 mb-2" />,
      label: 'إجمالي اللاعبين',
      value: Number(displayStats.users).toLocaleString('ar-EG'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-2xl p-4 flex flex-col items-center border border-gray-200 dark:border-gray-700 transition-colors"
        >
          {card.icon}
          <p className="text-gray-500 dark:text-gray-400">{card.label}</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
