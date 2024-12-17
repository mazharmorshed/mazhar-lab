export interface LabModule {
    // Memory management
    malloc: (size: number) => number;
    free: (ptr: number) => void;
    
    // Algorithm functions
    linear_search: (arr: number, size: number, target: number) => number;
    bubble_sort: (arr: number, size: number) => void;
} 