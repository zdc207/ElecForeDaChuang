/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '2/5': '40%',  // 定义 w-2/5 为 40%
        '3/5': '60%',  // 定义 w-3/5 为 60%
      },
    },
  },
  plugins: [],
}

