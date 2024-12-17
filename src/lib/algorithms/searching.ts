import type { LabModule } from '@/types/LabModule.type';
import { loadWasmModule, ensureWasmModule, getWasmMemoryViews } from '@/lib/utils/loadWasmModule';

interface SearchResult {
  found: boolean;
  index: number;
  executionTime: number;
}

export function createSearchArray(size: number, type: 'sorted' | 'random' = 'sorted') {
  if (type === 'sorted') {
    return Array.from({ length: size }, (_, i) => i);
  }
  // Random array for less predictable search patterns
  return Array.from({ length: size }, () => Math.floor(Math.random() * size * 2));
}

export async function runLinearSearch(
    array: number[],
    target: number
  ): Promise<SearchResult> {
    const startTime = performance.now();
    
    try {
      // Load or get existing WASM module
      await loadWasmModule();
      const wasmModule = ensureWasmModule();
      const { HEAP32 } = getWasmMemoryViews();
  
      // Allocate memory for the array (4 bytes per integer)
      const arrayPointer = wasmModule.malloc(array.length * 4);
  
      // Use HEAP32 to write directly to the WASM memory
      HEAP32.set(array, arrayPointer / 4);
  
      // Debug: Verify memory copy
      console.log('Debug - Memory check:', {
        original: array.slice(0, 5),
        inMemory: Array.from(HEAP32.subarray(arrayPointer / 4, arrayPointer / 4 + 5)),
        target,
        arrayLength: array.length,
        arrayPointer
      });
  
      // Run search (pass the pointer directly)
      const result = wasmModule.linear_search(arrayPointer, array.length, target);
  
      // Free memory
      wasmModule.free(arrayPointer);
  
      // Debug: Log result
      console.log('Debug - Search result:', {
        target,
        result,
        found: result !== -1
      });
  
      return {
        found: result !== -1,
        index: result,
        executionTime: performance.now() - startTime
      };
    } catch (error) {
      console.error('Error in linear search:', error);
      throw error;
    }
  }
