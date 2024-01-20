import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKyDj3r1g2rw2B2o2vNIvmy0jSWwOnyz0",
    authDomain: "crown-clothing-db-fe96e.firebaseapp.com",
    projectId: "crown-clothing-db-fe96e",
    storageBucket: "crown-clothing-db-fe96e.appspot.com",
    messagingSenderId: "634925083336",
    appId: "1:634925083336:web:7be83e78be45049cbd93fd"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

// WORKING WITH GOOGLE AUTHENTICATION
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// WORKING WITH FIRESTORE DB TO CREATE USERS
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);

    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log('Error create the user', error.message)
        }
    };

    return userDocRef;


}