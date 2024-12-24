import linearSearchSource from '@/../../mlab/src/core/algorithms/search/linear_search.cpp?raw'
import bubbleSortSource from '@/../../mlab/src/core/algorithms/sort/bubble_sort.cpp?raw'

interface SourceFile {
  code: string
  path: string
}

const sourceFiles: Record<string, SourceFile> = {
  'linear_search.cpp': {
    code: linearSearchSource,
    path: 'src/core/algorithms/search/linear_search.cpp',
  },
  'bubble_sort.cpp': {
    code: bubbleSortSource,
    path: 'src/core/algorithms/sort/bubble_sort.cpp',
  },
}

export function getSourceFile(filename: string): SourceFile | undefined {
  return sourceFiles[filename]
}

export function getAllSourceFiles(): SourceFile[] {
  return Object.keys(sourceFiles).map((key) => sourceFiles[key])
}
