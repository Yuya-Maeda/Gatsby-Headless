import React from 'react';
import { Layout, SEO } from '../components';
import { Filters } from '../components/Filters';
import ProductContext from '../context/ProductContext';
import styled from 'styled-components';
import { ProductGrid } from '../components/ProductGrid';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 20px;
  grid-template-columns: 1fr 3fr;
`;

export default function AllProducts() {
  const { products, collections } = React.useContext(ProductContext);

  const collectionProductMap = {};
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const selectedCollectionIds = qs.c?.split(',').filter(c => !!c) || [];
  const selectedCollectionIdsMap = {};
  const searchTerm = qs.s;

  selectedCollectionIds.forEach(collectionId => {
    selectedCollectionIdsMap[collectionId] = true;
  });

  //   assign collection id for each and products id for each
  if (collections) {
    collections.forEach(collection => {
      collectionProductMap[collection.shopifyId] = {};
      collection.products.forEach(product => {
        collectionProductMap[collection.shopifyId][product.shopifyId] = true;
      });
    });
  }
  console.log(collectionProductMap, 'collectionProductMap');

  const filterByCategory = product => {
    if (Object.keys(selectedCollectionIdsMap).length) {
      for (let key in selectedCollectionIdsMap) {
        if (collectionProductMap[key]?.[product.shopifyId]) {
          return true;
        }
      }
      return false;
    }

    return true;
  };
  const filterBySearchTerm = product => {
    const titleSearch = product.title.toLowerCase();
    const descriptionSearch = product.description.toLowerCase();
    const searchTarget = titleSearch.concat(descriptionSearch);
    if (searchTerm) {
      // return product.title.toLowerCase().indexOf(searchTerm.toLowerCase())>= 0;
      return searchTarget.indexOf(searchTerm.toLowerCase()) >= 0;
      //including description
    }
    return true;
  };
  const filteredProducts = products
    .filter(filterByCategory)
    .filter(filterBySearchTerm);
  //   console.log(products);
  return (
    <Layout>
      <SEO description="Gatsby Shopify Example" title="Gastby Headless"/>
      {!!searchTerm && !!filteredProducts.length && (
        <h3>
          検索ワード: <strong>{searchTerm}</strong>の結果
        </h3>
      )}
      {!!filteredProducts.length && <h4>{filteredProducts.length}の商品</h4>}
      <Content>
        <Filters />
        {!filteredProducts.length && <div>
            <h3>検索結果にお探しの商品はありません。</h3>
            検索ワード：『<strong>{searchTerm}</strong>』に該当する商品がございません。
            <br/>別の検索ワードを入力してください。
            </div>
            
            }
        {!!filteredProducts.length && (
          <div>
            <ProductGrid products={filteredProducts} />
          </div>
        )}
      </Content>
    </Layout>
  );
}
