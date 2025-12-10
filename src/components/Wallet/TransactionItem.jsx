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
  Ban,
  Check,
} from 'lucide-react';

export default function TransactionItem({ transaction }) {
  const { t } = useTranslation();

  // Status configuration with icons and custom colors
 const statusConfig = {
  instant: {
    bgColor: 'bg-[#3B82F6]',
    textColor: 'text-white',
    icon: Zap,
    label: t(`transaction_status.instant`),
  },
  hold: {
    bgColor: 'bg-[#FBBF24]',
    textColor: 'text-white',
    icon: Lock,
    label: t(`transaction_status.hold`),
  },
  refund: {
    bgColor: 'bg-[#10B981]',
    textColor: 'text-white',
    icon: RotateCcw,
    label: t(`transaction_status.refund`),
  },
  settled: {
    bgColor: 'bg-[#059669]',
    textColor: 'text-white',
    icon: CheckCircle,
    label: t(`transaction_status.settled`),
  },
  pending: {
    bgColor: 'bg-[#6B7280]',
    textColor: 'text-white',
    icon: Clock,
    label: t(`transaction_status.pending`),
  },
  failed: {
    bgColor: 'bg-[#EF4444]',
    textColor: 'text-white',
    icon: AlertCircle,
    label: t(`transaction_status.failed`),
  },
  rejected: {
    bgColor: 'bg-[#DC2626]', 
    textColor: 'text-white',
    icon: Ban, 
    label: t(`transaction_status.rejected`),
  },

  processed: {
    bgColor: 'bg-[#2563EB]',
    textColor: 'text-white',
    icon: Check, 
    label: t(`transaction_status.processed`),
  },
};

  // Type configuration with icons and colors
  const typeConfig = {
    deposit: {
      icon: ArrowDownCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      sign: '+',
      label: t(`transaction_type.deposit`),
    },
    withdrawal: {
      icon: ArrowUpCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      sign: '-',
      label: t(`transaction_type.withdrawal`),
    },
    payment: {
      icon: CreditCard,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      sign: '-',
      label: t(`transaction_type.payment`),
    },
    refund: {
      icon: RefreshCw,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      sign: '+',
      label: t(`transaction_type.refund`),
    },
    fee: {
      icon: DollarSign,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      sign: '-',
      label: t(`transaction_type.fee`),
    },
  };

  const currentStatus = statusConfig[transaction.stage] || statusConfig.pending;
  const currentType = typeConfig[transaction.type] || {
    icon: DollarSign,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-50 dark:bg-gray-700/50',
    sign: '',
    label: transaction.type,
  };

  const StatusIcon = currentStatus.icon;
  const TypeIcon = currentType.icon;

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 px-6 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300 ease-in-out group">
      {/* Status */}
      <div className="col-span-3 flex justify-center">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${currentStatus.bgColor} ${currentStatus.textColor} transition-all duration-300 group-hover:shadow-lg dark:group-hover:shadow-gray-900/50`}
        >
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium whitespace-nowrap">{currentStatus.label}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="col-span-3 flex justify-center">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${currentType.bgColor} transition-all duration-300 group-hover:shadow-md dark:group-hover:shadow-gray-900/50`}
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
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-md dark:group-hover:shadow-gray-900/50">
          <TypeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium">{currentType.label}</span>
        </div>
      </div>

      {/* Date */}
      <div className="col-span-3 flex justify-end">
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-md dark:group-hover:shadow-gray-900/50">
          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-sm font-medium">{new Date(transaction.createdAt).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>
    </div>
  );
}
