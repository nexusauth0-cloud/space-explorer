/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: '#050814',
        neon: '#3B82F6',
        accent: '#F59E0B',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.3)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(59,130,246,0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(59,130,246,0.8)' },
        },
      },
    },
  },
  plugins: [],
};
