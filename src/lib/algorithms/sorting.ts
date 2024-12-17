import type { LabModule } from '@/types/LabModule.type';
import { loadWasmModule, ensureWasmModule, getWasmMemoryViews } from '@/lib/utils/loadWasmModule';

interface SortResult {
  sortedArray: number[];
  executionTime: number;
}

export function createSortArray(size: number, type: 'sorted' | 'random' | 'reversed' = 'random') {
  switch (type) {
    case 'sorted':
      return Array.from({ length: size }, (_, i) => i);
    case 'reversed':
      return Array.from({ length: size }, (_, i) => size - i - 1);
    default:
      const arr = Array.from({ length: size }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
  }
}

export async function runBubbleSort(array: number[]): Promise<SortResult> {
  const startTime = performance.now();
  
  // Load or get existing WASM module
  await loadWasmModule();
  const wasmModule = ensureWasmModule();
  const { HEAPU32 } = getWasmMemoryViews();
  
  // Allocate and copy array to WASM
  const ptr = wasmModule.malloc(array.length * 4);
  array.forEach((num, i) => HEAPU32[ptr / 4 + i] = num);
  
  // Run sort
  wasmModule.bubble_sort(ptr, array.length);
  
  // Get sorted array
  const sortedArray = Array.from(HEAPU32.slice(ptr / 4, ptr / 4 + array.length));

  console.log({sortedArray, ptr, array, HEAPU32})
  
  wasmModule.free(ptr);
  
  return {
    sortedArray,
    executionTime: performance.now() - startTime
  };
}
