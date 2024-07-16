import { View, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const InputForm = ({emailText, passwordText, setEmailText, setPasswordText}) => {
 

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={emailText}
        style={styles.input}
        mode="outlined"
        outlineColor="#FF7F3E"
        activeOutlineColor="#2A629A"
        onChangeText={(emailText) => setEmailText(emailText)}
      />
      <TextInput
        label="Password"
        value={passwordText}
        style={styles.input}
        mode="outlined"
        outlineColor="#FF7F3E"
        secureTextEntry={true}
        activeOutlineColor="#2A629A"
        onChangeText={(passwordText) => setPasswordText(passwordText)}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    marginTop: 20,
  },
});

export default InputForm;
