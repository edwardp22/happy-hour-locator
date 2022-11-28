import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
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
  deleteDoc,
<<<<<<< Updated upstream
  addDoc,
  where,
=======
  updateDoc
>>>>>>> Stashed changes
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlhSQunMzz_BCUi2Bv6ReRlHE2kT5TqOk",
  authDomain: "happy-hour-locator-db-5c476.firebaseapp.com",
  projectId: "happy-hour-locator-db-5c476",
  storageBucket: "happy-hour-locator-db-5c476.appspot.com",
  messagingSenderId: "58222243031",
  appId: "1:58222243031:web:122b35876f034904f09492",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// instance of Google provider object
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// add user to database in users collection:
export const createUserDocumentFromAuth = async (
  userAuth,
  addditionalInformation = {},
  userType = 0
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  //check wheter or not the instance of the user exists and access data
  const userSnapshot = await getDoc(userDocRef);

  //if user data not exists (create new data in collection) -otherwise return it
  if (!userSnapshot.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addditionalInformation,
      });

      const additionalData = await getAdditional([["uid", "==", uid]]);

      if (additionalData.length) {
        putAdditional(additionalData[0].id, {
          ...additionalData[0].data,
          userType,
        });
        console.log(userType);
      } else {
        await addAdditional(userSnapshot.id, userType);
      }

      // if (email === "admin@happyhour.com") {
      //   await addAdditional(userSnapshot.id, 1);
      // } else {
      //   await addAdditional(userSnapshot.id, userType);
      // }
      // const addiRef = collection(db, "usersAdditionals");
      // await addDoc(addiRef, { uid: userSnapshot.id, card: "", userType });
    } catch (error) {
      // console.log("Error creating the user!", error.message);
    }
  }
  return userDocRef;
};

// add admin to database in admins collection:
export const createAdminDocumentFromAuth = async (
  adminAuth,
  addditionalInformation = {}
) => {
  if (!adminAuth) return;

  const adminDocRef = doc(db, "admins", adminAuth.uid);
  const adminSnapshot = await getDoc(adminDocRef);

  if (!adminSnapshot.exists()) {
    const { locationName, email } = adminAuth;
    const createdAt = new Date();
    try {
      await setDoc(adminDocRef, {
        locationName,
        email,
        createdAt,
        ...addditionalInformation,
      });
    } catch (error) {
      console.log("Error creating the admin!", error.message);
    }
  }
  return adminDocRef;
};

// sign up with email
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in with email
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// sign out
export const signOutUser = async () => await signOut(auth);

// get the state of the user (whenever it is instantiated it gives a callback)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * General function to save multiple records
 * @param {string} collectionKey
 * @param {string} documentKey
 * @param {array} objectsToAdd
 */
const addDocuments = async (collectionKey, documentKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); //let's you add operations to it, and at the end begin transaction

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[documentKey].toLowerCase()); //change title
    batch.set(docRef, object);
  });

  await batch.commit();
};

/**
 * General function to save one record
 * @param {string} collectionKey
 * @param {object} object
 * @param {string|undefined} documentKey
 * @returns new object in db
 */
const addUpdateDocument = async (collectionKey, object, documentKey) => {
  let docRef = null;
  if (documentKey) {
    docRef = doc(db, collectionKey, documentKey);
    await setDoc(docRef, object);
  } else {
    docRef = collection(db, collectionKey);
    await addDoc(docRef, object);
  }
};
// General function to save one record v2
const addUpdateDoc = async (collectionKey, documentKey, object) => {
  const docRef = doc(db, collectionKey, documentKey);
  await updateDoc(docRef, object);
};

/**
 * General function to get the data from firebase
 * @param {string} collectionName
 * @param {array} queries
 * @returns array of objects in db
 */
const getDocuments = async (collectionName, queries = []) => {
  const collectionRef = collection(db, collectionName);

  let q;

  if (queries.length) {
    q = query(collectionRef, ...queries.map((filter) => where(...filter)));
  } else {
    q = query(collectionRef);
  }

  const querySnapshot = await getDocs(q);
  const documentMap = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  return documentMap;
};

/**
 * General function to get one data from firebase
 * @param {string} collectionKey
 * @param {string} documentKey
 * @returns object in db
 */
const getDocument = async (collectionKey, documentKey) => {
  const docRef = doc(db, collectionKey, documentKey);
  const docSnap = await getDoc(docRef);
  const document = { id: docSnap.id, data: docSnap.data() };

  return document;
};

/**
 * General function to delete one document
 * @param {string} collectionName
 * @param {string} documentKey
 */
const deleteDocument = async (collectionName, documentKey) => {
  const docRef = doc(db, collectionName, documentKey);
  await deleteDoc(docRef);
};

//** Functions for documents */

// Locations
export const getLocations = async (queries = []) => {
  return getDocuments("locations", queries);
};

export const getLocation = async (documentId = "") => {
  return getDocument("locations", documentId);
};

export const addLocation = async (document = {}) => {
  return addUpdateDocument("locations", document, document.locationName);
};

export const addLocations = async (documents = []) => {
  return addDocuments("locations", "locationName", documents);
};

export const putLocation = async (id, document = {}) => {
  return addUpdateDocument("locations", document, id);
};

export const deleteLocation = async (id) => {
  return deleteDocument("locations", id);
};

// Codes
export const getCodes = async (queries = []) => {
  return getDocuments("codes", queries);
};

export const getCode = async (documentId = "") => {
  return getDocument("codes", documentId);
};

export const addCode = async (document = {}) => {
  return addUpdateDocument("codes", document);
};

export const putCode = async (id, document = {}) => {
  return addUpdateDocument("codes", document, id);
};

export const deleteCode = async (id) => {
  return deleteDocument("codes", id);
};

// Users
export const putUser = async (currentUser, document = {}) => {
  return updateProfile(currentUser, document);
};

export const putUserPassword = async (currentUser, document = {}) => {
  return updatePassword(currentUser, document);
};

// User additionals
export const addAdditional = async (uid, userType = 0) => {
  return addUpdateDocument("usersAdditionals", {
    uid,
    card: "",
    userType,
  });
};

export const putAdditional = async (id, document = {}) => {
  return addUpdateDocument("usersAdditionals", document, id);
};

export const getAdditional = async (queries = []) => {
  return getDocuments("usersAdditionals", queries);
};

export const deleteAdditional = async (id) => {
  return deleteDocument("usersAdditionals", id);
};

export const putLoc = async (document = {}) => {
  return addUpdateDoc("locations", document.locationName, document);
};