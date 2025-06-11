/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                black: '#151515',
                gray: '#242424',
                green: '#4EE1A0',
                grey: '#D9D9D9',
                white: '#FFFFFF'
            },
            fontFamily: {
                space: ['"Space Grotesk"', 'sans-serif'],
            },
            fontSize: {
                '88px': ['88px', { lineHeight: '88px', letterSpacing: '-0.025em' }],
                '48px': ['48px', { lineHeight: '56px', letterSpacing: '-0.015em' }],
                '24px': ['24px', { lineHeight: '32px', letterSpacing: '0em' }],
                '18px': ['18px', { lineHeight: '28px', letterSpacing: '0em' }],
            },
        },
    },
    plugins: [],
}