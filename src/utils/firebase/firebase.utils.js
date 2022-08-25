import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeqo4UDHSQOmH67dd2TyDMCV4a-U80F-M",
  authDomain: "crwn-clothing-db-74360.firebaseapp.com",
  projectId: "crwn-clothing-db-74360",
  storageBucket: "crwn-clothing-db-74360.appspot.com",
  messagingSenderId: "68976234992",
  appId: "1:68976234992:web:3b6ba4cfbdcffbc30c0d35",
};

//Firebase initialize
const firebaseApp = initializeApp(firebaseConfig);

//Providers
const googleprovider = new GoogleAuthProvider(); //GoogleAuth is a class from FB

//Google Prompt default
googleprovider.setCustomParameters({
  prompt: "select_account",
});

//auth keeps track of what users are signed in at the moment
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

//Add collection method and its respective documents
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

//Get products and categories
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

//Add document method: Sign-Up Form: sets a display name, email, generates createdAt date
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //If user snapshot does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

//Create Auth via email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//Sign In user with email/pass
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign out user
export const signOutUser = async () => await signOut(auth);

//Observable listener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
