/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { rapid: '#7C6FE9', 'rapid-light': '#A99FFF', success: '#34D399', ink: '#090A12' }
    }
  },
  plugins: []
};
