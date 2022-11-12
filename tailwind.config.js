/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '200': '50rem',
      },
    },
  },
  plugins: [],
}
