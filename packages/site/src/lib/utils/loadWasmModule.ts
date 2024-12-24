import type { MLabModule } from '@/types/MLabModule.type'
import { baseURL } from './baseURL'

let cachedModule: MLabModule | null = null

export async function loadWasmModule() {
  if (cachedModule) {
    return cachedModule
  }

  return new Promise<MLabModule>((resolve) => {
    window.Module = {
      onRuntimeInitialized: () => {
        cachedModule = window.Module
        if (cachedModule) {
          resolve(cachedModule)
        }
      },
    }

    const script = document.createElement('script')
    script.src = `${baseURL}/wasm/mlab_core.js`
    document.body.appendChild(script)
  })
}
