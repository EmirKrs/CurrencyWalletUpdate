import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

//Screens
import HomeScreen from './src/screens/Home/homeScreen';
import DetailScreen from './src/screens/Details/detailScreen';
import WalletScreen from './src/screens/Wallet/walletScreen';
import ProfileScreen from './src/screens/Profile/profileScreen';
import PortfolioScreen from './src/screens/Portfolio/portfolioScreen';
import LoginScreen from './src/screens/Login/loginScreen';
import RegisterScreen from './src/screens/Register/registerScreen';
import PaymentScreen from './src/screens/Payment/PaymentScreen';

import SplashScreen from './src/screens/splashScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();


//Home Stack
function HomeStackScreen(){
  return(
    <HomeStack.Navigator screenOptions={() => ({
      headerShown: false,
    })}>
      <HomeStack.Screen name='Home' component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen name='Details' component={DetailScreen} ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

//Bottom Tab
function TabNavigator ()  {
  return(
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerTitleAlign: 'center',
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Portfolio') {
          iconName = 'briefcase';
        } else if (route.name === 'Exchanges') {
          iconName = 'podium';
        } else if (route.name === 'Wallet') {
          iconName = 'wallet';
        } else if (route.name === 'Profile') {
          iconName ='person';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF7F3E',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Exchanges" component={HomeStackScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
   </Tab.Navigator>
  );
};

function AppStack() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Tabs" component={TabNavigator}  options={{ headerShown: false }}/>
      <Stack.Screen name="Payment" component={PaymentScreen}  options={{ headerTitleAlign: 'center' }}/>
    </Stack.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <AppStack/>

    </NavigationContainer>
  );
}

export default App;