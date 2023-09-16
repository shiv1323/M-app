import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import CustomlistItem from "../component/CustomlistItem";
import { db } from "../firebase";
import colors from "../config/colors";
import Icon from "../component/Icon";
import Profilemodel from "../component/Profilemodel";
import { AuthContext } from "../context/Message";
import SkeletonLoading from "../component/SkeletonLoading";
import { Text } from "react-native";
const Homescreen = ({ navigation }) => {
  const [chat, setChat] = useState([]);

  const { isLoading } = useContext(AuthContext);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#2A3942" },
      headerTitleStyle: { color: colors.white },
      headerTintColor: colors.black,
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Profilemodel />
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="camera-outline" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <Icon name="person-add-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName, image) => {
    navigation.navigate("Chat", {
      id,
      chatName,
      image,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <>
            {chat.map(({ id, data }) => (
              <CustomlistItem
                key={id}
                id={id}
                chatName={data.chatName}
                enterChat={enterChat}
                image={data.imageUrl}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: "100%",
    height: "100%",
  },
});
