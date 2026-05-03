/** @type {import('tailwindcss').Config} */
export default {
  // Scan all TSX/TS files in the root folder (no /src prefix)
  content: [
    './index.html',
    './*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
