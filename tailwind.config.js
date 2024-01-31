/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundColor: {
      primary: "#2C4F77",
      seconday: "#f4f5f7",
      "dark-gray": "#6B7280",
    },
    color: {
      col_primary: "#2C4F77",
      secondary: "#E5E5E5",
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "300px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundImage: {
        "glitter-blue": "url('../public/images/admin-bg.png')",
      },
    },
  },
  variants: {
    color: ["responsive", "hover", "focus", "active"],
    visibility: ["responsive", "hover", "focus"],
  },

  plugins: [],
};
