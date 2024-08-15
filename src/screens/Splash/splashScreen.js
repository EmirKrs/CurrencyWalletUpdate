import { View, StyleSheet, } from "react-native";
import React, { useEffect, } from "react";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appSettings from "../../../settings";

const SplashScreen = ({ navigation }) => {

  const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/token/refresh`;
  
  useEffect(()=> {
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
      const token = await AsyncStorage.getItem('token');
      const expireDateString = await AsyncStorage.getItem('expireDate');

      if (token && expireDateString) {
        const now = new Date();
        const expireDate = new Date(expireDateString);
        const diffInMillis = expireDate.getTime() - now.getTime();
        const diffInHours = diffInMillis / (1000 * 60 * 60);

        if (diffInHours <= 3) {
          refreshToken(token);
        } 
        navigation.replace('Tabs', {screen: 'Exchanges'});
        // Home ekranındaki fetch işlemi burda yapılacak.
        // navigation ile fetch işleminden dönen veri göderilecek.
      } else {
        navigation.replace('Login');
      }

    } catch (error) {
      console.error('Token validation error:', error);
      navigation.replace('Login');
    }
  };

  const refreshToken = async (token) => {
    console.log(token);
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      //console.log(data);
      if (!response.ok) {
        throw new Error('HTTP error ' + data);
      }

      const newToken = data.token;
      const newExpireDate = data.expireDate;

      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('expireDate', newExpireDate);

    } catch (error) {
      console.error('Token refresh error:', error);
      navigation.replace('Login');
    }
  };

  
  return (
    <View style={styles.container}>

        <Animatable.Image
        ref={(ref) => (imageRef = ref)}
        style={styles.image}
        animation="zoomIn"
        duration={1000}
        source={require("../../../assets/logo1.png")}>

        </Animatable.Image>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#2A629A",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode:"contain"
  },

});
export default SplashScreen;
