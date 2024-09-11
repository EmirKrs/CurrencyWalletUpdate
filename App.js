import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./src/navigation/AppStackNavigator";
import LoadingOverlay from "./src/components/modals/loadingOverlay";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto"/>
          <AppStackNavigator />
          <LoadingOverlay />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
