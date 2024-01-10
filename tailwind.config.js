/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      DeepPurple: "#161032",
      platinum: "#E7E7E7",
      Purple: "#4F46E5",
      LightPurple: '#5D5AC9',
      white: '#FFFFFF',
      LightGreen: '#5FAD41',
      DarkGreen: '#2D936C',
      Red: '#B84A62',
      Pink: '#CA2E55',
      Lavender: '#A5A3E1',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
