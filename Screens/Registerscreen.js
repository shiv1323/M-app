import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import STYLES from "../styles/index1";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Input } from "react-native-elements";
import { addUser, auth } from "../firebase";
import colors from "../config/colors";
import Icon from "../component/Icon";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Indicator from "../component/Indicator";
import { AuthContext } from "../context/Message";

const Registerscreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const { permission } = useContext(AuthContext);

  // selecting image
  const selectImage = async () => {
    setIsLoading(true);
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
            setImageUrl(responseData.secure_url);
            setIsLoading(false);
          })
          .catch((err) => setIsLoading(false));
      }
    }
  };
  // if u one want to change image
  const handlePress = () => {
    if (!imageUrl) selectImage();
    else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImageUrl(null) },
        { text: "No" },
      ]);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // This will hide the back button
    });
  }, []);
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGEQjb_t0S5C4b2B01eMGWRSSXNLoJBKKXOQ&usqp=CAU",
        });
        addUser(name, authUser["user"].email, imageUrl, authUser["user"].uid)
          .then(() => console.log("g"))
          .catch((e) => console.log(e));
      })
      .catch((error) => console.log(error));
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.img__container}>
            {imageUrl ? (
              loading ? (
                <Indicator />
              ) : (
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
              )
            ) : (
              <Image
                source={{
                  uri: "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
                }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
              />
            )}

            <View style={styles.uploadBtnContainer}>
              <Icon
                name="camera"
                size={30}
                color={colors.dogerBlueBackground}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person-outline"
              color={colors.lightgrey}
              size={20}
              style={STYLES.inputIcon}
            />
            <Input
              style={STYLES.input}
              placeholder="Full Name"
              autoFocus
              type="text"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail"
              color={colors.lightgrey}
              size={20}
              style={STYLES.inputIcon}
            />
            <Input
              placeholder="Enter your email"
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              autoFocus
              style={STYLES.input}
              type="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-closed-outline"
              color={colors.lightgrey}
              size={20}
              style={STYLES.inputIcon}
            />

            <Input
              icon="key"
              placeholder="Enter your password"
              secureTextEntry
              autoCompleteType="password"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              type="password"
              value={password}
              style={STYLES.textInput}
              onChangeText={(text) => setPassword(text)}
              // onSubmitEditing={signIn}
            />
          </View>
          <TouchableOpacity onPress={register}>
            <View style={STYLES.btnPrimary}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={STYLES.line}></View>
            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              OR
            </Text>
            <View style={STYLES.line}></View>
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={STYLES.btnSecondary}>
                <Image
                  style={STYLES.btnImage}
                  source={require("../assets/2.png")}
                />

                <Text
                  style={{
                    fontWeight: "bold",
                    marginLeft: 40,
                    fontSize: 16,
                    color: colors.white,
                    textAlign: "center",
                    marginRight: 10,
                  }}
                >
                  Continue with Google
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: colors.lightgrey, fontWeight: "bold" }}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.Vivid_red, fontWeight: "bold" }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registerscreen;

const styles = StyleSheet.create({
  img__container: {
    alignItems: "center",
    marginTop: 26.5,
  },
  uploadBtnContainer: {
    position: "absolute",
    top: 78,
    left: "59%",
  },
});
