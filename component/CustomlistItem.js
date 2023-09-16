import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import Icon from "./Icon";
import { db } from "../firebase";
const CustomlistItem = ({ id, chatName, enterChat, image }) => {
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chat")
      .doc(id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatMessage(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);

  return (
    <ListItem
      onPress={() => enterChat(id, chatName, image)}
      key={id}
      bottomDivider
      containerStyle={styles.container}
    >
      <Avatar
        rounded
        source={{
          uri:
            image ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold", color: "white" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: "white" }}
        >
          {chatMessage?.[0]?.displayNmame}
          {chatMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name="chevron-forward-sharp"
        size={24}
        color={colors.dogerBlueBackground}
      />
    </ListItem>
  );
};

export default CustomlistItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
