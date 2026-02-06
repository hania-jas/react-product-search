import React, { useMemo, useState } from 'react'
import { SortSettings } from './productList.enum';
import type { Product, ProductListProps } from './productList.types';

export const ProductList = (props: ProductListProps) => {
  const { products, isErrorVisible, isLoading } = props;
  const [filters, setFilters] = useState({
    isInStock: false, type: 'all', sortSetting: SortSettings.Rating_desc
  })

    const onSort = (products: Product[], setting: SortSettings) => {
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

  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter((p) => {
      return (!filters.isInStock || p.inStock) &&
      (filters.type === 'all' || p.category === filters.type)
    });

      return onSort(filteredProducts, filters.sortSetting)
  }, [products, filters])

  const onFilter = (checked: boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, isInStock: checked }))
  }

  const onCategoryChange = (category: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, type: category }))
  }

  const categories = useMemo(
    () => {
      const set = new Set(products.map(p => p.category));
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
            <>
              {visibleProducts.map((product) => (
                <div key={product.id}>{product.name}</div>
              ))}
            </>
        ) : (
          <>No results</>
        ))
      )}
      <div>
        <input checked={filters.isInStock} type="checkbox" name="filterInStock" onChange={(e) => onFilter(e.target.checked)} disabled={isLoading || isErrorVisible} />
        <label style={{ margin: '10px'}} htmlFor="filterInStock">Only in stock</label>
      </div>
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        disabled={isLoading || isErrorVisible}
        style={{ margin: '10px'}}
        value={filters.type}
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select
        onChange={(e) =>  setFilters((prevFilters) => ({ ...prevFilters, sortSetting: e.target.value as SortSettings }))}
        disabled={isLoading || isErrorVisible}
        style={{ margin: '10px'}}
        value={filters.sortSetting}
      >
        {Object.values(SortSettings).map((setting) => (
          <option key={setting} value={setting}>{setting}</option>
        ))}
      </select>
    </>
  );
}
