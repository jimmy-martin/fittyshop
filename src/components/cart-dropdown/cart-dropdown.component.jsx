import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const gotoCheckoutHandler = (event) => {
    navigate('/checkout');
  };

  return (
    <CardDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button style={{ fontSize: '13px' }} onClick={gotoCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </CardDropdownContainer>
  );
};

export default CartDropdown;
