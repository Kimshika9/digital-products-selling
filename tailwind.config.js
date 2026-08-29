/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a14',
        secondary: '#0d1117',
        surface: {
          1: '#161b22',
          2: 'rgba(255, 255, 255, 0.04)',
          3: 'rgba(255, 255, 255, 0.06)',
        },
        accent: {
          primary: '#6c5ce7',
          secondary: '#3b82f6',
          tertiary: '#06b6d4',
        },
        text: {
          primary: '#ffffff',
          secondary: '#94a3b8',
          tertiary: '#64748b',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.4)',
        elevated: '0 8px 24px rgba(0, 0, 0, 0.5)',
        'glow-primary': '0 0 20px rgba(108, 92, 231, 0.3)',
        'glow-secondary': '0 0 20px rgba(59, 130, 246, 0.25)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.2)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
