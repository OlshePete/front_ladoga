module.exports = {
    // content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    plugins: [require('daisyui')],
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
  }