import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.methods';
import { UserContext } from '../../contexts/user.context';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    // On peut utiliser un Fragment au lieu d'une div
    // car cela permet de ne pas créer un élément html vide
    // Il ne sera pas réellement rendu sur notre application
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {/* Si currentUser, alors un user est connecté
          donc on propose un lien de déconnexion et vice-versa */}
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
