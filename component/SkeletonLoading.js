import React from "react";
import Skeleton from "./Skeleton";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const SkeletonLoading = () => {
  return (
    <View style={styles.container}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </View>
  );
};

export default SkeletonLoading;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    // justifyContent: "center",
    // alignItems: "center",
    // height: 70,
    // width: width - 50,
    // margin: 20,
  },
});
