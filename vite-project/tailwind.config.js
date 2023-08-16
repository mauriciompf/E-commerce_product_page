/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pri-orange": "hsl(26, 100%, 55%)",
        "pri-palte-orange": "hsl(25, 100%, 94%)",
        "neu-very-dark-blue": "hsl(220, 13%, 13%)",
        "neu-dark-grayish-blue": "hsl(219, 9%, 45%)",
        "neu-grayish-blue": "hsl(220, 14%, 75%)",
        "neu-light-grayish-blue": "hsl(223, 64%, 98%)",
      },
      fontFamily: {
        kumbph: ["Kumbh Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
