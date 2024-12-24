/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MLabModule {
  // C++ functions
  ccall: (name: string, returnType: string | null, argTypes: string[], args: any[]) => any

  // Memory management
  memory: WebAssembly.Memory
  _malloc: (size: number) => number
  _free: (ptr: number) => void

  // Memory views
  HEAPU8: Uint8Array
  HEAPU32: Uint32Array
  HEAP32: Int32Array
  HEAPF64: Float64Array

  // String handling
  stringToUTF8: (str: string, outPtr: number, maxBytesToWrite: number) => void
  UTF8ToString: (ptr: number, maxBytesToRead?: number) => string

  // Algorithm functions
  _run_search_algorithm: (
    algorithmPtr: number,
    arrayPtr: number,
    size: number,
    target: number,
    caseTypePtr: number,
    resultPtr: number
  ) => number
  _run_sort_algorithm: (
    algorithmPtr: number,
    arrayPtr: number,
    size: number,
    caseTypePtr: number,
    resultPtr: number
  ) => number
}
