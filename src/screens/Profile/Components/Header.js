import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hesap Bilgileri</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "10%",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    elevation: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "#B06161",
  },
});

export default Header;
