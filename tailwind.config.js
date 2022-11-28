/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ClashDisplay-Bold': ['ClashDisplay-Bold'],
        'ClashDisplay-Extralight': ['ClashDisplay-Extralight'],
        'ClashDisplay-Regular': ['ClashDisplay-Regular'],
        'ClashDisplay-Semibold': ['ClashDisplay-Semibold'],
        'DancingScript-Bold': ['DancingScript-Bold'],
        'Humane-SemiBold': ['Humane-SemiBold'],
      },
    },
  },
  plugins: [],
}
