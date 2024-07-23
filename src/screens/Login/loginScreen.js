import { StyleSheet, Image, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import appSettings from "../../../settings";
import InputAuth from "../../components/input/inputAuth";
import ButtonAuth from "../../components/button/buttonAuth";

const LoginScreen = ({ navigation }) => {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [error, setError] = useState("");

  const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/auth/login`;

  const validateEmail = (emailText) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(emailText);
  };

  const handleLogin = async () => {
    if (!emailText.trim()) {
      setError("Email alanı boş olamaz");
      return;
    }

    if (!passwordText.trim()) {
      setError("Şifre alanı boş olamaz");
      return;
    }

    if (!validateEmail(emailText)) {
      setError("Lütfen Geçerli bir email adresi girin");
      return;
    }
    if (passwordText.length < 6) {
      setError("Lütfen şifreyi kontrol edin");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity: emailText,
          password: passwordText,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      //console.log(data);

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("expireDate", data.expireDate);

      navigation.replace("Tabs");
      setError("");
    } catch (error) {
      //console.error('Login error:', error);
      ToastAndroid.show("Lütfen geçerli bir şifre girin", ToastAndroid.SHORT);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo1.png")}
          style={styles.logo}
        ></Image>
      </View>

      <InputAuth
        label={"Email"}
        value={emailText}
        keyboardType={"email-address"}
        secureTextEntry={false}
        onchangeText={(emailText) => setEmailText(emailText)}
      />

      <InputAuth
        label={"Şifre"}
        value={passwordText}
        keyboardType={"default"}
        secureTextEntry={true}
        onchangeText={(passwordText) => setPasswordText(passwordText)}
      />

      <Text style={styles.error}>{error}</Text>

      <ButtonAuth 
      title={"Giriş"} 
      onPress={handleLogin} 
      color={"#2A629A"} />

      <ButtonAuth 
      title={"Kayıt"} 
      onPress={handleRegister} 
      color={"#FF7F3E"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "35%",
    marginBottom: 30,
  },
  error: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
});
export default LoginScreen;
