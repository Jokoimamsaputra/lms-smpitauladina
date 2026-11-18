/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#142B50',
          dark: '#0D1B33',
          light: '#EAF0F8',
          hover: '#1b3764',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F5F7FB',
          muted: '#EAF0F8',
        },
        slate: {
          DEFAULT: '#64748B',
          muted: '#94A3B8',
          dark: '#334155',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#CBD5E1',
        },
        state: {
          success: '#16A34A',
          'success-bg': '#DCFCE7',
          warning: '#F59E0B',
          'warning-bg': '#FEF3C7',
          danger: '#DC2626',
          'danger-bg': '#FEE2E2',
          info: '#2563EB',
          'info-bg': '#DBEAFE',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
