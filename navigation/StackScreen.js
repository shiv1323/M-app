import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "../Screens/Homescreen";
import AddChat from "../Screens/AddChat";
import ChatScreen from "../Screens/ChatScreen";
import colors from "../config/colors";
import LoginScreen from "../Screens/LoginScreen";
const stack = createStackNavigator();

// header color
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2A3942" },
  headerTitleStyle: { color: colors.white },
  headerTintColor: "#000",
};
export default function StackScreen() {
  return (
    <stack.Navigator
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <stack.Screen name="Home" component={Homescreen} />
      <stack.Screen name="AddChat" component={AddChat} />
      <stack.Screen name="Chat" component={ChatScreen} />
      <stack.Screen name="Login" component={LoginScreen} />
    </stack.Navigator>
  );
}
