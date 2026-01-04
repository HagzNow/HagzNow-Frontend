import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaTimesCircle, FaExclamationTriangle, FaFileAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import loginBg from '../../assets/images/login bg.jpg';

export default function RejectedAccount() {
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-2xl backdrop-blur-sm">
              <FaTimesCircle className="w-10 h-10" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
            {t('rejected_account_title') || 'Account Rejected'}
          </h1>

          {/* Message Card */}
          <div className="bg-white/10 backdrop-blur-xl w-full mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6 transition-colors duration-300">
            {/* Error Message */}
            <div className="flex items-start gap-4 text-right">
              <div className="flex-shrink-0 mt-1">
                <FaExclamationTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-lg font-semibold mb-2">
                  {t('rejected_account_message') || 'Your account registration has been rejected'}
                </p>
                <p className="text-white/90 text-sm">
                  {t('rejected_account_description') ||
                    'Unfortunately, your owner account registration has been rejected by the admin team.'}
                </p>
              </div>
            </div>

            {/* Documents Rejection Info Box */}
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FaFileAlt className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                <div className="text-right">
                  <p className="text-red-100 font-semibold text-sm mb-1">
                    {t('rejected_account_documents_title') || 'Document Verification Failed'}
                  </p>
                  <p className="text-red-200/90 text-xs">
                    {t('rejected_account_documents_message') ||
                      'Your submitted documents (National ID front, National ID back, and selfie with ID) did not meet our verification requirements. This could be due to unclear images, incorrect information, or missing documents.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Admin Section */}
            <div className="text-right space-y-3">
              <h3 className="text-white font-semibold text-base">
                {t('rejected_account_contact_title') || 'What Should You Do?'}
              </h3>
              <ul className="space-y-2 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>
                    {t('rejected_account_step1') ||
                      'Please contact our admin team to understand why your account was rejected'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>
                    {t('rejected_account_step2') ||
                      'You may need to resubmit your documents with clearer images or correct information'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>
                    {t('rejected_account_step3') ||
                      'Our admin team will guide you through the process to get your account approved'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
              <div className="text-right">
                <p className="text-blue-100 font-semibold text-sm mb-2">
                  {t('rejected_account_contact_info_title') || 'Contact Information'}
                </p>
                <div className="space-y-2 text-blue-200/90 text-xs">
                  <p className="flex items-center gap-2 justify-start">
                    <FaEnvelope className="w-4 h-4" />
                    <span>{t('rejected_account_contact_email') || 'Email: support@hagznow.com'}</span>
                  </p>
                  <p className="flex items-center gap-2 justify-start">
                    <FaPhone className="w-4 h-4" />
                    <span>{t('rejected_account_contact_phone') || 'Phone: +20 103 081 6763'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to="/login"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-center"
              >
                {t('rejected_account_back_to_login') || 'Back to Login'}
              </Link>
              <Link
                to="/"
                className="flex-1 py-3 px-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:bg-white/30 text-center border border-white/30"
              >
                {t('rejected_account_go_home') || 'Go to Home'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
