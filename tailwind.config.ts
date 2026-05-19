import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        muted: "#5f6b76",
        mist: "#f5f7f4",
        line: "#d9e0dc",
        pine: "#24564d",
        sage: "#7d9b87",
        clay: "#b75f44",
        gold: "#c2933f",
        sky: "#dbeaf0"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 33, 43, 0.08)",
        tight: "0 8px 24px rgba(23, 33, 43, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
