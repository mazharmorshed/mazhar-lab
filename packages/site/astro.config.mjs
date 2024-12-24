// @ts-check
import { defineConfig } from 'astro/config'
import wasm from 'vite-plugin-wasm'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
// @ts-ignore
import { exec } from 'child_process'
// @ts-ignore
import { promisify } from 'util'

const execAsync = promisify(exec)

// https://astro.build/config
export default defineConfig({
  base: '/mlab',
  site: 'https://mazharmorshed.github.io/mlab',
  vite: {
    plugins: [
      wasm(),
      {
        name: 'wasm-hot-reload',
        async handleHotUpdate({ file, server }) {
          if (file.includes('../mlab/src/core') || file.includes('../../scripts/build-wasm.sh')) {
            console.log('🔄 C++ file changed, rebuilding WASM...')
            try {
              await execAsync('npm run build:wasm')
              console.log('✅ WASM rebuild complete')
              // Force reload all clients
              server.ws.send({ type: 'full-reload' })
            } catch (error) {
              console.error('❌ WASM build failed:', error)
            }
          }
        },
      },
    ],
  },
  integrations: [react(), tailwind({ applyBaseStyles: false })],
})
