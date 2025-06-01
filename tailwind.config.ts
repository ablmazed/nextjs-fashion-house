// tailwind.config.ts
import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // fixed: use an array here
  // @ts-expect-error - daisyui is handled by the plugin, not tailwind itself
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'bumblebee'], // ইচ্ছেমত themes
  },
}

export default config
