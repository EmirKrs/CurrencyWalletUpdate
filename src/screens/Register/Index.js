import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { register } from "../../api/services/authService";
import {
  validateEmail,
  validatePassword,
  validatePasswordCon,
  validatePhone,
} from "../../helpers/validationHelpers";
//Components
import InputAuth from "../../components/inputs/inputAuth";
import ButtonAuth from "../../components/buttons/buttonAuth";

const { width, height } = Dimensions.get("window");

const Index = ({ navigation }) => {
  const [nameText, setNameText] = useState("");
  const [surnametext, setSurnameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [passwordConText, setPasswordConText] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!nameText.trim() || !surnametext.trim() || !usernameText.trim()) {
      setError("Lütfen boş alan bırakmayınız.");
      return;
    }
    if (!validatePhone(phoneText)) {
      setError("Lütfen geçerli bir telefon numarası girin.");
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

    fetchRegister();
    setError("");
  };

  const fetchRegister = async () => {
    try {
      const userData = {
        name: nameText,
        surname: surnametext,
        emailAddress: emailText,
        phoneNumber: phoneText,
        username: usernameText,
        password: passwordText,
      };

      const response = await register(userData);

      if (response.isSuccess) {
        ToastAndroid.show("Kayıt işlemi başarılı!", ToastAndroid.SHORT);
        console.log(response);
        navigation.navigate("Login");
      } else {
        ToastAndroid.show(response.Messages?.[0], ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        return;
      }
      console.error("FetchLogin Error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo1.png")}
              style={styles.logo}
            ></Image>
          </View>

          <InputAuth
            label={"Ad"}
            value={nameText}
            keyboardType={"default"}
            secureTextEntry={false}
            onchangeText={(nameText) => setNameText(nameText)}
          />
          <InputAuth
            label={"Soyad"}
            value={surnametext}
            keyboardType={"default"}
            secureTextEntry={false}
            onchangeText={(surnametext) => setSurnameText(surnametext)}
          />
          <InputAuth
            label={"Telefon"}
            value={phoneText}
            maxLength={11}
            keyboardType={"phone-pad"}
            secureTextEntry={false}
            onchangeText={(phoneText) => setPhoneText(phoneText)}
          />
          <InputAuth
            label={"Kullanıcı Adı"}
            value={usernameText}
            keyboardType={"default"}
            secureTextEntry={false}
            onchangeText={(usernameText) => setUsernameText(usernameText)}
          />

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
          <InputAuth
            label={"Şifre Onay"}
            value={passwordConText}
            keyboardType={"default"}
            secureTextEntry={true}
            onchangeText={(passwordConText) =>
              setPasswordConText(passwordConText)
            }
          />

          <Text style={styles.error}>{error}</Text>

          <ButtonAuth
            title={"Kayıt Ol"}
            onPress={handleRegister}
            color={"#FF7F3E"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    resizeMode: "contain",
    width: width * 0.9,
    height: height * 0.4,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  error: {
    marginTop: 10,
    width: "80%",
    textAlign: "center",
    fontSize: 14,
    color: "red",
  },
});

export default Index;
