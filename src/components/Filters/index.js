import React from 'react';
import ProductContext from '../../context/ProductContext';
import { CategoryFilterItem } from './CategoryFilterItem';
import { FiltersWrapper } from './style';


export function Filters() {
  const { collections } = React.useContext(ProductContext);

  return (
    <FiltersWrapper>
      <strong>Categories</strong>
      {collections.map(collection => (
        <CategoryFilterItem
          key={collection.shopifyId}
          title={collection.title}
          id={collection.shopifyId}
        />
      ))}
    </FiltersWrapper>
  );
}
