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
      "dark-blue": "#344767",
      white: "#fff",
      green: "#4CAF50",
      blue: "#2054e3",
      purple: "#7f19ff",
      "light-purple": "#e7d4ff",
      "light-blue": "#d4ecff",
      "light-green": "#dbefdc",
      "light-orange": "#FFE2D2",
      "orange": "#FB8C00",
      red: "#DA1E27",
      "light-red": "#F6CCCC",
      "statistics_color_1": "#A2A2A2",
      "statistics_color_2": "#E98D7F",
      "statistics_color_3": "#C26388",
      "statistics_color_4": "#8B81C3",
      "statistics_color_5": "#75A6C2",
      "statistics_color_6": "#5C7995",
      "statistics_color_7": "#D4B483",
      "statistics_color_8": "#F2C9A7",
      "statistics_color_9": "#B48EAE",
      "statistics_color_10": "#9FB9D1",
      "statistics_color_11": "#4E6E81",
      "statistics_color_12": "#709F6E",
      "statistics_color_13": "#E1A5B9",
      "statistics_color_14": "#CFCFCF",
      "statistics_color_15": "#3F4E4F",
      "statistics_color_16": "#FFE4C4"
    },
    fontSize: {
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
