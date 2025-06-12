import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#edf0f2",
        secondary: "#8a8c94",
        accent: "#edd8cc",
        accentt: "#edbe9f",
        base: "#f7eee9",
        dark: "#262221",
      },
      fontFamily: {
        norman: ["Norman", "sans-serif"],
        stopsn: ["StopSN", "sans-serif"],
        custom: ["CustomFont", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
