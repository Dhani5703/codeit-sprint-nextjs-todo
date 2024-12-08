import type { Config } from "tailwindcss";

export default {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#FFFFFF",
        amber: "#92400E",
        state: {
          100: "#F5F7FA",
          200: "#E2E8F0",
          400: "#94A3B8",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
