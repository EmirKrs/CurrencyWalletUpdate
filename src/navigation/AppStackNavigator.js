import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Screens
import SplashScreen from "../screens/Splash/splashScreen";
import LoginScreen from "../screens/Login/Index";
import RegisterScreen from '../screens/Register/Index';
import TabNavigator from "./TabNavigator";
import PaymentScreen from '../screens/Payment/Index';
import ForgotPasswordScreen from '../screens/ForgotPassword/forgotPasswordScreen';
import ApproveCodeScreen from '../screens/ForgotPassword/approveCodeScreen';
import ResetPasswordScreen from '../screens/ForgotPassword/resetPasswordScreen';


const AppStack = createNativeStackNavigator();

function AppStackNavigator() {
    return (
      <AppStack.Navigator initialRouteName='Splash'>
        <AppStack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }}/>
        <AppStack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
        <AppStack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
        <AppStack.Screen name="Tabs" component={TabNavigator}  options={{ headerShown: false }}/>
        <AppStack.Screen name="Payment" component={PaymentScreen}  options={{ headerTitleAlign: 'center' }}/>
        <AppStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}  options={{ headerTitle: '' }}/>
        <AppStack.Screen name="ApproveCode" component={ApproveCodeScreen}  options={{ headerTitle: '' }}/>
        <AppStack.Screen name="ResetPassword" component={ResetPasswordScreen}  options={{ headerTitle: '' }}/>
      </AppStack.Navigator>
    );
  };

  export default AppStackNavigator;