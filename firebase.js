// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCazchLM-3tm19_7SjyYC3HC2oR0BZLS4Q",
  authDomain: "mesaage-c153d.firebaseapp.com",
  databaseURL:
    "https://mesaage-c153d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mesaage-c153d",
  storageBucket: "mesaage-c153d.appspot.com",
  messagingSenderId: "24668159825",
  appId: "1:24668159825:web:8bcfa32cd7f364e625dd70",
  measurementId: "G-DW6LD8SQ2C",
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
