import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        icon: ["Righteous", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: "hsl(216deg 100% 54%)",
        gray: {
          50: "#E6E6E6",
          100: "#DBDBDB",
          200: "#C2C2C2",
          300: "#A8A8A8",
          400: "#919191",
          500: "#777779",
          600: "#5E5F64",
          700: "#44454B",
          800: "#2B2C31",
          900: "#151519",
          950: "#09090B",
        },
      },
      keyframes: {
        icon_enlarge: {
          from: {
            height: "20px",
          },
          to: {
            height: "40px",
          },
        },
      },
      animation: {
        icon_enlarge: "icon_enlarge 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
