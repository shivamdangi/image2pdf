/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        appBg: '#F5F7FA',
        cardBg: '#FFFFFF',
        accent: '#2563EB',
        border: '#E5E7EB',
        text: '#111827',
        muted: '#6B7280',
      },
      boxShadow: {
        card: '0 2px 10px rgba(15, 23, 42, 0.06)',
        cardHover: '0 10px 24px rgba(15, 23, 42, 0.10)',
        cardDrag: '0 16px 32px rgba(15, 23, 42, 0.16)',
      },
    },
  },
  plugins: [],
};

