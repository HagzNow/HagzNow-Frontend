import React from "react";

export default function TransactionItem({ transaction }) {
  return (
    <>
      <div className="flex justify-around items-center space-y-2">
        <p className="bg-mainColor px-5 rounded-2xl">{transaction.stage}</p>
        <p>{transaction.amount}</p>
        <p>#٩٨٧٦٥٤</p>
        <p>إيداع</p>
        <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
      </div>
    </>
  );
}
