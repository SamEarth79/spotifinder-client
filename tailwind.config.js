/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "bg-black-bottom": "#191414",
                "bg-black-top": "#191414C2",
                "bg-black-top-2": "#191414",
                "secondary-gray": "#c1c1c1"
            },
            fontFamily: {
                Cabin: ["Cabin", "sans-serif"],
            },
        },
    },
    plugins: [],
};
