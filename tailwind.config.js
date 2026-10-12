/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        romantic: ['"Dancing Script"', "cursive"],
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Quicksand"', "sans-serif"],
      },
      animation: {
        heartbeat: "heartbeat 1.6s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        wiggle: "wiggle 0.35s ease-in-out",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.08)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.12)" },
          "70%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-6deg)" },
          "40%": { transform: "rotate(6deg)" },
          "60%": { transform: "rotate(-4deg)" },
          "80%": { transform: "rotate(4deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
