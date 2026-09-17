/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1117',
          card: '#181b24',
          border: '#262a36',
          accent: '#10b981',
          accentHover: '#059669',
          muted: '#8b949e',
          danger: '#ef4444'
        }
      }
    },
  },
  plugins: [],
}
