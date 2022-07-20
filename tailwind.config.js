/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'half-screen': '50vh'
      },
      fontFamily: {
        pop: ['Poppins']
      },
      dropShadow: {
        'hard': '0.15rem 0.15rem 0.1rem rgba(0, 0, 0, 0.3)',
        'down': '0 0.4rem 0.3rem rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
