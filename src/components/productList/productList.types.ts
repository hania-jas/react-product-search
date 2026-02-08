export interface ProductListProps {
  products: Product[];
  isErrorVisible: boolean;
  isLoading: boolean;
  debouncedValue: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
}

export interface HighlightedResult {
  isMatch: boolean;
  value: string;
}