import { View, Text, StyleSheet } from "react-native";
import React from "react";

const WalletCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>AAAA</Text>
      <Text style={styles.content}>BBBB</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    margin: 8,
    marginBottom: 20,
    height: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#000000",
  },
});

export default WalletCard;
