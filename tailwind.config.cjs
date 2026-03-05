/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brilliant-rose': '#D4A5A5', // Softer dusty rose
                'sage': '#A3B18A',         // Soft muted green
                'cream': '#FDFBF7',        // Softer off-white
                'charcoal': '#2D2D2D',      // Softer black
                'off-white': '#F5F5F0',     // Muted bone white
            },
            fontFamily: {
                sans: ['Inter', 'var(--font-inter)', 'sans-serif'],
                serif: ['Playfair Display', 'var(--font-playfair)', 'serif'],
            },
            borderRadius: {
                'md': '8px',
            }
        },
    },
    plugins: [],
}
