import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./src/navigation/AppStackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default App;
