import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = ({userData}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{userData.username}'ın Hesap Bilgileri</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#F3F8F8",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "#686868",
  },
});

export default Header;
