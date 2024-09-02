import { View, Text, StyleSheet } from "react-native";
import React from "react";

const HeaderPayment = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Cüzdan Hesabınız Bulunmamaktadır</Text>
      <Text style={styles.content}>Cüzdan hesabı oluşturmak için kart bilgilerinizi girip ödeme yapabilirsiniz</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    width: "90%",
    height: "25%",
    shadowColor: "#000",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: "#000000",
  },
});

export default HeaderPayment;
