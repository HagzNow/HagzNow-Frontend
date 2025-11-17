import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Lock,
  Zap,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
  RotateCcw,
  DollarSign,
} from 'lucide-react';

export default function TransactionItem({ transaction }) {
  const { t } = useTranslation();

  // Status configuration with icons and colors
  const statusConfig = {
    instant: {
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      icon: Zap,
      label: t(`transaction_status.instant`),
    },
    hold: {
      bgColor: 'bg-amber-500',
      textColor: 'text-white',
      icon: Lock,
      label: t(`transaction_status.hold`),
    },
    refund: {
      bgColor: 'bg-emerald-500',
      textColor: 'text-white',
      icon: RotateCcw,
      label: t(`transaction_status.refund`),
    },
    settled: {
      bgColor: 'bg-green-600',
      textColor: 'text-white',
      icon: CheckCircle,
      label: t(`transaction_status.settled`),
    },
    pending: {
      bgColor: 'bg-gray-500',
      textColor: 'text-white',
      icon: Clock,
      label: t(`transaction_status.pending`),
    },
    failed: {
      bgColor: 'bg-red-500',
      textColor: 'text-white',
      icon: AlertCircle,
      label: t(`transaction_status.failed`),
    },
  };

  // Type configuration with icons and colors
  const typeConfig = {
    deposit: {
      icon: ArrowDownCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      sign: '+',
      label: t(`transaction_type.deposit`),
    },
    withdrawal: {
      icon: ArrowUpCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      sign: '-',
      label: t(`transaction_type.withdrawal`),
    },
    payment: {
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      sign: '-',
      label: t(`transaction_type.payment`),
    },
    refund: {
      icon: RefreshCw,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      sign: '+',
      label: t(`transaction_type.refund`),
    },
    fee: {
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      sign: '-',
      label: t(`transaction_type.fee`),
    },
  };

  const currentStatus = statusConfig[transaction.stage] || statusConfig.pending;
  const currentType = typeConfig[transaction.type] || {
    icon: DollarSign,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    sign: '',
    label: transaction.type,
  };

  const StatusIcon = currentStatus.icon;
  const TypeIcon = currentType.icon;

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 px-6 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300 ease-in-out group">
      {/* Status */}
      <div className="col-span-3 flex justify-center">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${currentStatus.bgColor} ${currentStatus.textColor} transition-all duration-300 group-hover:shadow-lg`}
        >
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium whitespace-nowrap">{currentStatus.label}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="col-span-3 flex justify-center">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${currentType.bgColor} transition-all duration-300 group-hover:shadow-md`}
        >
          <TypeIcon className={`w-4 h-4 ${currentType.color}`} />
          <span className={`text-lg font-bold ${currentType.color}`}>
            {currentType.sign}
            {transaction.amount}
            <span className="text-sm font-normal mr-1">ج.م</span>
          </span>
        </div>
      </div>

      {/* Type */}
      <div className="col-span-3 flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 text-gray-700 transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
          <TypeIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">{currentType.label}</span>
        </div>
      </div>

      {/* Date */}
      <div className="col-span-3 flex justify-end">
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 text-gray-600 transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{new Date(transaction.createdAt).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>
    </div>
  );
}
