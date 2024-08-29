import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, ScrollView,} from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
//Components
import Header from "./Components/Header";
import InputProfile from "./Components/inputProfile";
import ButtonProfile from "./Components/buttonProfile";
import { userData, userUpdate } from "../../api/services/usersService";
import { logout } from "../../api/services/authService";
import useLoadingOverlay from "../../hooks/useLoadingOverlay";

const Index = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    emailAddress: "",
    phoneNumber: "",
    username: "",
  });
  useLoadingOverlay(loading);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await userData();
      const { name, surname, emailAddress, phoneNumber, username } = response;
      const filteredUserData = {
        name,
        surname,
        emailAddress,
        phoneNumber,
        username,
      };
      setUserInfo(filteredUserData);
    } catch (error) {
      console.error("User Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogout = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem("token");
      ToastAndroid.show("Çıkış Yapıldı", ToastAndroid.SHORT);
      navigation.replace("Login");

    } catch (error) {
      console.error("Logout Fetch Error:", error);
      ToastAndroid.show('Çıkış yaparken bir hata oluştu', ToastAndroid.SHORT);
    }
  };

  const fetchUpdateUser = async () => {
    try {
      const body = {
        name: userInfo.name,
        surname: userInfo.surname,
        emailAddress: userInfo.emailAddress,
        phoneNumber: userInfo.phoneNumber,
        username: userInfo.username,
      };

      const response = await userUpdate(body);
      console.log(response);
      if (response.isSuccess) {
        ToastAndroid.show(`${response.messages?.[0]}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("User Update Fetch Error:", error);
    }
  };

  const handleDeleteAccount = async() => {
    // api POST işlemi
    // Hesap silinmeden önce Alert çıksın
    // tamam denildiğinde hesap silinsin
    ToastAndroid.show("Bu özellik Geliştirme Aşamasında", ToastAndroid.SHORT);
  };

  const handleLogout = async() => {
    await fetchLogout();
  };

  const handleUpdateProfile = async() => {
    if (
      !userInfo.name.trim() ||
      !userInfo.surname.trim() ||
      !userInfo.emailAddress.trim() ||
      !userInfo.phoneNumber.trim() ||
      !userInfo.username.trim()
    ) {
      ToastAndroid.show("Profil bölümünde boş alan bırakılamaz",ToastAndroid.SHORT);
      return;
    } else if (!hasChanged) {
      ToastAndroid.show("Herhangi bir değişiklik yapılmadı",ToastAndroid.SHORT);
    } else {
      await fetchUpdateUser();
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
    flex: 1,
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

export default Index;
