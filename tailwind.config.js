/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      gray_0: "#F8F9FA",
      gray_02: "#f2f5fa",
      gray_05: "#F0F2F5",
      gray_08: "#E9EAED",
      gray_1: "#C7CCD0",
      gray_2: "#7B809A",
      gray_3: "#4F4F52",
      black: "#191919",
      white: "#fff",
      rust: "#874f0e",
      phoenix_red: "#d97055",
      wild_west: "#865952",
      burlywood: "#DEB887",
      old_paper: "#E0C9A6",
      honey_gold: "#DDB57C"
    },
    fontSize: {
      xxs: "0.5625rem", // 9px
      xs: "0.6525rem", // 10.44px
      sm: "0.75rem", // 12px
      base: "0.875rem", // 14px
      lg: "1rem", // 16px
      xl: "1.25rem", // 20px
      "2xl": "1.375rem", // 22px
      "3xl": "1.75rem", // 28px
    },
    extend: {
      boxShadow: {
        'base': '2px 2px 2px 0px rgba(0, 0, 0, 0.1)',
        'bottom': '2px 2px 2px 0px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};
