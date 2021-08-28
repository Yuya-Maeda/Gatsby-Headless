import React from 'react';
import ProductContext from '../../context/ProductContext';
import { ProductGrid } from '../ProductGrid';
export function FeaturedProduct() {
  const { collections } = React.useContext(ProductContext);
  const featuredCollection = collections.find(
    collection => collection.title === 'Featured Products'
  );
  console.log(featuredCollection);
  return (
    <section>
      <h1>Feature Products</h1>
      <ProductGrid products={featuredCollection.products} />
    </section>
  );
}
