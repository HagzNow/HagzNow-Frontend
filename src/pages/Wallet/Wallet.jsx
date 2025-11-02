import React, { useEffect, useState } from "react";
import AddFundsModal from "../../components/Wallet/AddFundsModal";
import { useSearchParams } from "react-router-dom";
import PaymentResultModal from "../../components/Wallet/PaymentResultModal";

export default function Wallet() {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);

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
          <div className="flex p-3 bg-secondColor justify-around items-center mt-2">
            <p className="bg-mainColor p-2 rounded-2xl">مكتمل</p>
            <p>+٥٠٠.٠٠ ج.م</p>
            <p>#٩٨٧٦٥٤</p>
            <p>إيداع</p>
            <p>٢٠٢٤-١٠-٢٦</p>
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
