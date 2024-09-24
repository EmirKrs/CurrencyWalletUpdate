import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appSettings from "../../../settings";

const SplashScreen = ({ navigation }) => {
  const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      checkTokenValidity();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    imageRef.zoomIn(3000);
  };

  const checkTokenValidity = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const expireDateString = await AsyncStorage.getItem("expireDate");

      if (token && expireDateString) {
        const response = await fetch(`${apiUrl}/token/check`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const now = new Date();
          const expireDate = new Date(expireDateString);
          const diffInMillis = expireDate.getTime() - now.getTime();
          const diffInHours = diffInMillis / (1000 * 60 * 60);

          //response okey ise token refresh kontrolü
          if (diffInHours <= 3) {
            await refreshToken(token);
          }
          navigation.replace("Tabs", { screen: "Exchanges" });
          return;
        }
      }
    } catch (error) {
      console.error("Token validation error:", error);
    }
    navigation.replace("Login");
  };
  
  const refreshToken = async (oldToken) => {
    try {
      const response = await fetch(`${apiUrl}/token/refresh`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${oldToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("HTTP error " + data.messages);
      }
      const newToken = data.token;
      const newExpireDate = data.expireDate;

      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("expireDate", newExpireDate);
    } catch (error) {
      console.error("Token refresh error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        ref={(ref) => (imageRef = ref)}
        style={styles.image}
        animation="zoomIn"
        duration={1000}
        source={require("../../../assets/logo1.png")}
      ></Animatable.Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});
export default SplashScreen;
