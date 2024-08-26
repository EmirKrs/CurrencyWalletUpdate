import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ToastAndroid,} from "react-native";
import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { resetPassword } from "../../api/services/usersService";
//Components
import InputAuth from "../../components/inputs/inputAuth";
import ButtonAuth from "../../components/buttons/buttonAuth";


const ResetPasswordScreen = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCon, setNewPasswordCon] = useState("");

  const { email, recoveryCode } = route.params;

  const handleChangePassword = () => {
    if (newPassword == "" || newPasswordCon == "") {
      ToastAndroid.show("Lütfen boş alanları doldurunuz", ToastAndroid.SHORT);
      return;
    }
    fetchNewPassword();
  };

  const fetchNewPassword = async () => {
    try {
      const body = {
        mailAddress: email,
        recoveryCode: recoveryCode,
        password: newPassword,
        rePassword: newPasswordCon,
      };
      const response = await resetPassword(body);

      if (response == 200) {
        ToastAndroid.show("Şifre başarıyla değiştirildi", ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
        return;
      }
    } catch (error) {
      //console.error('Hata: ', error);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/new_password_logo.png")}
          style={styles.logo}
        ></Image>
      </View>

      <Text style={styles.title}>YENİ ŞİFRE OLUŞTURUNUZ</Text>

      <Text style={styles.content}>
        Oluşturduğunuz yeni şifreyi aşağıdaki alana girebilirsiniz
      </Text>

      <InputAuth
        label={"Yeni Şifre"}
        value={newPassword}
        keyboardType={"default"}
        secureTextEntry={true}
        onchangeText={(newPassword) => setNewPassword(newPassword)}
      />

      <InputAuth
        label={"Yeni Şifre Tekrar"}
        value={newPasswordCon}
        keyboardType={"default"}
        secureTextEntry={true}
        onchangeText={(newPasswordCon) => setNewPasswordCon(newPasswordCon)}
      />

      <ButtonAuth
        title={"Sonraki"}
        onPress={handleChangePassword}
        color={"#FF7F3E"}
        marginTop={10}
      />
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
    marginHorizontal: 30,
  },
  logo: {
    width: "40%",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    marginVertical: 10,
  },
});

export default ResetPasswordScreen;
