import { View, Text, StyleSheet, ToastAndroid, Image, KeyboardAvoidingView, Platform,} from "react-native";
import React, { useState } from "react";
//Components
import InputAuth from "../../components/inputs/inputAuth";
import ButtonAuth from "../../components/buttons/buttonAuth";
import { forgotPassword } from "../../api/services/usersService";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const fetchForgotPassword = async () => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const statusCode = await forgotPassword(encodedEmail);
      if (statusCode == 200) {
        ToastAndroid.show("Doğrulama kodu mail adresinize gönderildi", ToastAndroid.SHORT);
        navigation.navigate("ApproveCode", { email });
        setEmail("");
      } else {
        ToastAndroid.show("Lütfen geçerli bir E-mail adresi giriniz",ToastAndroid.SHORT);
      }
      return;
    } catch (error) {
      //console.error("Hata:", error);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    }
  };

  const handleNext = () => {
    if (email == "") {
      ToastAndroid.show( "Lütfen E-mail alanını boş bırakmayınız.",ToastAndroid.SHORT);
      return;
    }
    fetchForgotPassword();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/forgot_password.png")}
          style={styles.logo}
        ></Image>
      </View>

      <Text style={styles.title}>ŞİFRENİZİ Mİ UNUTTUNUZ</Text>

      <Text style={styles.content}>
        E-mail adresinizi girdikten sonra mailinize gelen onay kodunu kontrol
        edin
      </Text>

      <InputAuth
        label={"E-mail"}
        value={email}
        maxLength={30}
        keyboardType={"email-address"}
        secureTextEntry={false}
        onchangeText={(email) => setEmail(email)}
      />

      <ButtonAuth
        title={"Sonraki"}
        onPress={handleNext}
        color={"#FF7F3E"}
        marginTop={10}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: "#000",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 50,
  },
  logo: {
    width: "40%",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
    width: "100%",
    height: "30%",
  },
});

export default ForgotPasswordScreen;
