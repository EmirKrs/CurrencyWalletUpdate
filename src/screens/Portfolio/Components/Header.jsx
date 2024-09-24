import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rightContainer}>
        <Text style={styles.text}>Alış</Text>
        <Text style={styles.text}>Satış</Text>
        <Text style={styles.text}>Fark</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginVertical: 10,
  },
  rightContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "65%",
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
});

export default Header;
