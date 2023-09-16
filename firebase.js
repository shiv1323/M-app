// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {
  EXPO_PUBLIC_API_KEY,
  EXPO_PUBLIC_AUTH_DOMAIN,
  EXPO_PUBLIC_DATABASE_URL,
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_STORAGE_BUCKET,
  EXPO_PUBLIC_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_APP_ID,
  EXPO_PUBLIC_MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: EXPO_PUBLIC_API_KEY,
  authDomain: EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: EXPO_PUBLIC_DATABASE_URL,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: EXPO_PUBLIC_APP_ID,
  measurementId: EXPO_PUBLIC_MEASUREMENT_ID,
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

passwordReset: (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

const addUser = async (
  name,
  email,
  imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGEQjb_t0S5C4b2B01eMGWRSSXNLoJBKKXOQ&usqp=CAU",
  uid
) => {
  try {
    return await firebase
      .database()
      .ref("/users/" + uid)
      .set({
        name: name,
        email: email,
        imageUrl: imageUrl,
      });
  } catch (error) {
    console.log("adduser:", error);
  }
};

export { db, auth, addUser };
