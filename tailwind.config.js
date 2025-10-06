// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        safe: "#22c55e",     // green
        warning: "#f59e0b",  // amber
        danger: "#ef4444",   // red
        card: "#ffffff",
        surface: "#f9fafb"
      },
      boxShadow: {
        card: "0 1px 4px 0 rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
