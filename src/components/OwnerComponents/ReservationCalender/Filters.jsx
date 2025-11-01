import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Filters({ filters, setFilters }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        className="border border-primary text-primary p-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-primary/50"
        value={filters.sport}
        onChange={e => setFilters(f => ({ ...f, sport: e.target.value }))}
      >
        <option>{t('filters.sport')}</option>
        <option>football</option>
        <option>basketball</option>
      </select>

      <select
        className="border border-primary text-primary p-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-primary/50"
        value={filters.field}
        onChange={e => setFilters(f => ({ ...f, field: e.target.value }))}
      >
        <option>{t('filters.field')}</option>
        <option>الملعب الخارجي</option>
      </select>

      <select
        className="border border-primary text-primary p-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-primary/50"
        value={filters.speed}
        onChange={e => setFilters(f => ({ ...f, speed: e.target.value }))}
      >
        <option>{t('filters.speed')}</option>
        <option>العادي</option>
      </select>

      <input
        type="date"
        className="border border-primary text-primary p-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-primary/50"
        value={filters.date.toISOString().split('T')[0]}
        onChange={e => setFilters(f => ({ ...f, date: new Date(e.target.value) }))}
      />
    </div>
  );
}
