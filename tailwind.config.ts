import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-violet': '#060925',
        'light-blue': '#15BFFD',
        'cream': '#E4E3B9',
        'light-gray': '#E9F2F6',
        'gray': '#CBD5E0',
        'medium-gray': '#8E9FAE',
        'pale-magenta': '#FEB8FF',
        'dark-magenta': '#955693',
        'violet': '#892DFF',
        'mint': '#9EE1DD',
        'strong-cyan': '#2ECCB4',
        'dark-blue': '#3840FF',
        'darker-blue': '#2622ab',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h2': '42px',
        'h3': '36px',
      },
      animation: {
        'text-shine': 'textShine 5s ease-in-out infinite',
        'fade': 'fadeIn 2s infinite',
      },
      keyframes: {
        textShine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
