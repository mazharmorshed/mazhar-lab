import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Card } from './card'
import { highlight } from '@/lib/utils/highlighter'

interface CodeBlockProps {
  code: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const language = filename?.split('.').pop() || 'txt'

  useEffect(() => {
    setIsLoading(true)
    highlight(code, language)
      .then(setHighlightedCode)
      .finally(() => setIsLoading(false))
  }, [code, language])

  return (
    <Card className={cn('w-full', className)}>
      {filename && (
        <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
          <p className="font-mono text-sm text-muted-foreground">{filename}</p>
          <p className="text-xs uppercase text-muted-foreground">{language}</p>
        </div>
      )}
      <div className="relative w-full">
        <div
          className={cn(
            'min-w-0 overflow-x-auto',
            isLoading ? 'animate-pulse bg-muted' : 'bg-[#0d1117]'
          )}
        >
          {isLoading ? (
            <pre className="whitespace-pre p-4 font-mono text-sm text-muted-foreground">{code}</pre>
          ) : (
            <div
              className="text-white [&>pre]:!m-0 [&>pre]:!bg-transparent [&>pre]:!p-4"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
        </div>
      </div>
    </Card>
  )
}
