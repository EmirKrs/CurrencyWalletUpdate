import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const InputPayment = ({title, value, onChangeText}) => {
  return (
    <>
    <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType='numeric'/>
    </>
  )
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginBottom: 20,
        width:'80%',
        backgroundColor: '#FFFFFF',
        shadowColor: "#333",
        elevation: 3,
      },
      label: {
        flex:0,
        fontSize: 16,
        marginLeft: 5,
        color: "#686868",
        textAlign: 'left',
        marginLeft: 50,
        alignSelf: 'flex-start'
      },
});

export default InputPayment;