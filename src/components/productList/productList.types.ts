import type { Product } from '../../interfaces';

export interface ProductListProps {
  products: Product[];
  isErrorVisible: boolean;
  isLoading: boolean;
  debouncedValue: string;
}
