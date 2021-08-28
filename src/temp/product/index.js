/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../../components/Layout';
import { Grid, SelectWrapper, Price } from './styles';
import { ImageGallery, SEO } from '../../components';
import { ProductQuantityAdder } from '../../components/ProductQuantityAdder';
import CartContext from '../../context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';
import { Button } from '../../components';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
     ...ShopifyProductFields
    }
  }
`;

export default function ProductTemplate(props) {
  const { getProductById } = React.useContext(CartContext);
  const [product, setProduct] = React.useState(null);
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  //to set URL for variants
  const { search, origin, pathname } = useLocation();
  //   console.log(search, origin, pathname);
  const variantId = queryString.parse(search).variant;

  React.useEffect(() => {
    getProductById(props.data.shopifyProduct.shopifyId).then(result => {
      console.log(result);
      setProduct(result);
      setSelectedVariant(
        result.variants.find(({ id }) => id === variantId) || result.variants[0]
      );
    });
  }, [
    getProductById,
    props.data.shopifyProduct.shopifyId,
    setProduct,
    variantId,
  ]);

  //   set variantchange handler
  const handleVariantChange = e => {
    const newVariant = product?.variants.find(v => v.id === e.target.value);
    setSelectedVariant(newVariant);
    navigate(
      `${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`,
      { replace: true }
    );
  };

  return (
    <Layout>
      <SEO description={props.data.shopifyProduct.description}
      title={props.data.shopifyProduct.title}/>
      <Grid>
        <div>
          <h1>{props.data.shopifyProduct.title}</h1>
          <p>{props.data.shopifyProduct.description}</p>
          {product?.availableForSale && !!selectedVariant && (
            <>
              {product?.variants.length > 1 && (
                <SelectWrapper>
                  <strong>Variants</strong>

                  <select
                    value={selectedVariant.id}
                    onChange={handleVariantChange}
                  >
                    {product.variants.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              )}
              {!!selectedVariant && (
                <>
                  <Price>
                    ¥{(selectedVariant.price * 1).toLocaleString('en-US')}
                  </Price>
                  <ProductQuantityAdder
                    available={selectedVariant.available}
                    variantId={selectedVariant.id}
                  />
                </>
              )}
            </>
          )}
        </div>
        <div>
          <ImageGallery
            selectedVariantImageId={selectedVariant?.image.id}
            images={props.data.shopifyProduct.images}
          />
        </div>
      </Grid>
      <Button onClick={() => navigate(-1)}>戻る</Button>
    </Layout>
  );
}
