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
      let token = 'eyJzdWIiOiJOZXRDb3JlQVBJSnd0U2FtcGxlXzRjZjQ5YmI2LTgzYWMtNDcwOS0yOTVlLTA4ZGNiZDFlZDZiMiIsImp0aSI6IjM4YzU3ZjczLTkyZjAtNDdiZi1hMGZhLTAyYTNmZDhkMDM3OSIsImlhdCI6MTcyMzczMjc1MSwiVXNlcm5hbWUiOiJFbWlyaGFuS1JTIiwiVXNlcklkIjoiNGNmNDliYjYtODNhYy00NzA5LTI5NWUtMDhkY2JkMWVkNmIyIiwiTmFtZSI6IkVtaXJoYW4iLCJTdXJuYW1lIjoiS2FyYWFyc2xhbiIsIkVtYWlsQWRkcmVzcyI6ImVtaXJrYXJhYXJzbGFuQGdtYWlsLmNvbSIsIlVzZXJSb2xlIjoiMiIsImV4cCI6MTcyMzgxOTE1MSwiaXNzIjoiTmV0Q29yZUFQSUp3dFNhbXBsZSIsImF1ZCI6Ik5ldENvcmVBUElKd3RTYW1wbGUifQ';
     // let token = await AsyncStorage.getItem("token");
      let expireDateString = await AsyncStorage.getItem("expireDate");
     // console.log(token);
     // console.log(expireDateString);

      if (token && expireDateString) {
        const now = new Date();
        const expireDate = new Date(expireDateString);
        const diffInMillis = expireDate.getTime() - now.getTime();
        const diffInHours = diffInMillis / (1000 * 60 * 60);

        if (diffInHours <= 3) {
          const response = await fetch(`${apiUrl}/token/check`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            // token geçerli ise
            await refreshToken(token);
            navigation.replace("Tabs", { screen: "Exchanges" });
          } else {
            // Token geçerli değilse
            navigation.replace("Login");
          }
        } else {
          // Token süresi 3 saatten fazlaysa
          // burada da check endpointinde token kontrolü yapılacak.
          navigation.replace("Tabs", { screen: "Exchanges" });
        }
      } else {
        // Token veya expireDate bulunmadıysa
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Token validation error:", error);
    }
  };

  const refreshToken = async (oldToken) => {
    console.log(`refreshToken metodu ESKI TOKEN DEGERI ${oldToken}`);
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
      console.log(`refreshToken metodu YENI TOKEN DEGERI ${data.token}`);

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
