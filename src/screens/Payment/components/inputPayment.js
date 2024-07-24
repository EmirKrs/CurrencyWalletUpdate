import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const InputPayment = ({ title, value, maxLength, editable, placeHolder, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        maxLength={maxLength}
        editable={editable}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center", 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#FFFFFF",
    shadowColor: "#333",
    elevation: 3,
  },
  label: {
    flex: 0,
    fontSize: 16,
    marginLeft: 5,
    color: "#686868",
    textAlign: "left",
    alignSelf: "flex-start",
  },
});

export default InputPayment;
