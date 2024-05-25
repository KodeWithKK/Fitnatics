import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        icon: ["Righteous", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        iconEnlarge: {
          from: {
            height: "20px",
          },
          to: {
            height: "40px",
          },
        },
        fadeLeftSlide: {
          from: {
            transform: "translateX(100%)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        spin: {
          to: {
            transform: "rotate(1turn)",
          },
        },
      },
      animation: {
        iconEnlarge: "iconEnlarge 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        fadeLeftSlide: "fadeLeftSlide 0.4s ease-out",
        loadingIcon: "spin 1s linear infinite",
      },
      colors: {
        brand: "#1271ED",
        gray: {
          DEFAULT: "#7C848C",
          50: "#EEEEEE",
          100: "#E8EAED",
          200: "#C3CCD3",
          300: "#AAB2BA",
          400: "#929AA3",
          500: "#7C848C",
          600: "#656C73",
          700: "#50575F",
          800: "#3B4149",
          900: "#272B30",
          950: "#111315",
          975: "#0A0B0C",
        },
        red: {
          DEFAULT: "#CF302B",
          50: "#F5CDCC",
          100: "#F1BDBB",
          200: "#EA9C9A",
          300: "#E37B78",
          400: "#DC5A56",
          500: "#CF302B",
          600: "#A12521",
          700: "#721A18",
          800: "#44100E",
          900: "#150504",
          950: "#000000",
        },
        yellow: {
          DEFAULT: "#EB8422",
          50: "#FCEAD9",
          100: "#FAE0C6",
          200: "#F7CBA1",
          300: "#F3B67B",
          400: "#F0A156",
          500: "#EB8422",
          600: "#C46911",
          700: "#914D0D",
          800: "#5D3208",
          900: "#2A1604",
          950: "#100901",
        },
        green: {
          DEFAULT: "#37CD62",
          50: "#D6F5DF",
          100: "#C6F1D2",
          200: "#A5E8B8",
          300: "#85E09F",
          400: "#64D885",
          500: "#37CD62",
          600: "#29A34C",
          700: "#1E7637",
          800: "#124922",
          900: "#071C0D",
          950: "#010603",
        },
        blue: {
          DEFAULT: "#1271ED",
          50: "#BDD7FA",
          100: "#AACCF9",
          200: "#84B5F6",
          300: "#5E9EF3",
          400: "#3888F0",
          500: "#1271ED",
          600: "#0E58B9",
          700: "#0A3F85",
          800: "#062651",
          900: "#020E1C",
          950: "#000102",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
