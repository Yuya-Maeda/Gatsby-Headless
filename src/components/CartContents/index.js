import React from 'react';
import CartContext from '../../context/CartContext';
import { CartItem, CartHeader, CartFooter, Footer } from './style';
import { QuantityAdjuster } from '../QuantityAdjuster';
import { RemoveLineItem } from '../RemoveLineItem';
import { Button } from '../Button';
import { navigate } from '@reach/router';
export function CartContents() {
  const { checkout, updateLineItem } = React.useContext(CartContext);
  console.log(checkout, 'cartcontents checkout');
  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId });
  };

  return (
    <section>

      <h1>Your Cart</h1>
      {!!checkout?.lineItems.length && (

        <CartHeader>
        <div>Product</div>
        <div>Unit Price</div>
        <div>Quantity</div>
        <div>Amount</div>
        <div></div>
      </CartHeader>
        )}

      {checkout?.lineItems?.map(lineItem => (
        <CartItem key={lineItem.variant.id}>
          <div>
            <div>{lineItem.title}</div>
            <div>
              {lineItem.variant.title === 'Default Title'
                ? ''
                : lineItem.variant.title}
            </div>
          </div>
          <div>¥{(lineItem.variant.price * 1).toLocaleString('en-US')}</div>
          <div>
            <QuantityAdjuster item={lineItem} onAdjust={handleAdjustQuantity} />
          </div>
          <div>
            ¥
            {(lineItem.quantity * lineItem.variant.price).toLocaleString(
              'en-US'
            )}
          </div>
          <div>
            <RemoveLineItem lineItemId={lineItem.id} />
          </div>
        </CartItem>
      ))}
      {!!checkout?.lineItems.length && (

        <CartFooter>
        <div>
          <strong>Total:</strong>{' '}
        </div>
        <div>
          <span>¥{(checkout?.totalPrice * 1).toLocaleString('en-US')}</span>
        </div>
        <div></div>
      </CartFooter>
        )}
  {!checkout?.lineItems.length &&
  (<h3>カートは空です。</h3>)}


      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>買い物を続ける。</Button>
        </div>
        <div>
          {!!checkout?.lineItems.length && (
          <Button onClick={()=>{
            window.location.href = checkout.webUrl; //navigate to Shopify Checkout
            } }>チェックアウト</Button>
          )}
        </div>
      </Footer>
    </section>
  );
}
