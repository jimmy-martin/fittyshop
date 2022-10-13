import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './navigation.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.methods';
import { UserContext } from '../../contexts/user.context';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
          {/* Si currentUser, alors un user est connecté
          donc on propose un lien de déconnexion et vice-versa */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
