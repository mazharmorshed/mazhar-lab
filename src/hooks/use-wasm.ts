import { useState, useEffect } from 'react';
import { loadWasmModule } from '@/lib/utils/loadWasmModule';

export function useWasm<T = any>(moduleName: string) {
  const [module, setModule] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadModule() {
      try {
        const wasmModule = await loadWasmModule(moduleName);
        if (mounted) {
          setModule(wasmModule as T);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          setModule(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadModule();

    return () => {
      mounted = false;
    };
  }, [moduleName]);

  return { module, error, loading };
} 