import './cart-dropdown.styles.scss';
import Button from '../button/button.component';

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button style={{ fontSize: '13px' }}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
