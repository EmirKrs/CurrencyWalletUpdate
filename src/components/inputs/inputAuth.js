import { View, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';

const InputAuth = ({label, value, maxLength, marginTop=20, keyboardType, secureTextEntry, onchangeText}) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        maxLength={maxLength}
        style={[styles.input, {marginTop}]}
        mode="outlined"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        outlineColor="#FF7F3E"
        activeOutlineColor="#2A629A"
        theme={{colors: {background: '#FFFFFF'}}}
        onChangeText={onchangeText}
      />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      input: {
        width: "90%",
      },
});

export default InputAuth;