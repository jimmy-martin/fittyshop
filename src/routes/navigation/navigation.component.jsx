import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './navigation.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Navigation = () => {
  return (
    // On peut utiliser un Fragment au lieu d'une div
    // car cela permet de ne pas créer un élément html vide
    // Il ne sera pas réellement rendu sur notre application
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            SHOP
          </Link>
          <Link to="/auth" className="nav-link">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
