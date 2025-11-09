import React, { useEffect, useState } from "react";
import AddFundsModal from "../../components/Wallet/AddFundsModal";
import { useSearchParams } from "react-router-dom";
import PaymentResultModal from "../../components/Wallet/PaymentResultModal";
import baseUrl from "../../apis/config";
import TransactionItem from "../../components/Wallet/TransactionItem";
import { useTranslation } from "react-i18next";
import Pagination from "../../components/Pagination/Pagination";
import UserNavbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";

export default function Wallet() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState();

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  async function getBalance() {
    try {
      let { data } = await baseUrl.get("/wallet/balance");
      setBalance(data?.data.avaibaleBalance);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  async function getAllTransaction(page = 1) {
    try {
      let { data } = await baseUrl.get(
        `/transactions?limit=${15}&page=${page}`
      );
      setTransactions(data?.data?.data);
      setTotalPages(data?.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTransaction(currentPage);
  }, [currentPage]);

  return (
    <>
    <UserNavbar/>
      <div className="container w-3/4 mt-[20px]">
        <div className="balance p-3 text-center space-y-3 bg-secondColor rounded-2xl">
          <p>{t("wallet.current_balance")}</p>
          <h2 className="font-bold text-3xl">
            {balance ? Number(balance).toLocaleString("ar-EG") : 0} ج.م
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn mt-2 bg-mainColor text-white rounded-xl px-5 py-2"
          >
            {t("wallet.add_balance")}
          </button>
        </div>

        <div className="transaction py-5">
          <h2 className="text-center mb-3.5 font-bold">
            {t("wallet.transaction_history")}
          </h2>

          <div className="header flex p-3 bg-secondColor justify-around rounded-2xl items-center">
            <p>{t("wallet.status")}</p>
            <p>{t("wallet.amount")}</p>
            <p>{t("wallet.type")}</p>
            <p>{t("wallet.date")}</p>
          </div>

          <div className="p-3 bg-secondColor mt-2 space-y-3">
            {transactions?.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <AddFundsModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <PaymentResultModal
        status={status}
        amount={amount}
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
      />
      <Footer/>
    </>
  );
}
