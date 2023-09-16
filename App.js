import React, { useEffect } from "react";
import { Message } from "./context/Message";
import Appnav from "./navigation/Appnav";
import OfflineNotice from "./component/OfflineNotice";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <Message>
      <Appnav />
      <OfflineNotice />
    </Message>
  );
}
