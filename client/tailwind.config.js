import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
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
        brand: "hsl(214.4,100%,54.2%)",
        gray: {
          50: "hsl(0,0%,93.3%)",
          100: "hsl(216,12.2%,92%)",
          200: "hsl(206.2,15.4%,79.6%)",
          300: "hsl(210,10.4%,69.8%)",
          400: "hsl(211.8,8.5%,60.6%)",
          500: "hsl(210,6.5%,51.8%)",
          600: "hsl(210,6.5%,42.4%)",
          700: "hsl(212,8.6%,34.3%)",
          800: "hsl(214.3,10.6%,25.9%)",
          900: "hsl(213.3,10.3%,17.1%)",
          950: "hsl(210,10.5%,7.5%)",
          975: "hsl(210,9.1%,4.3%)",
        },
        green: {
          50: "#E5FFF2",
          100: "#D1FFE7",
          200: "#94FFC8",
          300: "#00FF7B",
          400: "#00F074",
          500: "#00E16D",
          600: "#00CC63",
          700: "#00B356",
          800: "#009447",
          900: "#006B34",
          950: "#004723",
        },
        red: {
          50: "#FEF1F4",
          100: "#FDE8ED",
          200: "#FBCBD8",
          300: "#F7A6BC",
          400: "#F37798",
          500: "#EB164E",
          600: "#D31246",
          700: "#B7103C",
          800: "#A00E35",
          900: "#710A25",
          950: "#50071A",
        },
        yellow: {
          50: "#FFF9F0",
          100: "#FFF4E1",
          200: "#FEE7BD",
          300: "#FEDB9F",
          400: "#FECA72",
          500: "#FDB941",
          600: "#F79E03",
          700: "#DE8D02",
          800: "#B67402",
          900: "#835401",
          950: "#603D01",
        },
        blue: {
          50: "#EBFCFF",
          100: "#D6F8FF",
          200: "#9EEFFF",
          300: "#5CE4FF",
          400: "#00D0FA",
          500: "#00BBE0",
          600: "#00AACC",
          700: "#0095B3",
          800: "#007B94",
          900: "#00596B",
          950: "#00404D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
