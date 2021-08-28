import React from 'react';
import { CollectionTile } from '../CollectionTile';
import { RemainingCollectionsWrapper } from './style';
export function HomepageCollectionsGrid({ collections }) {
  const saleCollection = collections.find(
    collection => collection.title === 'SALE'
  );
  const remainingCollections = collections.filter(
    collection => collection.title !== 'SALE'
  );

  return (
    <div>
      {!!saleCollection && (
        <CollectionTile
          sale
          destination={`/all-products?c=${encodeURIComponent( saleCollection.shopifyId)}`}
          title={saleCollection.title}
          description={saleCollection.description}
          backgroundImage={
            saleCollection.image?.localFile.childImageSharp.fluid
          }
        />
      )}
      <RemainingCollectionsWrapper>
        {remainingCollections.map(collection => (
          <CollectionTile
            key={collection.shopifyId}
            destination={`/all-products?c=${encodeURIComponent(collection.shopifyId)}`}
            title={collection.title}
            description={collection.description}
            backgroundImage={collection.image?.localFile.childImageSharp.fluid}
          />
        ))}
      </RemainingCollectionsWrapper>
    </div>
  );
}
