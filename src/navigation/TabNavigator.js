import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
//Screens
import PortfolioScreen from "../screens/Portfolio/Index";
import HomeStackNavigator from "./HomeStackNavigator";
import WalletScreen from "../screens/Wallet/Index";
import ProfileScreen from "../screens/Profile/Index";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerTitleStyle:{color: '#000', fontSize: 22, fontWeight: '400'},
        tabBarActiveTintColor: "#FF7F3E",
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Portfolio") {
            iconName = "briefcase";
          } else if (route.name === "Exchanges") {
            iconName = "podium";
          } else if (route.name === "Wallet") {
            iconName = "wallet";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen
        name="Exchanges"
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate("Home");
          },
        })}
      />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
