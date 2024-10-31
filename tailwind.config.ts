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
        'win98-blue': '#0000FF',
        'win98-teal-blue': '#008080',
        'win98-dark-blue': '#000080',
        'win98-gray': '#C0C0C0',
        'win98-dark-gray': '#808080',
        'win98-light-gray': '#F0F0F0',
      },
      fontFamily: {
        win98: ['var(--font-ms-sans-serif)'], 
      },
    },
  },
  plugins: [],
};
export default config;
