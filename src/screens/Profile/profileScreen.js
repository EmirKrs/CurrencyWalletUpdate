import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
//Components
import appSettings from "../../../settings";
import Header from "./Components/Header";
import InputProfile from "./Components/inputProfile";
import ButtonProfile from "./Components/buttonProfile";

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
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
      const { name, surname, emailAddress, phoneNumber, username } = user;
      const filteredUserData = {name, surname, emailAddress, phoneNumber, username};
      setUserInfo(filteredUserData);
      setLoading(false);

      if (!response.ok) {
        throw new Error("User Fetch Error");
      }
    } catch (error) {
      console.error("User Fetch Error:", error);
    }
  };

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

  const fetchUpdateUser = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/users/update-info`;
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userInfo.name,
          surname: userInfo.surname,
          emailAddress: userInfo.emailAddress,
          phoneNumber: userInfo.phoneNumber,
          username: userInfo.username,
        }),
      });

      const responseUpdate = await response.json();
      console.log(responseUpdate);

      if (!response.ok) {
        if (responseUpdate.Messages?.[0]) {
          ToastAndroid.show(`${responseUpdate.Messages[0]}`,ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`Beklenmedik bir hata alındı.`, ToastAndroid.SHORT);
        }
        return;
      }
      if (!responseUpdate.isSuccess) {
        setError(responseUpdate.Messages?.[0]);
        ToastAndroid.show(`${responseUpdate.Messages?.[0]}`, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(`${responseUpdate.messages?.[0]}`, ToastAndroid.SHORT);
        console.log(responseUpdate);
      }
    } catch (error) {
      console.error("User Update Fetch Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUserData();
    }, [])
  );

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

  const handleUpdateProfile = () => {
    if (!userInfo.name.trim() || !userInfo.surname.trim() || !userInfo.emailAddress.trim() || !userInfo.phoneNumber.trim() || !userInfo.username.trim()) {
      ToastAndroid.show("Profil bölümünde boş alan bırakılamaz",ToastAndroid.SHORT);
      return;
    }
    else if(!hasChanged) {
      ToastAndroid.show('Herhangi bir değişiklik yapılmadı', ToastAndroid.SHORT);
    }
    else{
      fetchUpdateUser();
      setHasChanged(false);
    }

  };

  const handleInputChange = (field, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setHasChanged(true);
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
      <ScrollView contentContainerStyle={styles.inner}>
      <Header />
      <View style={styles.bodyContainer}>
        <View style={{ width: "90%", marginVertical: 20 }}>
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
            maxLength={30}
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
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateText}>Güncelle</Text>
        </TouchableOpacity>
      </View>
      

      <View style={styles.buttonContainer}>
        <ButtonProfile title={"Çıkış"} onPress={handleLogout} />
        <ButtonProfile title={"Hesap Sil"} onPress={handleDeleteAccount} />
      </View>
      </ScrollView>
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
    height: '12%',
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
    flex:1,
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
  inner: {
    
    flexGrow: 1,
  },
});

export default ProfileScreen;
