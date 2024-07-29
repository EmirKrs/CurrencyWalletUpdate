import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const ButtonProfile = ({ title, onPress }) => {
  return (
    <>
      <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#B06161",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "35%",
    marginHorizontal: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ButtonProfile;
