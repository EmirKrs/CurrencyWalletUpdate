import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Message = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/sad.png")}
        style={styles.image}/>
      <View style={styles.textContainer}>
        <Text style={styles.message}>Portfolyonuzda döviz bulunmamaktadır</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  image: {
    marginTop: 80,
    height: "20%",
    resizeMode: "contain",
  },
  textContainer: {
    marginTop: 30,
    width: "90%",
  },
});

export default Message;
