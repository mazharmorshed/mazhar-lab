// @ts-check
import { defineConfig } from 'astro/config';
import wasm from 'vite-plugin-wasm';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// @ts-ignore
import { exec } from 'child_process';
// @ts-ignore
import { promisify } from 'util';

const execAsync = promisify(exec);

// https://astro.build/config
export default defineConfig({
  base: '/mazhar-lab', 
  site: 'https://mazharmorshed.github.io/mazhar-lab',
  vite: {
    plugins: [
      wasm(),
      {
        name: 'wasm-hot-reload',
        async handleHotUpdate({ file, server }) {
          if (file.includes('/src/cpp/')) {
            console.log('🔄 C++ file changed, rebuilding WASM...');
            try {
              await execAsync('npm run build:wasm');
              console.log('✅ WASM rebuild complete');
              // Force reload all clients
              server.ws.send({ type: 'full-reload' });
            } catch (error) {
              console.error('❌ WASM build failed:', error);
            }
          }
        }
      }
    ],
    server: {
      watch: {
        // Include C++ files in watch
        // @ts-ignore
        include: ['src/cpp/**/*.cpp', 'src/cpp/**/*.h']
      }
    }
  },
  integrations: [react(), tailwind({ applyBaseStyles: false })]
});