import React, { useContext, useLayoutEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import { firebase } from "@firebase/app";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { Alert } from "react-native";
import Icon from "../component/Icon";
import { AuthContext } from "../context/Message";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  const { permission } = useContext(AuthContext);
  // selecting image
  const selectImage = async () => {
    if (permission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });

      if (!result.cancelled) {
        let base64Img = `data:image/jpg;base64,${result.base64}`;

        // Add your cloud name
        let apiUrl = "https://api.cloudinary.com/v1_1/shiv1323/image/upload";

        let data = {
          file: base64Img,
          upload_preset: "chat-app",
        };

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        })
          .then(async (r) => {
            let responseData = await r.json();
            const imageUrl = responseData.secure_url;
            setImage(imageUrl);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const sendMessage = async () => {
    if (!input) return Alert.alert("please enter a text");

    Keyboard.dismiss();
    db.collection("chat").doc(route.params.id).collection("message").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      image: image,
    });

    setImage(null);
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chat")
      .doc(route.params.id)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#2A3942" },
      headerTitleStyle: { color: "white" },
      headerTintColor: colors.Vivid_red,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                route.params.image ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text
            style={{
              color: colors.white,
              marginLeft: 10,
              fontWeight: "700",
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <Icon name="arrow-back-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, messages, image]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.smokeblack }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {/* chat goes here */}
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id}>
                    {data.image && (
                      <View style={styles.recieverImgView}>
                        <Image
                          source={{
                            uri: data.image,
                          }}
                          style={styles.recieverImg}
                        />
                      </View>
                    )}
                    <View style={styles.reciever}>
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                  </View>
                ) : (
                  <TouchableWithoutFeedback key={id}>
                    <View>
                      <Avatar
                        position="absolute"
                        top={8}
                        left={7}
                        rounded
                        size={30}
                        source={{
                          uri: data.photoURL,
                        }}
                      />
                      <View style={styles.sender}>
                        <Text style={styles.sendText}>{data.message}</Text>
                      </View>
                      {data.image && (
                        <View style={styles.senderImgView}>
                          <Image
                            source={{
                              uri: data.image,
                            }}
                            style={styles.senderImg}
                          />
                        </View>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                )
              )}
            </ScrollView>

            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type Message"
                underlineColorAndroid="transparent"
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity onPress={selectImage}>
                <Icon
                  name="camera"
                  size={24}
                  color={colors.Vivid_red}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                {!input ? (
                  <Icon name="mic-outline" size={24} color={colors.Vivid_red} />
                ) : (
                  <Icon name="send" size={24} color={colors.Vivid_red} />
                )}
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  textInput: {
    // bottom: 1,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: colors.white,
    padding: 10,
    color: "grey",
    borderRadius: 20,
  },
  recieverImgView: {
    borderWidth: 4,
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
    borderColor: "#005C4B",
    margin: 15,
    width: "71.7%",
    height: 258,
    position: "relative",
    left: "20%",
  },
  recieverImg: {
    width: 250,
    height: 250,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    resizeMode: "cover",
  },
  reciever: {
    padding: 10,
    marginRight: 15,
    backgroundColor: colors.Verylight_gray,
    alignSelf: "flex-end",
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 10,
    backgroundColor: colors.Brightblue,
    alignSelf: "flex-start",
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    borderBottomRightRadius: 17,
    marginLeft: 42,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },

  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  sendText: {
    fontWeight: "500",
    marginLeft: 10,
    color: colors.white,
  },
  senderImgView: {
    borderWidth: 4,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderColor: "#005C4B",
    margin: 15,
    width: "71.7%",
    height: 258,
    position: "relative",
    // right: "0%",
  },
  senderImg: {
    width: 250,
    height: 250,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    resizeMode: "cover",
  },
});
