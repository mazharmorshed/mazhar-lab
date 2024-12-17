import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './card';
import { highlight } from '@/lib/utils/highlighter';

interface CodeBlockProps {
  code: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const language = filename?.split('.').pop() || 'txt';

  useEffect(() => {
    setIsLoading(true);
    highlight(code, language)
      .then(setHighlightedCode)
      .finally(() => setIsLoading(false));
  }, [code, language]);

  return (
    <Card className={cn("w-full", className)}>
      {filename && (
        <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-mono">{filename}</p>
          <p className="text-xs text-muted-foreground uppercase">{language}</p>
        </div>
      )}
      <div className="relative w-full">
        <div 
          className={cn(
            "overflow-x-auto min-w-0",
            isLoading ? "bg-muted animate-pulse" : "bg-[#0d1117]"
          )}
        >
          {isLoading ? (
            <pre className="text-sm font-mono whitespace-pre text-muted-foreground p-4">
              {code}
            </pre>
          ) : (
            <div
              className="text-white [&>pre]:!bg-transparent [&>pre]:!p-4 [&>pre]:!m-0"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
        </div>
      </div>
    </Card>
  );
} 