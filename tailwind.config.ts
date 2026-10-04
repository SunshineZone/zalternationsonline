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
        retro: {
          sky: "#3a88e9",
          skyDark: "#1b4d9b",
          pipeGreen: "#54b937",
          pipeDark: "#2c7219",
          pipeHighlight: "#85e05a",
          groundGreen: "#70c042",
          groundBrown: "#b46428",
          darkBg: "#0b111e",
          cardBg: "#111a2e",
          cardBorder: "#203152",
          yellow: "#ffce00",
          yellowHover: "#ffd83b",
          accentBlue: "#3b82f6",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "'Press Start 2P'", "monospace"],
        silkscreen: ["var(--font-silkscreen)", "'Silkscreen'", "monospace"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px 0px #000',
        'pixel': '4px 4px 0px 0px #000',
        'pixel-lg': '6px 6px 0px 0px #000',
        'pixel-yellow': '4px 4px 0px 0px #c29500',
        'pixel-blue': '4px 4px 0px 0px #1e3a8a',
        'pixel-card': '0 8px 0 0 rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
