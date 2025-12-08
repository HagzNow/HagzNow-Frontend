import { ArrowUpDown, Calendar, History, Plus, Wallet as WallletIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import baseUrl from '../../apis/config';
import Pagination from '../../components/Pagination/Pagination';
import AddFundsModal from '../../components/Wallet/AddFundsModal';
import PaymentResultModal from '../../components/Wallet/PaymentResultModal';
import TransactionItem from '../../components/Wallet/TransactionItem';

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
    const success = searchParams.get('success');
    const amountCents = searchParams.get('amount_cents');

    if (success && amountCents) {
      if (success === 'true') {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  async function getBalance() {
    try {
      let { data } = await baseUrl.get('/wallet/balance');
      setBalance(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  async function getAllTransaction(page = 1) {
    try {
      let { data } = await baseUrl.get(`/transactions?limit=${15}&page=${page}`);
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
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Balance Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden group mb-8">
            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-600 dark:group-hover:from-green-700 dark:group-hover:to-emerald-700 transition-all duration-500 shadow-lg dark:shadow-gray-900/50">
                  <WallletIcon className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Side by side balances */}
              <div className="flex items-center justify-center gap-8">
                {/* Available Balance */}
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {t('wallet.available_balance')}
                  </p>
                  <h2 className="font-bold text-3xl bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    {balance?.availableBalance ? Number(balance?.availableBalance).toLocaleString('ar-EG') : 0}
                    <span className="text-xl text-gray-700 dark:text-gray-300 mr-2">ج.م</span>
                  </h2>
                </div>

                {/* Divider */}
                <div className="h-16 w-px bg-gray-300 dark:bg-gray-600"></div>

                {/* Held Amount */}
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{t('wallet.held_amount')}</p>
                  <h2 className="font-bold text-3xl bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                    {balance?.heldAmount ? Number(balance?.heldAmount).toLocaleString('ar-EG') : 0}
                    <span className="text-xl text-gray-700 dark:text-gray-300 mr-2">ج.م</span>
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out font-semibold text-lg"
              >
                <Plus className="w-5 h-5" />
                {t('wallet.add_balance')}
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('wallet.transaction_history')}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">آخر عملياتك المالية</p>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-100 dark:border-green-800">
              <div className="col-span-3 flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
                <ArrowUpDown className="w-4 h-4" />
                {t('wallet.status')}
              </div>
              <div className="col-span-3 text-green-700 dark:text-green-400 font-semibold text-center">
                {t('wallet.amount')}
              </div>
              <div className="col-span-3 text-green-700 dark:text-green-400 font-semibold text-center">
                {t('wallet.type')}
              </div>
              <div className="col-span-3 flex items-center gap-2 justify-end text-green-700 dark:text-green-400 font-semibold">
                <Calendar className="w-4 h-4" />
                {t('wallet.date')}
              </div>
            </div>

            {/* Transactions List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions?.map((transaction) => (
                <div
                  key={transaction.id}
                  className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300 ease-in-out"
                >
                  <TransactionItem transaction={transaction} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {!transactions?.length && (
              <div className="p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <History className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد معاملات حتى الآن</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  سيظهر سجل المعاملات هنا بعد إجراء عملياتك الأولى
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {transactions?.length > 0 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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
