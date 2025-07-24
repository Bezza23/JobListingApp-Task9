import type { Config } from 'tailwindcss'

const config: Config = {
  // THIS IS THE MOST IMPORTANT PART. IT TELLS TAILWIND WHERE TO LOOK FOR CLASSES.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config