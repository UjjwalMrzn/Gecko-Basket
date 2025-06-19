import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// remove tailwindcss here

export default defineConfig({
  plugins: [react()],
});
