import { getFirestore } from 'firebase/firestore';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCWrh1GZdW_sQ-Jvjjggm65Ul8P95Ul4Sw',
  authDomain: 'fitty-shop-db.firebaseapp.com',
  projectId: 'fitty-shop-db',
  storageBucket: 'fitty-shop-db.appspot.com',
  messagingSenderId: '457356498878',
  appId: '1:457356498878:web:5ef013942698e32d178bef',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
