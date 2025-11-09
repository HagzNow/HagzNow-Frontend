import React from "react";
import { useTranslation } from "react-i18next";

export default function TransactionItem({ transaction }) {
  const { t } = useTranslation();

  const status = (state) => {
    switch (state) {
      case "hold":
        return "bg-blue-500";
      case "released":
        return "bg-red-500";
      case "settled":
        return "bg-mainColor";
      case "pending":
        return "bg-white";
      case "failed":
        return "bg-red-900";
      default:
        return null;
    }
  };

  const type = (type) => {
    switch (type) {
      case "deposit":
        return "+";
      case "withdrawal":
        return "-";
      case "payment":
        return "-";
      case "refund":
        return "+";
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-around items-center space-y-2">
      <p className={`${status(transaction.stage)} px-5 rounded-2xl`}>
        {t(`transaction_status.${transaction.stage}`)}
      </p>

      <p>{transaction.amount}</p>

      <p>
        {t(`transaction_type.${transaction.type}`)} {type(transaction.type)}
      </p>

      <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
