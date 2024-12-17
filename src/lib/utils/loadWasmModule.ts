import type { LabModule } from '@/types/LabModule.type';
import { baseURL } from './baseURL';

let wasmModule: LabModule | null = null;
let wasmMemory: WebAssembly.Memory | null = null;
let memoryViews: {
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;
} | null = null;

export async function loadWasmModule(): Promise<LabModule> {
  // Return existing module if already initialized
  if (wasmModule && memoryViews) return wasmModule;

  try {
    // Create memory with enough space
    wasmMemory = new WebAssembly.Memory({ 
      initial: 256,  // 16MB initial size
      maximum: 512   // 32MB maximum size
    });

    // Initialize memory views
    memoryViews = {
      HEAP8: new Int8Array(wasmMemory.buffer),
      HEAP16: new Int16Array(wasmMemory.buffer),
      HEAP32: new Int32Array(wasmMemory.buffer),
      HEAPU8: new Uint8Array(wasmMemory.buffer),
      HEAPU16: new Uint16Array(wasmMemory.buffer),
      HEAPU32: new Uint32Array(wasmMemory.buffer),
      HEAPF32: new Float32Array(wasmMemory.buffer),
      HEAPF64: new Float64Array(wasmMemory.buffer),
    };

    const env = {
      memory: wasmMemory,
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
      emscripten_resize_heap: (size: number) => {
        console.warn('Heap resize requested but not implemented');
        return 0;
      },
      emscripten_memcpy_big: (dest: any, src: any, num: any) => {
        return dest;
      },
    };

    const response = await fetch(`${baseURL}/wasm/lab.wasm`);
    const result = await WebAssembly.instantiateStreaming(response, {
      env: env,
      wasi_snapshot_preview1: {},  // Add if using WASI
    });

    wasmModule = result.instance.exports as unknown as LabModule;
    return wasmModule;
  } catch (error) {
    console.error('Failed to initialize WASM module:', error);
    throw new Error('WASM initialization failed');
  }
}

// Helper to ensure module is initialized
export function ensureWasmModule(): LabModule {
  if (!wasmModule) {
    throw new Error('WASM module not initialized. Call loadWasmModule() first.');
  }
  return wasmModule;
}

// Helper to get memory views
export function getWasmMemoryViews() {
  if (!memoryViews) {
    throw new Error('WASM memory views not initialized');
  }
  return memoryViews;
}