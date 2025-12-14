import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import loginBg from '../../assets/images/login bg.jpg';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToken, user } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password regex: at least one uppercase, one lowercase, and one number
  const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

  const validationSchema = object({
    email: string().required(t('email_required')).email(t('email_invalid')),
    password: string().required(t('password_required')).matches(passwordRegx, t('password_invalid')),
  });

  async function sendDataToLogin(values) {
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/auth/login', values);

      if (!data?.data?.token) {
        throw new Error('INVALID_RESPONSE');
      }

      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);

      toast.success(t('login_success') || 'Login successful!', {
        duration: 3000,
        style: {
          background: '#10b981',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        icon: '✅',
      });
    } catch (error) {
      let errorMessage = t('login_error_generic') || 'An error occurred during login';
      let errorCode = 'UNKNOWN_ERROR';

      // Handle different error types
      if (error.response) {
        const responseData = error.response.data;
        errorCode = responseData?.error?.code || 'SERVER_ERROR';

        // Handle special error codes that require navigation
        if (errorCode === 'PENDING_ACCOUNT') {
          // Route to pending approval page
          navigate('/pending-approval');
          return; // Don't show error toast, just navigate
        }

        if (errorCode === 'REJECTED_ACCOUNT') {
          // Route to rejected account page
          navigate('/rejected-account');
          return; // Don't show error toast, just navigate
        }

        // Priority 1: Extract message from backend (can be array or string)
        if (responseData?.message) {
          if (Array.isArray(responseData.message)) {
            // If message is an array, join them with periods or show first message
            errorMessage = responseData.message.join('. ') || responseData.message[0];
          } else if (typeof responseData.message === 'string') {
            errorMessage = responseData.message;
          }

          // Map common backend messages to translation keys
          const messageMap = {
            'Email or password is incorrect': t('errors.INVALID_CREDENTIALS') || t('login_error_unauthorized'),
            'Invalid email or password': t('errors.INVALID_CREDENTIALS') || t('login_error_unauthorized'),
            'User not found': t('errors.USER_NOT_FOUND'),
            'Email already exists': t('errors.EMAIL_IN_USE'),
          };

          // Check if we have a translation for this exact message
          if (messageMap[errorMessage]) {
            errorMessage = messageMap[errorMessage];
          } else {
            // Try to translate common patterns
            const lowerMessage = errorMessage.toLowerCase();
            if (
              lowerMessage.includes('email') &&
              (lowerMessage.includes('incorrect') || lowerMessage.includes('invalid') || lowerMessage.includes('wrong'))
            ) {
              errorMessage = t('errors.INVALID_CREDENTIALS') || t('login_error_unauthorized') || errorMessage;
            } else if (
              lowerMessage.includes('password') &&
              (lowerMessage.includes('incorrect') || lowerMessage.includes('invalid') || lowerMessage.includes('wrong'))
            ) {
              errorMessage = t('errors.INVALID_CREDENTIALS') || t('login_error_unauthorized') || errorMessage;
            }
          }
        }

        // Priority 2: Try to get translated error message for the error code (only if no backend message)
        if (!errorMessage || errorMessage === errorCode) {
          const translatedError = t(`errors.${errorCode}`, { defaultValue: null });
          if (translatedError && translatedError !== errorCode) {
            errorMessage = translatedError;
          }
        }

        // Priority 3: Check error.message field
        if ((!errorMessage || errorMessage === errorCode) && responseData?.error?.message) {
          errorMessage = responseData.error.message;
        }

        // Priority 4: Handle HTTP status codes if no message found
        if (!errorMessage || errorMessage === errorCode) {
          // Handle HTTP status codes
          switch (error.response.status) {
            case 400:
              errorMessage = t('login_error_bad_request') || 'Invalid request. Please check your credentials.';
              break;
            case 401:
              errorMessage = t('login_error_unauthorized') || 'Invalid email or password. Please try again.';
              break;
            case 403:
              errorMessage = t('login_error_forbidden') || 'Access forbidden. Please contact support.';
              break;
            case 404:
              errorMessage = t('login_error_not_found') || 'Service not found. Please try again later.';
              break;
            case 429:
              errorMessage = t('login_error_too_many_requests') || 'Too many requests. Please try again later.';
              break;
            case 500:
              errorMessage = t('login_error_server') || 'Server error. Please try again later.';
              break;
            case 503:
              errorMessage =
                t('login_error_service_unavailable') || 'Service temporarily unavailable. Please try again later.';
              break;
            default:
              errorMessage = t('login_error_server') || 'An error occurred. Please try again.';
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = t('login_error_network') || 'Network error. Please check your internet connection.';
        errorCode = 'NETWORK_ERROR';
      } else {
        // Error in request setup
        errorMessage = error.message || t('login_error_generic') || 'An error occurred during login';
      }

      // Show error toast with better styling
      toast.error(errorMessage, {
        duration: 4000,
        style: {
          background: '#ef4444',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '400px',
        },
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') navigate('/admin/dashboard');
    else if (user.role === 'owner') navigate('/owner/dashboard');
    else navigate('/user-arena');
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: sendDataToLogin,
    validationSchema,
  });

  return (
    <section
      className="min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300 relative"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-4 shadow-lg backdrop-blur-sm">
            <FaEnvelope className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            {t('login_title') || 'Log in to HagzNow'}
          </h1>
          <p className="text-white/90 text-sm sm:text-base drop-shadow-md">
            {t('login_subtitle') || 'Sign in to continue your sports journey'}
          </p>
        </div>

        {/* Form Card with Blur Effect */}
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 sm:p-8 space-y-6 transition-colors duration-300">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white drop-shadow-md">
                {t('email') || 'Email'}
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t('email_placeholder') || 'Enter your email address'}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-3 pr-11 pl-4 rounded-xl bg-white/20 backdrop-blur-sm border ${
                    formik.errors.email && formik.touched.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/30 focus:ring-green-500 focus:border-green-400'
                  } focus:outline-none focus:ring-2 transition-all text-white placeholder-white/60`}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-300 text-xs flex items-center gap-1 drop-shadow-md">
                  <span>•</span> {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-white drop-shadow-md">
                {t('password') || 'Password'}
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <FaLock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={t('password_placeholder') || 'Enter your password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-3 pr-11 pl-10 rounded-xl bg-white/20 backdrop-blur-sm border ${
                    formik.errors.password && formik.touched.password
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/30 focus:ring-green-500 focus:border-green-400'
                  } focus:outline-none focus:ring-2 transition-all text-white placeholder-white/60`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-300 text-xs flex items-center gap-1 drop-shadow-md">
                  <span>•</span> {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{t('login_loading') || 'Logging in...'}</span>
                </>
              ) : (
                t('login_button') || 'Log in'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-white/20">
            <p className="text-sm text-white/90 drop-shadow-md">
              {t('do_not_have_account') || "Don't have an account?"}{' '}
              <Link
                to="/register"
                className="text-green-300 hover:text-green-200 font-semibold transition-colors drop-shadow-md"
              >
                {t('create_account') || 'Create Account'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
