import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import appSettings from "../../../settings";
import Header from "./Components/Header";
import Button from "./Components/buttonProfile";
import InputProfile from "./Components/inputProfile";

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    emailAddress: "",
    phoneNumber: "",
    username: "",
  });

  const fetchUserData = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/users/info`;
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();
      setUserInfo(user);
      setLoading(false);

      if (!response.ok) {
        throw new Error("User Fetch Error");
      }
    } catch (error) {
      console.error("User Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchLogout = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/auth/logout`;
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await AsyncStorage.removeItem("token");

      if (!response.ok) {
        throw new Error("Logout Fetch Error");
      }
    } catch (error) {
      console.error("Logout Fetch Error:", error);
    }
  };

  const handleDeleteAccount = () => {
    // api POST işlemi 
    // Hesap silinmeden önce Alert çıksın
    // tamam denildiğinde hesap silinsin
  };

  const handleLogout = () => {
    fetchLogout();
    ToastAndroid.show("Çıkış Yapıldı", ToastAndroid.SHORT);
    navigation.replace("Login");
  };

  const handleUpdate = () => {
    // api POST işlemi yapılacak.
    // body kısmına userInfo gelecek.
    // + validasyonlar
    ToastAndroid.show("Profil bilgileri güncellendi", ToastAndroid.SHORT);
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <View style={{ width: "80%", marginVertical: 20 }}>
          <InputProfile
            title={"Ad"}
            value={userInfo.name}
            maxLength={20}
            keyboardType={"default"}
            onChangeText={(value) => handleInputChange("name", value)}
          />

          <InputProfile
            title={"Soyad"}
            value={userInfo.surname}
            maxLength={20}
            keyboardType={"default"}
            onChangeText={(value) => handleInputChange("surname", value)}
          />

          <InputProfile
            title={"Email"}
            value={userInfo.emailAddress}
            maxLength={20}
            keyboardType={"email-address"}
            onChangeText={(value) => handleInputChange("emailAddress", value)}
          />

          <InputProfile
            title={"Phone"}
            value={userInfo.phoneNumber}
            maxLength={11}
            keyboardType={"numeric"}
            onChangeText={(value) => handleInputChange("phoneNumber", value)}
          />

          <InputProfile
            title={"Username"}
            value={userInfo.username}
            maxLength={20}
            keyboardType={"default"}
            onChangeText={(value) => handleInputChange("username", value)}
          />
        </View>

        <TouchableOpacity 
        style={styles.updateButton} 
        onPress={handleUpdate}>
          <Text style={styles.updateText}>Güncelle</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.buttonContainer}>
        <Button title={"Çıkış"} onPress={handleLogout} />
        <Button title={"Hesap Sil"} onPress={handleDeleteAccount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    height: "12%",
    marginHorizontal: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    elevation: 12,
  },
  bodyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    elevation: 4,
  },
  updateText: {
    color: "#9BB8CD",
    fontSize: 16,
  },
});

export default ProfileScreen;
