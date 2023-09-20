/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte,html,js,ts}"],
  theme: {
    fontFamily: {
      "sans": ["Poppins", "sans"],
    },
    extend: {
      fontFamily: {
        "smooth": ["Quicksand", "sans"],
        "accent": ["Space Grotesk", "sans-serif"],
      },
      colors: {
        "primary": "#1e88e5",
      }
    },
  },
  plugins: [],
}

