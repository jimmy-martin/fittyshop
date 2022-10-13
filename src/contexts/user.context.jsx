import { createContext, useEffect, useState } from 'react';

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.methods';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // on peut se permettre de l'appeler même si le user existe déjà
        // car on vérifie ceci dans la fonction createUserDocumentFromAuth directement
        createUserDocumentFromAuth(user);
      }
      // currentUser ne peux prendre que 2 valeurs
      // soit null, soit un user
      // si il logout currentUser = null
      // sinon currentUser = user
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
