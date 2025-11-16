import React from "react";
import { useTranslation } from "react-i18next";

export default function TransactionItem({ transaction }) {
  const { t } = useTranslation();

  const colors = {
    instant: "#3B82F6",
    hold: "#FBBF24",
    refund: "#10B981",
    settled: "#059669",
    pending: "#6B7280",
    failed: "#EF4444",
  };

  const status = (state) => ({
    backgroundColor: colors[state] || "#ccc",
    color: "white",
    padding: "4px 12px",
    borderRadius: "12px",
    minWidth: "90px",
    textAlign: "center",
  });

  const type = (type) => {
    switch (type) {
      case "deposit":
        return "+";
      case "withdrawal":
      case "payment":
        return "-";
      case "refund":
        return "+";
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="w-1/4 flex justify-center">
        <p style={status(transaction.stage)}>
          {t(`transaction_status.${transaction.stage}`)}
        </p>
      </div>

      <div className="w-1/4 text-center">
        <p>{transaction.amount}</p>
      </div>

      <div className="w-1/4 text-center">
        <p>
          {t(`transaction_type.${transaction.type}`)} {type(transaction.type)}
        </p>
      </div>

      <div className="w-1/4 text-center">
        <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
