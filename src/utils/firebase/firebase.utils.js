import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeqo4UDHSQOmH67dd2TyDMCV4a-U80F-M",
  authDomain: "crwn-clothing-db-74360.firebaseapp.com",
  projectId: "crwn-clothing-db-74360",
  storageBucket: "crwn-clothing-db-74360.appspot.com",
  messagingSenderId: "68976234992",
  appId: "1:68976234992:web:3b6ba4cfbdcffbc30c0d35",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //GoogleAuth is a class from FB

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //If user snapshot does not exist
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
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};
