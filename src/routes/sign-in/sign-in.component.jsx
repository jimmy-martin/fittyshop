import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

const SignIn = () => {
  useEffect(
    () => async () => {
      // auth correspond un peu comme à la mémoire
      // où sont stockées toutes les opérations d'authentification
      const response = await getRedirectResult(auth);
      if (response) {
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
      }
    },
    []
  );

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button>
    </div>
  );
};

export default SignIn;
