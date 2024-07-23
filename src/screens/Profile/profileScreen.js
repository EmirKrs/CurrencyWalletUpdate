import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import Body from "./Components/Body";
import appSettings from "../../../settings";
import Header from "./Components/Header";
import Button from "./Components/buttonProfile";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

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
      setUserData(user);
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

  const handleDeleteAccount = () => {};

  const handleLogout = () => {
    fetchLogout();
    ToastAndroid.show("Çıkış Yapıldı", ToastAndroid.SHORT);
    navigation.replace("Login");
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

      <Body userData={userData} />

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
    justifyContent: "center",
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
});

export default ProfileScreen;
