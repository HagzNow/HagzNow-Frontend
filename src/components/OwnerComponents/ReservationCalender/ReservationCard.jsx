import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ReservationCard({ arena }) {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white rounded-xl shadow-card border border-primary/30 hover:shadow-lg transition">
      <img
        src={arena.mainImage}
        alt={arena.name}
        className="w-full h-40 object-cover rounded mb-3 border border-primary/20"
      />
      <h3 className="font-bold text-xl text-primary mb-1">{arena.name}</h3>
      <p className="text-sm text-gray-600 mb-1">📍 {t('arena.location')}: {arena.location} - {arena.addressDescription}</p>
      <p className="text-sm text-gray-600 mb-1">🎯 {t('filters.sport')}: {arena.sportType}</p>
      <p className="text-sm text-gray-600 mb-1">💰 {t('arena.price')}: <span className="text-primary font-semibold">{arena.price} جنيه</span></p>
      <p className="text-sm text-gray-600 mb-1">📌 {t('arena.description')}: {arena.description}</p>
      {arena.notes && <p className="text-sm text-gray-500 italic">📝 {t('arena.notes')}: {arena.notes}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {arena.features.map((feature, i) => (
          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}
