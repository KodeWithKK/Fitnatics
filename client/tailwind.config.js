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
        red: {
          50: "hsl(1.7, 100%, 95%)",
          100: "hsl(1.7, 100%, 86%)",
          200: "hsl(1.7, 100%, 77%)",
          300: "hsl(1.7, 100%, 68%)",
          400: "hsl(1.7, 100%, 59%)",
          500: "hsl(1.7, 100%, 54%)",
          600: "hsl(1.7, 100%, 41%)",
          700: "hsl(1.7, 100%, 32%)",
          800: "hsl(1.7, 100%, 23%)",
          900: "hsl(1.7, 100%, 14%)",
          950: "hsv(1.7, 100%, 9%)",
        },
        yellow: {
          50: "hsl(47, 100%, 95%)",
          100: "hsl(47, 100%, 86%)",
          200: "hsl(47, 100%, 77%)",
          300: "hsl(47, 100%, 68%)",
          400: "hsl(47, 100%, 59%)",
          500: "hsl(47, 100%, 54%)",
          600: "hsl(47, 100%, 41%)",
          700: "hsl(47, 100%, 32%)",
          800: "hsl(47, 100%, 23%)",
          900: "hsl(47, 100%, 14%)",
          950: "hsv(47, 100%, 9%)",
        },
        green: {
          50: "hsl(146, 100%, 95%)",
          100: "hsl(146, 100%, 86%)",
          200: "hsl(146, 100%, 77%)",
          300: "hsl(146, 100%, 68%)",
          400: "hsl(146, 100%, 59%)",
          500: "hsl(146, 100%, 54%)",
          600: "hsl(146, 100%, 41%)",
          700: "hsl(146, 100%, 32%)",
          800: "hsl(146, 100%, 23%)",
          900: "hsl(146, 100%, 14%)",
          950: "hsv(146, 100%, 9%)",
        },
        blue: {
          50: "hsl(214.4, 100%, 95%)",
          100: "hsl(214.4, 100%, 86%)",
          200: "hsl(214.4, 100%, 77%)",
          300: "hsl(214.4, 100%, 68%)",
          400: "hsl(214.4, 100%, 59%)",
          500: "hsl(214.4, 100%, 54%)",
          600: "hsl(214.4, 100%, 41%)",
          700: "hsl(214.4, 100%, 32%)",
          800: "hsl(214.4, 100%, 23%)",
          900: "hsl(214.4, 100%, 14%)",
          950: "hsl(214.4, 100%, 5%)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
