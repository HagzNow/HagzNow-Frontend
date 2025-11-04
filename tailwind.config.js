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
    extend: {},
  },
  plugins: [animate, twAnimateCss],
};
