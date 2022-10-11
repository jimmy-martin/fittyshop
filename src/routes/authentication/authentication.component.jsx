import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.methods';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {
  useEffect(
    () => async () => {
      // auth correspond un peu comme à la mémoire
      // où sont stockées toutes les opérations d'authentification
      const response = await getRedirectResult(auth);
      if (response) {
        const { user } = response;
        await createUserDocumentFromAuth(user);
      }
    },
    []
  );

  return (
    <div>
      <h1>Sign In Page</h1>
      <button style={{ display: 'none' }} onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button>

      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
