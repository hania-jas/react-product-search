import { useCallback, useEffect, useRef, useState, type JSX, type RefObject } from 'react';
import { ProductList } from './components/productList/productList.component';
import { fetchProducts } from './api/api';
import { useDebounceValue } from './hooks';
import type { Product } from './interfaces';

const App: () => JSX.Element = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApiError, setIsApiError] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const requestIdRef: RefObject<number> = useRef<number>(0);
  const debouncedValue: string = useDebounceValue(searchValue, 400);

  const getApiData: (value: string) => void = useCallback(
    (value: string): void => {
      const requestId = ++requestIdRef.current;
      setIsApiError(false);
      setIsLoading(true);
      fetchProducts({ query: value })
        .then((result: Product[]): void => {
          if (requestId !== requestIdRef.current) {
            return
          }
          setIsApiError(false);
          setProducts(result);
        })
        .catch((): void => {
          if (requestId !== requestIdRef.current) {
            return
          }
          setIsApiError(true);
        })
        .finally((): void => {
          if (requestId !== requestIdRef.current) {
            return
          }
          setIsLoading(false)
        });
    },
    []
  );

  useEffect((): void => {
    // setState in effect is intentional here (async fetch flow)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getApiData(debouncedValue)
  }, [debouncedValue, getApiData])

  const onInputChange: (value: string) => void = (value: string): void => {
    setSearchValue(value);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        style={{ width: "300px", margin: "20px 0" }}
        value={searchValue} type='text'
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onInputChange(e.target.value)}
      />
      <ProductList products={products} isErrorVisible={isApiError} isLoading={isLoading} debouncedValue={debouncedValue} />
    </div>
  )
}

export default App
