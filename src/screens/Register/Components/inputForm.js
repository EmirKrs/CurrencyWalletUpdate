import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const InputForm = ({
  nameText,
  surnameText,
  phoneText,
  usernameText,
  emailText,
  passwordText,
  passwordConText,
  setNameText,
  setSurnameText,
  setPhoneText,
  setUsernameText,
  setEmailText,
  setPasswordText,
  setPasswordConText,
}) => {
  return (
  
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={nameText}
        style={styles.input}
        mode="outlined"
        outlineColor="#FF7F3E"
        activeOutlineColor="#2A629A"
        onChangeText={(nameText) => setNameText(nameText)}
      />
      <TextInput
        label="Surname"
        value={surnameText}
        style={styles.input}
        mode="outlined"
        outlineColor="#FF7F3E"
        activeOutlineColor="#2A629A"
        onChangeText={(surnameText) => setSurnameText(surnameText)}
      />
      <TextInput
        label="Phone"
        value={phoneText}
        style={styles.input}
        mode="outlined"
        keyboardType='phone-pad'
        outlineColor="#FF7F3E"
        maxLength={11}
        activeOutlineColor="#2A629A"
        onChangeText={(phoneText) => setPhoneText(phoneText)}
      />
      <TextInput
        label="Username"
        value={usernameText}
        style={styles.input}
        mode="outlined"
        outlineColor="#FF7F3E"
        activeOutlineColor="#2A629A"
        onChangeText={(usernameText) => setUsernameText(usernameText)}
      />
      <TextInput
        label="Email"
        value={emailText}
        style={styles.input}
        mode="outlined"
        keyboardType='email-address'
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
      <TextInput
        label="Password Confirm"
        value={passwordConText}
        style={styles.input}
        mode="outlined"
        outlineColor="#FF7F3E"
        secureTextEntry={true}
        activeOutlineColor="#2A629A"
        onChangeText={(passwordConText) => setPasswordConText(passwordConText)}
      />
    </View>

  );
};
const styles = StyleSheet.create({

  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    marginTop: 20,
  },
});

export default InputForm;
