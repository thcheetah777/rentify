/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte,html,js,ts}"],
  theme: {
    fontFamily: {
      "sans": ["Poppins", "sans"],
    },
    extend: {
      scale: {
        "smaller": "98%",
      },
      fontFamily: {
        "smooth": ["Quicksand", "sans"],
        "accent": ["Space Grotesk", "sans-serif"],
      },
      colors: {
        "primary": "#1e88e5",
      },
      spacing: {
        "nav": "12vh",
        "content": "88vh",
        "sm": "2rem",
      },
      boxShadow: {
        "around": "0px 0px 1.2rem rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [],
}

