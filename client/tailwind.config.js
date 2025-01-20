module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#000000",
        background: "#FEFDFB",
        primary: "#8A817B",
        secondary: "#E0AE9F",
        accent: "#722231",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(241, 233, 233, 0.77)",
        "4xl": [
          "0 35px 35px rgba(243, 227, 227, 0.79)",
          "0 45px 65px rgb(243, 236, 236)",
        ],
      },
    },
  },
  plugins: [],
};
