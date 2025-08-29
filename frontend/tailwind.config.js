/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "main-blue": "#3b50df",
        "main-bg": "#efefed",
      },
      height: {
        bluebar: "6px",
        navbar: "60px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // ✅ Added your custom animations
      animation: {
        "bounce-subtle": "bounce-subtle 0.6s ease-in-out",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "fade-scale": "fade-scale 0.6s ease-out",
        "flip-in": "flip-in 0.6s ease-out",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(30px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
        },
        "fade-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "flip-in": {
          "0%": {
            opacity: "0",
            transform: "rotateY(90deg) scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "rotateY(0deg) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
