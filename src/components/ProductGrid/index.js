import React from 'react';
import { ProductTile } from '../ProductTitle';
import { ProductGridWrapper } from './style';

export function ProductGrid({ products }) {
  return (
    <ProductGridWrapper>
      {products.map(product => (
        
        <ProductTile 
        key={product.shopifyId}
        title={product.title}
        description={product.description}
        minPrice={product.priceRange.minVariantPrice.amount}
        handle={product.handle}
        imageFluid={product.images[0].localFile.childImageSharp.fluid}/>
      ))}
    </ProductGridWrapper>
  );
}
