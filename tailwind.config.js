/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      darkTheme: '#101010',
      white: '#FFFFFF',
      productGreen: '#97E398',
      basicDark: '#000000',
      productRed: '#E11212',
      productYellow: '#FFCC00',
    },
  },
  plugins: [],
};
