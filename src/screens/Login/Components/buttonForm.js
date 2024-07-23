import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ButtonForm = ({ navigation, handleLogin }) => {


  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.buttonLogin} 
      onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonLogin: {
    width: "90%",
    height: 50,
    backgroundColor: "#2A629A",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonRegister: {
    width: "90%",
    height: 50,
    backgroundColor: "#FF7F3E",
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
export default ButtonForm;
