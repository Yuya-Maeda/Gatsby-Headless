import React from 'react';
import { Layout } from 'components';
import { CartContents } from '../components/CartContents';
import { SEO } from '../components';
export default function CartPage() {
  return (
    <Layout>
      
      <SEO description="Gatsby Shopify Example" title="Gastby Headless" />
      Cart Contents
      <CartContents />
    </Layout>
  );
}
