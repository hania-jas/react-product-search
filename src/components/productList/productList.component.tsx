import React, { useMemo, useState, type JSX } from 'react'
import type { ProductListProps } from './productList.types';
import type { Filters, HighlightedResult, Product } from '../../interfaces';
import { SortSettings } from '../../enums';
import { highlightFirstMatchedText } from '../../utils';

export const ProductList: (props: ProductListProps) => JSX.Element = (props: ProductListProps): JSX.Element => {
  const { products, isErrorVisible, isLoading, debouncedValue } = props;
  const [filters, setFilters] = useState<Filters>({
    isInStock: false, type: 'all', sortSetting: SortSettings.Rating_desc
  });

    const onSort: (products: Product[], setting: SortSettings) => Product[] = (products: Product[], setting: SortSettings): Product[] => {
    const localProducts = [...products];

    switch (setting) {
      case SortSettings.Price_desc: 
        return localProducts.sort((a, b) => b.price - a.price);
      case SortSettings.Price_asc: 
        return localProducts.sort((a, b) => a.price - b.price);
      case SortSettings.Name_asc: 
        return localProducts.sort((a, b) => a.name.localeCompare(b.name));
      case SortSettings.Rating_desc:
      default:
        return localProducts.sort((a, b) => b.rating - a.rating);
    }
  }

  const visibleProducts: Product[] = useMemo((): Product[] => {
    const filteredProducts: Product[] = products.filter((p: Product): boolean => {
      return (!filters.isInStock || p.inStock) &&
      (filters.type === 'all' || p.category === filters.type)
    });

      return onSort(filteredProducts, filters.sortSetting)
  }, [products, filters])

  const onFilter: (checked: boolean) => void = (checked: boolean): void => {
    setFilters((prevFilters: Filters): Filters => ({ ...prevFilters, isInStock: checked }))
  }

  const onCategoryChange: (category: string) => void = (category: string): void => {
    setFilters((prevFilters): Filters => ({ ...prevFilters, type: category }))
  }

  const categories: string[] = useMemo(
    () => {
      const set: Set<string> = new Set(products.map((p: Product): string => p.category));
      return ['all', ...Array.from(set)];
    }, [products]);


  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isErrorVisible ? (
        <>Something went wrong</>
        ) : (
          visibleProducts.length ? (
            <div>
              {visibleProducts.map((product: Product): JSX.Element => (
                <div key={product.id} style={{ display: 'flex', whiteSpace: 'pre-wrap' }}>
                  {highlightFirstMatchedText(product.name, debouncedValue)?.map((chunk: HighlightedResult, index: number): JSX.Element => (
                    <span key={index} style={chunk.isMatch ? { color: 'red' } : undefined }>{chunk.value}</span>
                  ))}
                </div>
              ))}
            </div>
        ) : (
          <>No results</>
        ))
      )}
      <div>
        <input checked={filters.isInStock} type="checkbox" name="filterInStock" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onFilter(e.target.checked)} disabled={isLoading || isErrorVisible} />
        <label style={{ margin: '10px'}} htmlFor="filterInStock">Only in stock</label>
      </div>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => onCategoryChange(e.target.value)}
        disabled={isLoading || isErrorVisible}
        style={{ margin: '10px'}}
        value={filters.type}
      >
        {categories.map((category: string): JSX.Element => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>  setFilters((prevFilters: Filters): Filters => ({ ...prevFilters, sortSetting: e.target.value as SortSettings }))}
        disabled={isLoading || isErrorVisible}
        style={{ margin: '10px'}}
        value={filters.sortSetting}
      >
        {Object.values(SortSettings).map((setting: SortSettings): JSX.Element => (
          <option key={setting} value={setting}>{setting}</option>
        ))}
      </select>
    </>
  );
}
