import { firebase } from '@firebase/app';
import "firebase/auth";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "enter your key",
    authDomain: "enter your key",
    projectId: "enter your key",
    storageBucket: "enter your key",
    messagingSenderId: "enter your key",
    appId: "enter your key",
    measurementId: "enter your key",
};


let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('profile');
// provider.addScope('https://www.googleapis.com/auth/drive');
// firebase.auth().signInWithRedirect(provider);
export { db, auth };