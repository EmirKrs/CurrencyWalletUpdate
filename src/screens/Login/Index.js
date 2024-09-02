import { StyleSheet, Image, Text, View, ToastAndroid,} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { validateEmail } from "../../helpers/validationHelpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import InputAuth from "../../components/inputs/inputAuth";
import ButtonAuth from "../../components/buttons/buttonAuth";
import ForgotButton from "./components/forgotButton";
import { login } from "../../api/services/authService";


const Index = ({ navigation }) => {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [error, setError] = useState("");

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

    fetchLogin();
  };
  
  const fetchLogin = async() => {
    try{
      const credentials = {
        identity: emailText,
        password: passwordText,
      };
      const response = await login(credentials);

      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("expireDate", response.expireDate);

      navigation.replace("Tabs", { screen: "Exchanges" });
      setError("");
      
    }
    catch(error){
      if (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        return;
      } 
      console.error("FetchLogin Error:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
    setEmailText("");
    setPasswordText("");
    setError("");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
    setEmailText("");
    setPasswordText("");
    setError("");
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

      <ButtonAuth title={"Giriş"} onPress={handleLogin} color={"#2A629A"} />

      <ButtonAuth title={"Kayıt"} onPress={handleRegister} color={"#FF7F3E"} />

      <ForgotButton
        title={"Şifremi Unuttum"}
        color={"#FF7F3E"}
        onPress={handleForgotPassword}
      />
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
export default Index;
