import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Screens
import HomeScreen from "../screens/Home/Index";
import DetailScreen from "../screens/Details/Index";

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={() => ({headerShown: false, })}>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Details" component={DetailScreen}/>
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
