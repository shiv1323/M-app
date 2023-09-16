import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { db, auth } from "../firebase";
import "firebase/firestore";
import { firebase } from "@firebase/app";

export const Message = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);
  const [permission, setPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  //   check user prsent or not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
    return unsubscribe;
  }, []);

  //   users
  useEffect(() => {
    const unsubcribe = db.collection("chat").onSnapshot((snapshot) => {
      setChat(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubcribe;
  }, []);

  useEffect(() => {
    const unsubcribe = db.collection("chat").onSnapshot((snapshot) => {
      setChat(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubcribe;
  }, []);

  useEffect(() => {
    const id = chat.map(({ id }) => id);

    // Create an array to store unsubscribe functions
    const unsubscribeFunctions = id.map((item) => {
      const unsubscribe = db
        .collection("chat")
        .doc(item)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setChatMessage(snapshot.docs.map((doc) => doc.data()));
        });

      return unsubscribe; // Store the unsubscribe function in the array
    });

    // Return a cleanup function that unsubscribes from all listeners
    return () => {
      unsubscribeFunctions.forEach((unsubscribeFunction) => {
        unsubscribeFunction(); // Call each unsubscribe function to stop listeners
      });
    };
  }, [chat]);

  // getting all users from db
  useEffect(() => {
    const usersRef = firebase.database().ref("users");
    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userArray = Object.values(userData);
        setUsers(userArray);
      }
      setIsLoading(false);
    };
    // Attach a listener to retrieve data from Firebase when the component mounts
    usersRef.on("value", handleData);
    // Clean up the listener when the component unmounts
    return () => {
      usersRef.off("value", handleData);
    };
  }, []);

  // permission check
  useEffect(() => {
    const requestPermission = async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermission(granted);
      if (!granted) {
        Alert.alert("Allow M-app access photos and media on your devices");
      }
    };
    requestPermission();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        chatMessage,
        chat,
        permission,
        modalVisible,
        setModalVisible,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Message;
