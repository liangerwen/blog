import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./posts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      pad: { max: "900px", min: "640px" },
      moblie: { max: "640px" },
      md: { max: "768px" },
      lg: { max: "900px" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "scroll-down-effect": "scroll-down-effect 1.5s infinite",
      },
      keyframes: {
        "scroll-down-effect": {
          "0%": { opacity: "0.4", transform: "translate(0, 0)" },
          "50%": {
            opacity: "1",
            filter: "none",
            transform: "translate(0, -16px)",
          },
          "100%": { opacity: "0.4", transform: "translate(0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
