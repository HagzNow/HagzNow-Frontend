import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaClock, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import loginBg from '../../assets/images/login bg.jpg';

export default function PendingApproval() {
  const { t } = useTranslation();

  return (
    <section
      className="min-h-screen flex items-center justify-center py-12 px-4 relative"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 text-center py-5 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-2xl backdrop-blur-sm">
              <FaClock className="w-10 h-10" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
            {t('pending_approval_title') || 'Account Pending Approval'}
          </h1>

          {/* Message Card */}
          <div className="bg-white/10 backdrop-blur-xl w-full mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6 transition-colors duration-300">
            {/* Success Message */}
            <div className="flex items-start gap-4 text-right">
              <div className="flex-shrink-0 mt-1">
                <FaCheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-lg font-semibold mb-2">
                  {t('pending_approval_success') || 'Registration Successful!'}
                </p>
                <p className="text-white/90 text-sm">
                  {t('pending_approval_message') ||
                    'Your owner account registration was successful. Your account is now pending admin approval.'}
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FaFileAlt className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div className="text-right">
                  <p className="text-yellow-100 font-semibold text-sm mb-1">
                    {t('pending_approval_documents_title') || 'Document Verification'}
                  </p>
                  <p className="text-yellow-200/90 text-xs">
                    {t('pending_approval_documents_message') ||
                      'Our admin team is reviewing your submitted documents (National ID front, National ID back, and selfie with ID). You will be notified once your account is approved.'}
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="text-right space-y-3">
              <h3 className="text-white font-semibold text-base">
                {t('pending_approval_next_steps') || "What's Next?"}
              </h3>
              <ul className="space-y-2 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>{t('pending_approval_step1') || 'Wait for admin review of your documents'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>
                    {t('pending_approval_step2') || 'You will receive a notification once your account is approved'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>
                    {t('pending_approval_step3') || 'Once approved, you can log in and start managing your arenas'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to="/login"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-center"
              >
                {t('pending_approval_back_to_login') || 'Back to Login'}
              </Link>
              <Link
                to="/"
                className="flex-1 py-3 px-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:bg-white/30 text-center border border-white/30"
              >
                {t('pending_approval_go_home') || 'Go to Home'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
