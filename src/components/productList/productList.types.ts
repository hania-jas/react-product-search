export interface ProductListProps {
  products: Product[];
  isErrorVisible: boolean;
  isLoading: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
}