import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cisco: {
          navy: "#07182D",
          deep: "#0D274D",
          cyan: "#00BCEB",
          cyanDark: "#0096BD",
          emerald: "#00D084",
          green: "#6CC04A",
          bg: "#F4F6F9",
          amber: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};

export default config;

