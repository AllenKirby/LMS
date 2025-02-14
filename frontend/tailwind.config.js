/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
  			grotesk: [
  				'Host Grotesk',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'f-dark': '#26282A',
  			'f-gray': '#9C9C9C',
  			'f-green': '#0E6D4F',
		},
  		fontSize: {
  			'p-sc': '10px',
  			'p-sm': '13.33px',
  			'p-rg': '16px',
  			'p-lg': '19.2px',
  			'h-h6': '23.04px',
  			'h-h5': '26.67px',
  			'h-h4': '30.31px',
  			'h-h3': '33.96px',
  			'h-h2': '37.61px',
  			'h-h1': '41.26px'
  		}
    },
  },
  plugins: [],
}