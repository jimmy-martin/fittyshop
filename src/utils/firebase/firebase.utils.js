import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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

export const db = getFirestore();

// Fonction qui permettra d'ajouter en bdd
// l'utilisateur qui utilise le bouton de connexion via Google
export const createUserDocumentFromAuth = async (userAuth) => {
  // 1er arg : instance Firestore
  // 2nd arg : le nom de la collection (ici ça sera 'users')
  // 3e arg : un identifiant unique (par exemple un id ou un uid)
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  // Pour vérifier si le document existe en bdd
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
