import React from 'react';
import { ProductTileWrapper, Title, Description, Price } from './style';
import Img from 'gatsby-image';
import { StyledLink } from '../StyledLink';

export function ProductTile({ title, imageFluid, description, minPrice, handle }) {
  return (
    <ProductTileWrapper>
      <Img fluid={imageFluid} />
      <Title>{title}</Title>
      <Description>{description.substring(0, 100)}</Description>
      <Price>¥{(minPrice * 1).toLocaleString('en-US')}から</Price>
      <StyledLink to={`/products/${handle}`}>商品を見る</StyledLink>
    </ProductTileWrapper>
  );
}
