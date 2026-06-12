import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import SuccessScreen from "./screens/SuccessScreen";
import RewardScreen from "./screens/RewardScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Reward" component={RewardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
