import { loadWasmModule } from './utils/loadWasmModule'

interface TestResult {
  executionTime: number
  array: number[]
}

export async function runSortTest(
  algorithm: string,
  size: number,
  caseType: 'sorted' | 'random'
): Promise<TestResult> {
  try {
    const module = await loadWasmModule()

    // Allocate memory for array and strings
    const arraySize = size * 4
    const ptr = module._malloc(arraySize)
    const heap = new Int32Array(module.HEAPU32.buffer, ptr, size)

    const algorithmPtr = module._malloc(algorithm.length + 1)
    const caseTypePtr = module._malloc(caseType.length + 1)

    // Allocate memory for result struct (8 bytes for double)
    const resultPtr = module._malloc(8)

    // Write strings into WASM memory
    const algorithmArray = new Uint8Array(module.HEAPU8.buffer, algorithmPtr, algorithm.length + 1)
    const caseTypeArray = new Uint8Array(module.HEAPU8.buffer, caseTypePtr, caseType.length + 1)

    for (let i = 0; i < algorithm.length; i++) {
      algorithmArray[i] = algorithm.charCodeAt(i)
    }
    algorithmArray[algorithm.length] = 0

    for (let i = 0; i < caseType.length; i++) {
      caseTypeArray[i] = caseType.charCodeAt(i)
    }
    caseTypeArray[caseType.length] = 0

    // Call C++ function with result pointer
    module._run_sort_algorithm(algorithmPtr, ptr, size, caseTypePtr, resultPtr)

    // Read results from struct
    const duration = module.HEAPF64[resultPtr / 8]
    const resultArray = Array.from(heap)

    // Cleanup
    module._free(ptr)
    module._free(algorithmPtr)
    module._free(caseTypePtr)
    module._free(resultPtr)

    return {
      array: resultArray,
      executionTime: duration * 1000,
    }
  } catch (error) {
    console.error('Error running sort test:', error)
    throw error
  }
}

export async function runSearchTest(
  algorithm: string,
  size: number,
  target: number,
  caseType: 'sorted' | 'random'
): Promise<TestResult & { found: boolean; index: number }> {
  try {
    const module = await loadWasmModule()

    // Allocate memory for array and strings
    const arraySize = size * 4
    const ptr = module._malloc(arraySize)
    const algorithmPtr = module._malloc(algorithm.length + 1)
    const caseTypePtr = module._malloc(caseType.length + 1)

    // Allocate memory for result struct (double + int = 16 bytes with alignment)
    const resultPtr = module._malloc(16)

    // Write strings into WASM memory
    const algorithmArray = new Uint8Array(module.HEAPU8.buffer, algorithmPtr, algorithm.length + 1)
    const caseTypeArray = new Uint8Array(module.HEAPU8.buffer, caseTypePtr, caseType.length + 1)

    for (let i = 0; i < algorithm.length; i++) {
      algorithmArray[i] = algorithm.charCodeAt(i)
    }
    algorithmArray[algorithm.length] = 0

    for (let i = 0; i < caseType.length; i++) {
      caseTypeArray[i] = caseType.charCodeAt(i)
    }
    caseTypeArray[caseType.length] = 0

    // Call C++ function with result pointer
    module._run_search_algorithm(algorithmPtr, ptr, size, target, caseTypePtr, resultPtr)

    // Read results from struct
    const duration = module.HEAPF64[resultPtr / 8] // Read double
    const index = module.HEAP32[(resultPtr + 8) / 4] // Read int

    const resultArray = Array.from(new Int32Array(module.HEAPU32.buffer, ptr, size))

    // Cleanup
    module._free(ptr)
    module._free(algorithmPtr)
    module._free(caseTypePtr)
    module._free(resultPtr)

    return {
      array: resultArray,
      found: index !== -1,
      index: index,
      executionTime: duration * 1000,
    }
  } catch (error) {
    console.error('Error running search test:', error)
    throw error
  }
}
