import { View, StyleSheet, KeyboardAvoidingView, Image, ToastAndroid, Platform, Text, ScrollView,} from "react-native";
import React, { useState } from "react";
import { approveCode } from "../../api/services/usersService";
//Components
import InputAuth from "../../components/inputs/InputAuth";
import ButtonAuth from "../../components/buttons/ButtonAuth";

const ApproveCodeScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [codeText, setCodeText] = useState("");

  const handleNext = () => {
    if (approveCode == "") {
      ToastAndroid.show("Lütfen Alanı boş bırakmayınız", ToastAndroid.SHORT);
      return;
    }
    fetchApproveCode();
  };

  const fetchApproveCode = async () => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedApproveCode = encodeURIComponent(codeText);

      const response = await approveCode(encodedApproveCode, encodedEmail);

      if (response.isApproved) {
        ToastAndroid.show("Kod onaylandı", ToastAndroid.SHORT);
        navigation.navigate("ResetPassword", {email, recoveryCode: response.recoveryCode});
        setCodeText("");
      } else {
        ToastAndroid.show(`Lütfen geçerli kodu girin`, ToastAndroid.SHORT);
      }
      return;
    } catch (error) {
      console.error("Hata:", error);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/approve_code_logo.png")}
            style={styles.logo}
          ></Image>
        </View>

        <Text style={styles.title}>ŞİFRENİZİ Mİ UNUTTUNUZ</Text>

        <Text style={styles.content}>E-mail adresinize gelen 6 haneli onay kodunu girin</Text>

        <InputAuth
          label={"Onay Kodu"}
          value={codeText}
          maxLength={6}
          keyboardType={"numeric"}
          secureTextEntry={false}
          onchangeText={(codeText) => setCodeText(codeText)}
        />

        <ButtonAuth
          title={"Sonraki"}
          onPress={handleNext}
          color={"#FF7F3E"}
          marginTop={10}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: "40%",
    resizeMode: "contain",
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
});

export default ApproveCodeScreen;
