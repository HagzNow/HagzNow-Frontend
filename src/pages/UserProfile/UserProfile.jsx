
import { useState } from 'react';
import { User, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function UserProfile() {
  const [language, setLanguage] = useState('arabic');
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Password change submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="text-gray-600 hover:text-gray-900">A</button>
            <button className="text-gray-600 hover:text-gray-900">EN</button>
          </div>
          
          <nav className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">دورات لي</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">دخول</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">المنصات</a>
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">إعدادات الحساب</a>
          </nav>

          <div className="text-2xl font-bold text-green-600">
            logo ✱
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">معلومات الملف الشخصي</h1>
            <button className="text-green-600 hover:text-green-700 flex items-center gap-2">
              <span>تعديل</span>
              <span>✏️</span>
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
              <User size={64} className="text-blue-400" />
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="text-right">
              <label className="block text-gray-600 mb-2">الاسم</label>
              <div className="text-gray-900 font-medium">علي أحمد</div>
            </div>
            <div className="text-right">
              <label className="block text-gray-600 mb-2">البريد الإلكتروني</label>
              <div className="text-gray-900">aliahmed@example.com</div>
            </div>
            <div className="text-right col-span-2">
              <label className="block text-gray-600 mb-2">رقم الهاتف</label>
              <div className="text-gray-900">+201023456789</div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">الأمان</h2>
            <p className="text-gray-600 mb-6">تحديث كلمة المرور الخاصة بك</p>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="كلمة المرور القديمة"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="إدخال كلمة المرور الجديدة"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="كلمة المرور الجديدة"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="إدخال كلمة المرور الجديدة"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور الجديدة"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="إدخال كلمة المرور الجديدة"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                تغيير كلمة المرور
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="border-t mt-12 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">اللغة</h2>
            <p className="text-gray-600 mb-6">تغيير اللغة واللهجة المستخدمة</p>
            
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Arabic</span>
                <button 
                  onClick={() => setLanguage(language === 'arabic' ? 'english' : 'arabic')}
                  className="relative inline-block w-12 h-6 bg-green-600 rounded-full cursor-pointer"
                >
                  <div 
                    className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${language === 'arabic' ? 'right-1' : 'right-7'}`}
                  ></div>
                </button>
                <span className="text-gray-700">English</span>
              </div>
              <span className="text-gray-600">لغة العرض</span>
            </div>
          </div>
        </div>

        {/* Footer Social Links */}
        <div className="flex justify-center gap-6 mt-12">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Linkedin size={24} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-8 mt-8 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">الشروط</a>
          <a href="#" className="hover:text-gray-900">روابط سريعة</a>
        </div>
      </main>
    </div>
  );
}