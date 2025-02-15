import { useState, useEffect, useRef, useCallback } from 'react';
import { Result, ResultAsync } from 'neverthrow';

type AsyncState<T> = {
  result: Result<T, Error> | null;
  loading: boolean;
};

export function useAsync<T>(asyncFn: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    result: null,
    loading: true,
  });

  // Мемоизируем функцию внутри хука
  const stableAsyncFn = useCallback(asyncFn, []); // Пустой массив зависимостей!

  useEffect(() => {
    let isMounted = true;

    const resultPromise = ResultAsync.fromPromise(
      stableAsyncFn(),
      error => error instanceof Error ? error : new Error('Unknown error')
    );

    resultPromise.then(result => {
      if (isMounted) {
        setState({
          result,
          loading: false,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stableAsyncFn]); // Теперь зависимость стабильна

  return state;
}