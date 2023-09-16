import { ActivityIndicator, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const Indicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={colors.dogerBlueBackground} />
    </View>
  );
};

export default Indicator;
