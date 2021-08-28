import React from 'react';
import { Layout, SEO, HomepageCollectionsGrid } from 'components';
import ProductContext from '../context/ProductContext';
import { FeaturedProduct } from '../components';

const IndexPage = () => {
  const { collections } =React.useContext(ProductContext);
  console.log(collections)
  return (
    <Layout>
      <SEO description="Gatsby Shopify Example" title="Gastby Headless" />
      <HomepageCollectionsGrid
        collections={collections.filter(
          collection => collection.title !== 'Featured Products'
        )}
      />

      {!!collections.find(
        collection => collection.title === 'Featured Products'
      ) && <FeaturedProduct />}
    </Layout>
  );
};

export default IndexPage;
