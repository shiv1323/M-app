import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/Message";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import StackScreen from "./StackScreen";
import AuthStack from "./AuthStack";

const Appnav = () => {
  const { user } = useContext(AuthContext);
  // if (!user) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={"large"} color={colors.dogerBlueBackground} />
  //     </View>
  //   );
  // }
  // else {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {user !== null ? <StackScreen /> : <AuthStack />}
    </NavigationContainer>
  );
  // }
};

export default Appnav;

const styles = StyleSheet.create({});
