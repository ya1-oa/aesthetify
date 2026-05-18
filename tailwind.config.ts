import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

/**
 * Aesthetify — Tailwind Design Token Config
 *
 * WHY DESIGN TOKENS?
 * Instead of writing raw color values like `bg-[#FFD6E0]` everywhere,
 * we name them: `bg-blush`. This means:
 *   - One place to change a brand color sitewide
 *   - Self-documenting classnames (bg-blush reads like a brand guide)
 *   - Easier designer ↔ developer handoff
 *
 * ALTERNATIVE: You could use CSS custom properties (--color-blush: #FFD6E0)
 * in a global CSS file and reference them in Tailwind via `theme('colors.blush')`.
 * That approach is better if your design tool exports CSS variables directly.
 * We use the Tailwind config approach because it gives us full IntelliSense.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      /**
       * BRAND COLORS
       * Palette origin: soft feminine aesthetic — blush, lavender, cream.
       * Charcoal is our only dark — avoids harsh black on delicate tones.
       */
      colors: {
        // Primary palette
        blush: {
          DEFAULT: '#FFD6E0', // Main blush pink — backgrounds, chips
          light: '#FFF0F4',   // Near-white tint — hero backgrounds
          dark: '#F4B8C8',    // Deeper blush — hover states, borders
        },
        lavender: {
          DEFAULT: '#E8D5F5', // Soft lavender — accent sections
          light: '#F5EEFF',   // Pale lavender tint
          dark: '#D0B3ED',    // Deeper lavender — buttons, tags
        },
        rose: {
          DEFAULT: '#C9919E', // Dusty rose — CTAs, icons, highlights
          dark: '#A8717E',    // Darker rose — hover on CTAs
        },
        cream: {
          DEFAULT: '#FFF8F5', // Off-white — primary page background
          dark: '#F5EDE8',    // Slightly warmer — card backgrounds
        },
        charcoal: {
          DEFAULT: '#1A1A2E', // Near-black — body text, nav
          soft: '#3D3D5C',    // Softer charcoal — secondary text
        },
      },

      /**
       * TYPOGRAPHY
       * Font pairing decision:
       *   Playfair Display (serif) — editorial, luxury, femininity → headings
       *   DM Sans (sans-serif) — clean, readable, modern → body text
       *
       * Alternative pairing: Cormorant Garamond (display) + Inter (body)
       * That's slightly more editorial/luxury. We chose DM Sans for
       * better readability on small screens (important for mobile-first shop).
       *
       * IMPORTANT: Add these to your root HTML or CSS via Google Fonts:
       * https://fonts.google.com/specimen/Playfair+Display
       * https://fonts.google.com/specimen/DM+Sans
       */
      fontFamily: {
        display: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },

      /**
       * FONT SIZES
       * We add two custom display sizes for hero headlines.
       * Standard Tailwind goes up to text-9xl (128px) — we add
       * a fluid display size for impact without media query overhead.
       */
      fontSize: {
        'display-sm': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.05' }],
      },

      /**
       * SPACING
       * We extend with a single section spacing token.
       * This keeps vertical rhythm consistent across all sections.
       */
      spacing: {
        section: '5rem',      // Standard vertical padding for page sections
        'section-lg': '8rem', // Hero / first section
      },

      /**
       * BORDER RADIUS
       * Aesthetify uses rounded, soft shapes throughout.
       * The `card` token is our primary card radius.
       */
      borderRadius: {
        card: '1.25rem',  // 20px — product cards, content blocks
        pill: '9999px',   // Full pill — buttons, tags
        arch: '50% 50% 0 0 / 60% 60% 0 0', // Arch shape for hero images (CSS trick)
      },

      /**
       * BOX SHADOW
       * Soft, diffuse shadows — nothing harsh. The `card` shadow
       * uses a blush tint in the shadow color to feel branded.
       */
      boxShadow: {
        card: '0 4px 24px 0 rgba(201, 145, 158, 0.12)',   // Blush-tinted shadow
        'card-hover': '0 8px 40px 0 rgba(201, 145, 158, 0.22)',
        glow: '0 0 32px 0 rgba(232, 213, 245, 0.6)',       // Lavender glow for accents
      },

      /**
       * BACKGROUND GRADIENTS
       * We use two signature gradients throughout the site.
       * These are defined as utilities so you write: bg-gradient-hero
       */
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FFF0F4 0%, #F5EEFF 50%, #FFF8F5 100%)',
        'gradient-section': 'linear-gradient(180deg, #FFF8F5 0%, #FFF0F4 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFFFFF 0%, #FFF0F4 100%)',
      },

      /**
       * ANIMATION
       * Subtle entrance animations — nothing bouncy or playful.
       * Aesthetic brands use slow, graceful motion.
       */
      transitionDuration: {
        DEFAULT: '200ms',
        slow: '400ms',
        slower: '600ms',
      },
      transitionTimingFunction: {
        'ease-aesthetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
      },
    },
  },

  plugins: [],
}

export default config
