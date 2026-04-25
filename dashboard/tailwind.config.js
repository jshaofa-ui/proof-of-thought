/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(220 15% 8%)",
        foreground: "hsl(210 20% 96%)",
        card: "hsl(220 15% 12%)",
        "card-foreground": "hsl(210 20% 96%)",
        border: "hsl(215 15% 20%)",
        primary: "hsl(262 83% 58%)",
        "primary-foreground": "hsl(0 0% 100%)",
        success: "hsl(142 71% 45%)",
        warning: "hsl(38 92% 50%)",
        danger: "hsl(0 84% 60%)",
        muted: "hsl(215 15% 30%)",
        "muted-foreground": "hsl(215 15% 55%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
