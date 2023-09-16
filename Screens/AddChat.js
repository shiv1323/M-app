import { StatusBar } from "expo-status-bar";
import React, { useContext, useLayoutEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import colors from "../config/colors";
import SkeletonLoading from "../component/SkeletonLoading";
import { AuthContext } from "../context/Message";
import { auth, db } from "../firebase";

const AddChat = ({ navigation }) => {
  const { users, isLoading } = useContext(AuthContext);

  const filteredUsers = users.filter(
    (user) => user.uid !== auth?.currentUser?.uid
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Contact",
      headerBackTitle: "Chat",
      headerTintColor: "white",
    });
  }, []);
  const createChat = async (input, image, currentUserID, otherUserID) => {
    // Check if a chat with the same name already exists
    const chatExists = await db
      .collection("chat")
      .where("chatName", "==", input)
      .get();

    if (!chatExists.empty) {
      // A chat with the same name already exists, show an alert
      alert("A chat with the same name already exists.");
      return; // Don't proceed further
    }

    // Create a new chatroom document
    const chatroomRef = await db.collection("chat").add({
      chatName: input,
      imageUrl: image,
    });

    // Add participants to the chatroom
    await chatroomRef.collection("participants").doc(currentUserID).set({
      isParticipant: true,
    });

    await chatroomRef.collection("participants").doc(otherUserID).set({
      isParticipant: true,
    });

    navigation.goBack();
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          createChat(
            title.name,
            title.imageUrl,
            auth?.currentUser?.uid,
            title.uid
          )
        }
      >
        <View style={styles.mid}>
          <Image source={{ uri: title.imageUrl }} style={styles.img} />
          <Text style={styles.title}>{title.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <ScrollView> */}
      {isLoading ? (
        // Display the skeleton component while loading
        <SkeletonLoading />
      ) : (
        // Render the FlatList when data is available
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => <Item title={item} />}
          keyExtractor={(item) => item.uid}
        />
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: "100%",
  },
  item: {
    // backgroundColor: "green",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderRadius: 18,
  },
  title: {
    fontSize: 20,
    color: colors.white,
  },
  img: {
    height: 50,
    borderRadius: 40,
    width: 50,
    marginRight: 25,
  },
  mid: {
    flexDirection: "row",
    alignItems: "center",
  },
});
