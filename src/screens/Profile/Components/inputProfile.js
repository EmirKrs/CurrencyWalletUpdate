import { Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const InputProfile = ({title, value, maxLength, keyboardType, onChangeText}) => {
  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </>
  )
};

const styles = StyleSheet.create({
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
        fontSize: 16,
        marginLeft: 5,
        color: "#686868",
        textAlign: "left",
        alignSelf: "flex-start",
      },
});

export default InputProfile;