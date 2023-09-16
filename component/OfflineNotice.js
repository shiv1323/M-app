import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants from "expo-constants";
import Icon from "./Icon";
const OfflineNotice = () => {
  const { type, isInternetReachable } = useNetInfo();
  if (type !== "unknown" && isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Icon
          name="cloud-offline-outline"
          color={colors.gray}
          style={{ marginRight: 5 }}
          size={20}
        />
        <Text style={styles.text}>
          You're offline! Check your internet connection.
        </Text>
      </View>
    );
  }

  return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    position: "absolute",
    top: Constants.statusBarHeight,
    left: 0,
    width: "100%",
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
  },
  text: {
    color: colors.white,
  },
});
