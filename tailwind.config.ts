import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Legacy portfolio colors (kept for backward compat)
        black: {
          DEFAULT: "#000",
          100: "#000319",
          200: "rgba(17, 25, 40, 0.75)",
          300: "rgba(255, 255, 255, 0.125)",
        },
        white: {
          DEFAULT: "#FFF",
          100: "#BEC1DD",
          200: "#C1C2D3",
        },
        blue: {
          "100": "#E4ECFF",
          "400": "#60A5FA",
          "500": "#3B82F6",
        },
        emerald: {
          "400": "#34D399",
          "500": "#10B981",
        },
        amber: {
          "400": "#FBBF24",
          "500": "#F59E0B",
        },
        purple: "#CBACF9",

        // Stitch Obsidian Kinetic Design System Colors
        "stitch-void": "#000319",
        "background-dim": "#000212",
        "surface-base": "#0A0D24",
        "surface-container-lowest": "#060d24",
        "surface-container-low": "#141a32",
        "surface-container": "#181e36",
        "surface-container-high": "#232941",
        "surface-container-highest": "#2d344c",
        "surface-bright": "#323851",
        "surface-dim": "#0b1229",
        "stitch-primary": "#e2cdff",
        "primary-container": "#cbacf9",
        "primary-fixed": "#ecdcff",
        "primary-fixed-dim": "#d6baff",
        "on-primary": "#3c2164",
        "on-primary-fixed": "#27074e",
        "on-primary-fixed-variant": "#54397c",
        "on-primary-container": "#573c80",
        "inverse-primary": "#6c5196",
        "stitch-secondary": "#a4c9ff",
        "secondary-container": "#0267b8",
        "secondary-fixed": "#d4e3ff",
        "secondary-fixed-dim": "#a4c9ff",
        "on-secondary": "#00315d",
        "on-secondary-container": "#d6e5ff",
        "on-secondary-fixed": "#001c39",
        "on-secondary-fixed-variant": "#004883",
        "tertiary": "#dfda71",
        "tertiary-container": "#c3be59",
        "tertiary-fixed": "#ece77d",
        "tertiary-fixed-dim": "#d0ca64",
        "on-tertiary": "#343200",
        "on-tertiary-container": "#4f4c00",
        "on-tertiary-fixed": "#1e1c00",
        "on-tertiary-fixed-variant": "#4b4900",
        "on-surface": "#dce1ff",
        "on-surface-variant": "#ccc4d1",
        "on-background": "#dce1ff",
        "text-primary-stitch": "#FFFFFF",
        "text-secondary-stitch": "#C1C2D3",
        "text-muted": "#BEC1DD",
        "accent-emerald": "#34D399",
        "accent-crimson": "#E11D48",
        "accent-amber": "#FBBF24",
        "border-glass": "rgba(255,255,255,0.08)",
        "border-highlight": "rgba(203,172,249,0.3)",
        "outline-stitch": "#958e9a",
        "outline-variant": "#4a454f",
        "surface-tint": "#d6baff",
        "inverse-surface": "#dce1ff",
        "inverse-on-surface": "#292f48",
        "error-stitch": "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",

        // Shadcn/ui tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Stitch design system fonts
        "display-hero": ["Manrope", "sans-serif"],
        "display-hero-mobile": ["Manrope", "sans-serif"],
        "headline-section": ["Manrope", "sans-serif"],
        "headline-card": ["Manrope", "sans-serif"],
        "body-lead": ["Inter", "sans-serif"],
        "body-base": ["Inter", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "technical-code": ["JetBrains Mono", "monospace"],
        // existing
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Stitch type scale
        "display-hero": ["72px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-hero-mobile": ["36px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-section": ["44px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-card": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lead": ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-base": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "700" }],
        "technical-code": ["13px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      spacing: {
        // Stitch spacing scale
        "margin-mobile": "1rem",
        "margin-tablet": "2.5rem",
        "margin-desktop": "4rem",
        "margin-ultra": "6rem",
        "gutter-sm": "1rem",
        "gutter-md": "1.5rem",
        "gutter-lg": "2rem",
        "container-max": "100%",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulse_glow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(203, 172, 249, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(203, 172, 249, 0.6)" },
        },
        // Stitch animations
        rollUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        btnShimmer: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        textShimmer: {
          to: { backgroundPosition: "200% center" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        kineticPulse: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "pulse-glow": "pulse_glow 2s ease-in-out infinite",
        // Stitch
        "roll-up": "rollUp 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "btn-shimmer": "btnShimmer 3s infinite",
        "text-shimmer": "textShimmer 3s linear infinite",
        blink: "blink 1s step-end infinite",
        "kinetic-pulse": "kineticPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;