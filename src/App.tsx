import { useCallback, useEffect, useRef, useState, type JSX } from 'react';
import { ProductList } from './components/productList/productList.component';
import { fetchProducts } from './api/api';
import { useDebounceValue } from './hooks';

const App: () => JSX.Element = (): JSX.Element => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const requestIdRef = useRef<number>(0);
  const debouncedValue = useDebounceValue(searchValue, 400);

  const getApiData = useCallback(
    (value: string) => {
      const requestId = ++requestIdRef.current;
      setIsApiError(false);
      setIsLoading(true);
      fetchProducts({ query: value })
        .then((result) => {
          if (requestId !== requestIdRef.current) {
            return
          }
          setIsApiError(false);
          setProducts(result);
        })
        .catch(() => {
          if (requestId !== requestIdRef.current) {
            return
          }
          setIsApiError(true);
        })
        .finally(() => {
          if (requestId !== requestIdRef.current) {
            return
          }
          setIsLoading(false)
        });
    },
    []
  );

  useEffect(() => {
    // setState in effect is intentional here (async fetch flow)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getApiData(debouncedValue)
  }, [debouncedValue, getApiData])

  const onInputChange = (value: string) => {
    setSearchValue(value);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input style={{ width: "300px", margin: "20px 0" }} value={searchValue} type='text' onChange={(e) => onInputChange(e.target.value)} />
      <ProductList products={products} isErrorVisible={isApiError} isLoading={isLoading} debouncedValue={debouncedValue} />
    </div>
  )
}

export default App
