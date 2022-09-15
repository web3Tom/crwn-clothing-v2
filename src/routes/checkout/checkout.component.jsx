import { useSelector } from 'react-redux';

import CheckoutCard from '../../components/checkout-card/checkout-card.component';
import {
  selectCartTotal,
  selectCartItems,
} from '../../store/cart/cart.selector';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';

const Checkout = () => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutCard key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
