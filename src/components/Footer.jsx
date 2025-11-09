import React from "react";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* ✅ القسم الأيمن - روابط */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
          <span className="font-semibold text-white/90">روابط سريعة</span>
          <ul className="flex items-center gap-4 text-white/80">
            <li className="hover:text-white transition cursor-pointer">القانون</li>
            <li className="hover:text-white transition cursor-pointer">الخصوصية</li>
            <li className="hover:text-white transition cursor-pointer">الدعم</li>
          </ul>
        </div>

        {/* ✅ القسم الأيسر - السوشيال ميديا */}
        <div className="flex items-center gap-5 text-white/80">
          <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition" aria-label="Instagram">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition" aria-label="Twitter">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition" aria-label="Facebook">
            <FaFacebookF className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* ✅ خط سفلي */}
      <div className="border-t border-white/20 mt-5 pt-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} ArenaBook. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
