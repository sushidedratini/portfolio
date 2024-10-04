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
        'win95-blue': '#008080',
        'win95-gray': '#C0C0C0',
        'win95-dark-gray': '#808080',
        'win95-light-gray': '#F0F0F0',
      },
      fontFamily: {
        win95: ['"MS Sans Serif"', 'sans-serif'], // Fonte característica do Windows 95
      },
    },
  },
  plugins: [],
};
export default config;
