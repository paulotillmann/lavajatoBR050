import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/supabase-api': {
            target: env.VITE_SUPABASE_URL || 'https://funzoqxomyhhfvdtpmlw.supabase.co',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/supabase-api/, ''),
            configure: (proxy) => {
              proxy.on('error', (err) => {
                console.error('Vite Proxy Error:', err);
              });
            }
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
