import linearSearchSource from '@/cpp/algorithms/searching/linear_search.cpp?raw';
import bubbleSortSource from '@/cpp/algorithms/sorting/bubble_sort.cpp?raw';

interface SourceFile {
  code: string;
  path: string;
}

const sourceFiles: Record<string, SourceFile> = {
  'linear_search.cpp': {
    code: linearSearchSource,
    path: 'src/cpp/algorithms/searching/linear_search.cpp'
  },
  'bubble_sort.cpp': {
    code: bubbleSortSource,
    path: 'src/cpp/algorithms/sorting/bubble_sort.cpp'
  },
};

export function getSourceFile(filename: string): SourceFile | undefined {
  return sourceFiles[filename];
}

export function getAllSourceFiles(): SourceFile[] {
  return Object.values(sourceFiles);
} 