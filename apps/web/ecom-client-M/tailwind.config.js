/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "class"], // Enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specify content paths
  theme: {
    extend: {
      colors: {
        third: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        cool: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        cool2: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        primary: "#ffd964",
        secondary: "#facc15",
        tertiary: "#334155",
        "d-green": "#4caf50",

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: "min(0.75rem,2.823529411764706vw)",
        sm: "min(0.875rem,3.294117647058824vw)",
        base: "min(1rem,3.764705882352941vw)",
        lg: "min(1.125rem,4.235294117647059vw)",
        xl: "min(1.25rem,4.705882352941176vw)",
        "2xl": "min(1.5rem,5.647058823529412vw)",
        "3xl": "min(1.875rem,7.058823529411765vw)",
        "4xl": "min(2.25rem,8.470588235294118vw)",
        "5xl": "min(3rem,11.29411764705882vw)",
        "6xl": "min(3.75rem,14.11764705882353vw)",
      },
      screens: {
        "2xl": "2000px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")], // Add plugins here if needed
};
