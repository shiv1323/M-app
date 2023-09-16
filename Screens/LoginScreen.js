import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import STYLES from "../styles/index1";
import React, { useEffect, useState } from "react";

import { Image, Input } from "react-native-elements";
import { auth } from "../firebase";
import colors from "../config/colors";
import ForgotModal from "../component/ForgotModal";
import Icon from "../component/Icon";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  // sign in with google
  const signInWithGoogle = () => {};

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 27, fontWeight: "bold", color: colors.white }}
            >
              Welcome Back,
            </Text>
            <Text
              style={{
                fontSize: 19,
                fontWeight: "bold",
                color: colors.lightgrey,
              }}
            >
              Sign in to continue
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={STYLES.inputContainer}>
              <Icon
                name="mail-outline"
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
                keyboardAppearance="light"
                returnKeyType="go"
                returnKeyLabel="go"
                type="password"
                value={password}
                style={STYLES.textInput}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
              />
            </View>
            <TouchableOpacity onPress={signIn}>
              <View style={STYLES.btnPrimary}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>

            <ForgotModal />
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
            <TouchableOpacity onPress={() => signInWithGoogle}>
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
            </TouchableOpacity>
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
                Don't have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: colors.Vivid_red, fontWeight: "bold" }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
