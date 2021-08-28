import React from 'react';
import { CartWrapper } from './style';
import { FaShoppingCart } from 'react-icons/fa';
import CartContext from '../../context/CartContext';



export function Cart() {
  const { checkout } = React.useContext(CartContext);
  console.log(checkout, 'checkout');
  let totalQuantity = 0;
  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity;
    });
  }
  return (
    <CartWrapper>
      <FaShoppingCart size="1.5em"  />
      <div>
        {totalQuantity} item / ¥
        {(checkout?.totalPrice *1).toLocaleString('en-US') || 0}
      </div>
    </CartWrapper>
  );
}
// toLocaleString('en-US');