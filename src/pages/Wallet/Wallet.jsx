import React, { useEffect, useState } from "react";
import AddFundsModal from "../../components/Wallet/AddFundsModal";
import { useSearchParams } from "react-router-dom";
import PaymentResultModal from "../../components/Wallet/PaymentResultModal";
import baseUrl from "../../apis/config";
import TransactionItem from "../../components/Wallet/TransactionItem";

export default function Wallet() {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const success = searchParams.get("success");
    const amountCents = searchParams.get("amount_cents");

    if (success && amountCents) {
      if (success === "true") {
        const amountInEGP = Number(amountCents) / 100;
        setAmount(amountInEGP);
        setStatus(true);
        setShowResultModal(true);
      } else {
        setStatus(false);
        setShowResultModal(true);
      }
    }
  }, [searchParams]);

  async function getAllTransaction() {
    try {
      let { data } = await baseUrl.get(`/transactions?limit=${2}&page=${2}`);
      console.log(data);

      setTransactions(data?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
    <>
      <div className="container w-3/4 ">
        <div className="balance p-3 text-center space-y-3 bg-secondColor rounded-2xl">
          <p>رصيدك الحالي</p>
          <h2 className="font-bold text-3xl">٥,٢٠٠.٠٠ ج.م</h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn mt-2 bg-mainColor text-white rounded-xl px-5 py-2"
          >
            إضافة رصيد
          </button>
        </div>

        <div className="transaction py-5">
          <h2 className="text-center mb-3.5 font-bold">سجل المعاملات</h2>
          <div className="header flex p-3 bg-secondColor justify-around rounded-2xl items-center">
            <p>الحاله</p>
            <p>المبلغ</p>
            <p>المرجع</p>
            <p>النوع</p>
            <p>التاريخ</p>
          </div>
          <div className="p-3 bg-secondColor mt-2 space-y-3">
            {transactions?.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>

      <AddFundsModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <PaymentResultModal
        status={status}
        amount={amount}
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
      />
    </>
  );
}
