import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // All source files live in the project root, not /src
  root: '.',
  build: {
    outDir: 'dist',
  },
});
