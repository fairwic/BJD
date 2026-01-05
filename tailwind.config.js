/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Brand Colors (Vibrant, Anime-style)
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8', // Main Blue (Bright)
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                },
                secondary: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185', // Main Pink (Cute)
                    500: '#f43f5e',
                    600: '#e11d48',
                },
                accent: {
                    light: '#fde047', // Yellow
                    DEFAULT: '#a855f7', // Purple
                    dark: '#7e22ce',
                },
                // Claymorphism Pastels
                clay: {
                    peach: '#FDBCB4',
                    blue: '#ADD8E6',
                    mint: '#98FF98',
                    lilac: '#E6E6FA',
                    pink: '#FFB6C1',
                }
            },
            fontFamily: {
                sans: ['"Nunito"', '"Noto Sans SC"', 'sans-serif'],
                display: ['"Fredoka"', '"Noto Sans SC"', 'sans-serif'],
            },
            boxShadow: {
                // Claymorphism shadows (soft, layered)
                'clay-sm': '4px 4px 12px rgba(0, 0, 0, 0.08), -2px -2px 8px rgba(255, 255, 255, 0.8)',
                'clay-md': '6px 6px 16px rgba(0, 0, 0, 0.1), -4px -4px 12px rgba(255, 255, 255, 0.9)',
                'clay-lg': '8px 8px 24px rgba(0, 0, 0, 0.12), -6px -6px 16px rgba(255, 255, 255, 1)',
                // Soft glow effects
                'glow-rose': '0 0 20px rgba(251, 113, 133, 0.4)',
                'glow-blue': '0 0 20px rgba(56, 189, 248, 0.4)',
                'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
            },
            borderRadius: {
                'clay': '16px',
                '2xl': '16px',
                '3xl': '24px',
            },
            animation: {
                'bounce-soft': 'bounce-soft 0.4s ease-out',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.3s ease-out',
                'fade-in': 'fade-in 0.2s ease-out',
            },
            keyframes: {
                'bounce-soft': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.95)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(251, 113, 133, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(251, 113, 133, 0.6)' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            transitionDuration: {
                '250': '250ms',
            },
        },
    },
    plugins: [],
}
