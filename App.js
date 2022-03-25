import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import Registerscreen from './Screens/Registerscreen';
import Homescreen from './Screens/Homescreen';
import AddChat from './Screens/AddChat';
import ChatScreen from './Screens/ChatScreen';
import ForgetScreen from './Screens/ForgetScreen';
const Stack = createStackNavigator();

// header color
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#fff" },
  headerTitleStyle: { color: "#000" },
  headerTintColor: "#000",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={Registerscreen} />
        <Stack.Screen name='Forget' component={ForgetScreen} />
        <Stack.Screen name='Home' component={Homescreen} />
        <Stack.Screen name='AddChat' component={AddChat} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

