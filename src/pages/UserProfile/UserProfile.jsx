import { useState, useEffect, useContext, useCallback } from 'react';
import baseUrl from '@/apis/config';
import { authContext } from '@/Contexts/AuthContext';

export default function UserProfile() {
  const { token, user, setUser, refreshUser } = useContext(authContext);

  const [profile, setProfile] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    payoutMethod: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // keep status/messages scoped per form so they don't overlap
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});

  const fetchUserData = useCallback(async () => {
    try {
      const res = await baseUrl.get(`https://api.hagznow.com/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      setProfile({
        fName: data.fName || '',
        lName: data.lName || '',
        email: data.email || '',
        phone: data.phone || '',
        payoutMethod: data.payoutMethod || '',
      });
      setAvatarPreview(data.avatar || '');
      setUser?.(data); // sync context with fresh backend data instead of decode
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setProfileError('تعذر تحميل بيانات الحساب');
    } finally {
      setLoadingProfile(false);
    }
  }, [setUser, token]);

  // Load current user info
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoadingProfile(false);
    }
  }, [fetchUserData, token]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileError('');
    setProfileErrors((prev) => ({ ...prev, [name]: '' }));
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (!token) return;

    // simple front-end validation for required fields + phone
    const phoneRegex = /^(\+?2?01[0-2,5]{1}[0-9]{8})$/;
    const nextErrors = {};
    if (!profile.fName.trim()) nextErrors.fName = 'الاسم الأول مطلوب';
    if (!profile.lName.trim()) nextErrors.lName = 'اسم العائلة مطلوب';
    if (!profile.email.trim()) nextErrors.email = 'البريد الإلكتروني مطلوب';
    if (!profile.phone.trim()) nextErrors.phone = 'رقم الهاتف مطلوب';
    if (profile.phone.trim() && !phoneRegex.test(profile.phone.trim())) {
      nextErrors.phone = 'رقم الهاتف غير صالح';
    }
    if (user?.role === 'owner' && (profile.payoutMethod || '').trim() === '') {
      nextErrors.payoutMethod = 'طريقة الدفع مطلوبة';
    }

    if (Object.keys(nextErrors).length) {
      setProfileErrors(nextErrors);
      return;
    }
    setProfileErrors({});

    const formData = new FormData();
    formData.append('fName', profile.fName);
    formData.append('lName', profile.lName);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone);
    if (user?.role === 'owner') {
      formData.append('payoutMethod', profile.payoutMethod);
    }
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      setProfileMessage('');
      setProfileError('');
      setSavingProfile(true);

      await baseUrl.patch(`https://api.hagznow.com/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileMessage('تم تحديث البيانات بنجاح');
      setAvatarFile(null);
      await fetchUserData(); // re-fetch to ensure we show server source of truth
      await refreshUser?.(); // update navbar/header avatar immediately
    } catch (err) {
      console.error('Profile update error:', err);
      const msg = err?.response?.data?.message || 'تعذر تحديث البيانات';
      setProfileError(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!token) return;

    const nextErrors = {};
    if (!passwordForm.oldPassword.trim()) nextErrors.oldPassword = 'أدخل كلمة المرور الحالية';
    if (!passwordForm.newPassword.trim()) nextErrors.newPassword = 'أدخل كلمة المرور الجديدة';
    if (!passwordForm.confirmPassword.trim()) nextErrors.confirmPassword = 'أكد كلمة المرور';
    if (
      passwordForm.newPassword.trim() &&
      passwordForm.confirmPassword.trim() &&
      passwordForm.newPassword !== passwordForm.confirmPassword
    ) {
      nextErrors.confirmPassword = 'كلمة المرور الجديدة غير متطابقة';
    }

    if (Object.keys(nextErrors).length) {
      setPasswordErrors(nextErrors);
      setPasswordError('');
      return;
    }
    setPasswordErrors({});

    try {
      setPasswordMessage('');
      setPasswordError('');
      setSavingPassword(true);

      await baseUrl.patch(
        `https://api.hagznow.com/auth/change-password`,
        {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setPasswordMessage('تم تغيير كلمة المرور');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error('Password change error:', err);
      const msg = err?.response?.data?.message || 'تعذر تغيير كلمة المرور';
      setPasswordError(msg);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">جارٍ تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8">
          <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">البيانات الشخصية</h1>
                <p className="text-gray-600 dark:text-gray-300">تعديل الاسم، البريد، الهاتف والصورة</p>
              </div>
            </header>

            <form className="space-y-6" onSubmit={handleSubmitProfile}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">الاسم الأول</span>
                  <input
                    type="text"
                    name="fName"
                    value={profile.fName}
                    onChange={handleProfileChange}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  {profileErrors.fName && (
                    <span className="text-red-600 dark:text-red-400 text-sm mt-1">{profileErrors.fName}</span>
                  )}
                </label>

                <label className="flex flex-col text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">اسم العائلة</span>
                  <input
                    type="text"
                    name="lName"
                    value={profile.lName}
                    onChange={handleProfileChange}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  {profileErrors.lName && (
                    <span className="text-red-600 dark:text-red-400 text-sm mt-1">{profileErrors.lName}</span>
                  )}
                </label>

                <label className="flex flex-col text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">البريد الإلكتروني</span>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  {profileErrors.email && (
                    <span className="text-red-600 dark:text-red-400 text-sm mt-1">{profileErrors.email}</span>
                  )}
                </label>
              </div>

              {user?.role === 'owner' ? (
                <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/60 dark:bg-gray-800/60">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">إعدادات الدفعات</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">حدد طريقة استلام الأرباح ورقم التواصل.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col text-right">
                      <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">طريقة استلام الأرباح</span>
                      <select
                        name="payoutMethod"
                        value={profile.payoutMethod}
                        onChange={handleProfileChange}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                      >
                        <option value="" disabled>
                          اختر طريقة الدفع
                        </option>
                        <option value="instapay">Instapay</option>
                        <option value="wallet">Wallet</option>
                      </select>
                      {profileErrors.payoutMethod && (
                        <span className="text-red-600 dark:text-red-400 text-sm mt-1">
                          {profileErrors.payoutMethod}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        اختر Instapay أو Wallet لاستلام الدفعات.
                      </span>
                    </label>

                    <label className="flex flex-col text-right">
                      <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">رقم الهاتف</span>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                      />
                      {profileErrors.phone && (
                        <span className="text-red-600 dark:text-red-400 text-sm mt-1">{profileErrors.phone}</span>
                      )}
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">رقم الهاتف</span>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  {profileErrors.phone && (
                    <span className="text-red-600 dark:text-red-400 text-sm mt-1">{profileErrors.phone}</span>
                  )}
                </label>
              )}

              <div className="flex items-center gap-4 flex-wrap">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar preview"
                    className="w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                )}

                <label className="cursor-pointer text-green-700 dark:text-green-400 font-medium">
                  رفع صورة جديدة
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                    savingProfile ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {savingProfile ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
                {profileMessage && <span className="text-green-700 dark:text-green-400">{profileMessage}</span>}
                {profileError && <span className="text-red-600 dark:text-red-400">{profileError}</span>}
              </div>
            </form>
          </section>

          <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8">
            <header className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">تغيير كلمة المرور</h2>
              <p className="text-gray-600 dark:text-gray-300">أدخل كلمة المرور الحالية والجديدة</p>
            </header>

            <form className="space-y-4" onSubmit={handleSubmitPassword}>
              <label className="flex flex-col text-right">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">كلمة المرور الحالية</span>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={(e) => {
                    setPasswordForm((prev) => ({ ...prev, oldPassword: e.target.value }));
                    setPasswordErrors((prev) => ({ ...prev, oldPassword: '' }));
                    setPasswordError('');
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
                {passwordErrors.oldPassword && (
                  <span className="text-red-600 dark:text-red-400 text-sm mt-1">{passwordErrors.oldPassword}</span>
                )}
              </label>

              <label className="flex flex-col text-right">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">كلمة المرور الجديدة</span>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => {
                    setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }));
                    setPasswordErrors((prev) => ({ ...prev, newPassword: '' }));
                    setPasswordError('');
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
                {passwordErrors.newPassword && (
                  <span className="text-red-600 dark:text-red-400 text-sm mt-1">{passwordErrors.newPassword}</span>
                )}
              </label>

              <label className="flex flex-col text-right">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">تأكيد كلمة المرور</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => {
                    setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
                    setPasswordErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    setPasswordError('');
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-right text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
                {passwordErrors.confirmPassword && (
                  <span className="text-red-600 dark:text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</span>
                )}
              </label>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                    savingPassword ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {savingPassword ? 'جارٍ الحفظ...' : 'تغيير كلمة المرور'}
                </button>
                {passwordMessage && <span className="text-green-700 dark:text-green-400">{passwordMessage}</span>}
                {passwordError && <span className="text-red-600 dark:text-red-400">{passwordError}</span>}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
