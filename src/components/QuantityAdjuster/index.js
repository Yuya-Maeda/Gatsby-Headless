import React from 'react';
import { QuantityAdjusterWrapper,AdjusterButton } from './style';

export function QuantityAdjuster({ item, onAdjust }) {
  const { quantity } = item;
  const handleDecrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: -1 });
  };
  const handleIncrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: +1 });
  };

  return (
    <QuantityAdjusterWrapper>
      <AdjusterButton onClick={handleDecrementQuantity}>-</AdjusterButton>
      <div>{quantity}</div>
      <AdjusterButton onClick={handleIncrementQuantity}>+</AdjusterButton>
    </QuantityAdjusterWrapper>
  );
}
