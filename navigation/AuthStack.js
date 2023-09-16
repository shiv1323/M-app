import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import Registerscreen from "../Screens/Registerscreen";
import colors from "../config/colors";
import Homescreen from "../Screens/Homescreen";
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2A3942" },
  headerTitleStyle: { color: colors.white },
  headerTintColor: "#000",
};

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Registerscreen} />
      <Stack.Screen name="Home" component={Homescreen} />
    </Stack.Navigator>
  );
}
