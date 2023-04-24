/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        boom: {
          "0%": { transform: "scale(0.6)",  opacity: 0  },
          "100%": { transform: "scale(1)",  opacity: 1 },
        },
        up: {
          "0%": { transform: "translateY(5rem)", opacity: 0 },
          "100%": { transform: "translateY(0rem)", opacity: 1 },
        },
      },
      animation: {
        boom: "boom 0.4s cubic-bezier(0.4, 0, 0.6, 1)",
        up: "up 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
