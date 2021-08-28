import React from 'react';
import {
  CollectionTileWrapper,
  CollectionTitleContent,
  Title,
  Description,
} from './style';
import BackgroundImage from 'gatsby-background-image';
import { StyledLink } from '../StyledLink';

export function CollectionTile({
  description,
  title,
  backgroundImage,
  sale,
  destination,
}) {
  return (
    <CollectionTileWrapper>
      <BackgroundImage fluid={backgroundImage}>
        <CollectionTitleContent>
          <div>
            <Title sale={sale}>{title}</Title>
            <Description sale={sale}>{description}</Description>
            <StyledLink to={destination}>Shop Now!</StyledLink>
          </div>
        </CollectionTitleContent>
      </BackgroundImage>
    </CollectionTileWrapper>
  );
}
