import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from './firebase.utils';

// Fonction qui permettra d'ajouter en bdd
// l'utilisateur qui utilise le bouton de connexion via Google
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformations = {}
) => {
  // 1er arg : instance Firestore
  // 2nd arg : le nom de la collection (ici ça sera 'users')
  // 3e arg : un identifiant unique (par exemple un id ou un uid)
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // Pour vérifier si le document existe en bdd
  // console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // pour l'inscription, on vient passer un objet supplémentaire
        // afin d'y ajouter les champs non présent lors de la création via email et password
        // (par exemple: displayName sera d'abord null, mais puisqu'il est présent
        // dans additionalInformations la valeur sera finalement mise à jour)
        ...additionalInformations,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
