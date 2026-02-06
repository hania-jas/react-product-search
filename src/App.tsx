import { useEffect, useRef, useState, type JSX } from 'react';
import { ProductList } from './components/productList/productList.component';
import { fetchProducts } from './api/api';

const App: () => JSX.Element = (): JSX.Element => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const timeoutRef = useRef<number | null>(null);
  const requestIdRef = useRef<number>(0);

    const getApiData = (value: string) => {
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
  }

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
      timeoutRef.current = setTimeout(() => getApiData(searchValue), 400);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
  }, [searchValue])

  const onInputChange = (value: string) => {
    setSearchValue(value);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input style={{ width: "300px", margin: "20px 0" }} value={searchValue} type='text' onChange={(e) => onInputChange(e.target.value)} />
      <ProductList products={products} isErrorVisible={isApiError} isLoading={isLoading} />
    </div>
  )
}

export default App
