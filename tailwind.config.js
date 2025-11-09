import animate from "tailwindcss-animate";
import twAnimateCss from "tw-animate-css";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "1200px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e7d32',     // أخضر داكن
          light: '#4caf50',       // أخضر متوسط
          dark: '#1b5e20',        // أخضر غامق
        },
      },
      fontFamily: {
        arabic: ['"Cairo"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(46, 125, 50, 0.15)', // ظل أخضر ناعم
      },
      borderRadius: {
        xl: '1rem',
      },
      spacing: {
        'card': '1.5rem',
      },
    },
  },
  plugins: [animate, twAnimateCss],
};
