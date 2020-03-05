import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {

    apiKey: "AIzaSyBkgsU62jyLZxOApX9G9HJFGKr4T6eDnZE",
    authDomain: "clothing-store-db1.firebaseapp.com",
    databaseURL: "https://clothing-store-db1.firebaseio.com",
    projectId: "clothing-store-db1",
    storageBucket: "clothing-store-db1.appspot.com",
    messagingSenderId: "623880013963",
    appId: "1:623880013963:web:2c4e36022d7196fe9f6c8e",
    measurementId: "G-Q259GD1H6Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot)

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }

    }

    return userRef;

};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




