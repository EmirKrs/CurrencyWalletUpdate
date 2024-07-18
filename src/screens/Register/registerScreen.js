import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import appSettings from "../../../settings";

//Components
import InputForm from "./Components/inputForm";
import ButtonForm from "./Components/buttonForm";

const RegisterScreen = ({ navigation }) => {
  const [nameText, setNameText] = useState("");
  const [surnametext, setSurnameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [passwordConText, setPasswordConText] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (emailText) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(emailText);
  };

  const validatePhone = (phoneText) => {
    const regex = /^05\d{2}\d{3}\d{4}$/;
    return regex.test(phoneText);
  };

  const validatePassword = (passwordText) => {
    // Örnek validasyon: En az 6 karakter, büyük harf, küçük harf, rakam içermeli
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(passwordText);
  };

  const validatePasswordCon = (passwordText, passwordConText) => {
    return passwordText === passwordConText;
  };

  const handleRegister = () => {
     if(!validatePhone(phoneText)) {
      setError('Lütfen geçerli bir telefon numarası girin.');
      return;
    } 

    if (!validateEmail(emailText)) {
      setError("Lütfen Geçerli bir email adresi girin.");
      return;
    } 

    if (!validatePassword(passwordText)) {
      setError(
        "Şifreniz 6 karakterden uzun olmalı ve büyük harf, küçük harf, rakam içermelidir."
      );
      return;
    } 

    if (!validatePasswordCon(passwordText, passwordConText)) {
      setError("Şifreler uyuşmuyor.");
      return;
    } 

    const postData = async () => {
      const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/users/register`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameText,
            surname: surnametext,
            emailAddress: emailText,
            phoneNumber: phoneText,
            username: usernameText,
            password: passwordText,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          if (responseData.Messages?.[0]) {
            ToastAndroid.show(`${responseData.Messages[0]}`, ToastAndroid.SHORT);
          }
          else
          {
            ToastAndroid.show(`Beklenmedik bir hata alındı.`, ToastAndroid.SHORT);
          }

          return;
        }

        if (!responseData.isSuccess) {
          setError(responseData.Messages?.[0]);
        } else {
          ToastAndroid.show('Kayıt işlemi başarılı!', ToastAndroid.SHORT);
          console.log(responseData)
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    postData();
    setError("");
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo1.png")}
            style={styles.logo}
          ></Image>
        </View>

        <InputForm
          nameText={nameText}
          surnametext={surnametext}
          phoneText={phoneText}
          usernameText={usernameText}
          emailText={emailText}
          passwordText={passwordText}
          passwordConText={passwordConText}
          setNameText={setNameText}
          setSurnameText={setSurnameText}
          setPhoneText={setPhoneText}
          setUsernameText={setUsernameText}
          setEmailText={setEmailText}
          setPasswordText={setPasswordText}
          setPasswordConText={setPasswordConText}
        />

        <Text style={styles.error}>{error}</Text>

        <ButtonForm navigation={navigation} handleRegister={handleRegister} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "35%",
  },
  error: {
    marginTop: 10,
    width: "80%",
    textAlign: "center",
    fontSize: 14,
    color: "red",
  },
});

export default RegisterScreen;
