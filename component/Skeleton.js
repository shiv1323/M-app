import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated, Dimensions, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const AnimateGl = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = () => {
  const AnimatedValue = new Animated.Value(0);

  const circleAnimated = () => {
    Animated.loop(
      Animated.timing(AnimatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    circleAnimated();
  }, []);

  const translateX = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 50],
  });

  return (
    <View style={styles.container}>
      <AnimateGl
        colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateX: translateX }],
        }}
      />
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a0a0a0",
    borderColor: "#b0b0b0",
    width: 361,
    height: 60,
    margin: 20,
    overflow: "hidden",
    borderRadius: 4,
  },
});
