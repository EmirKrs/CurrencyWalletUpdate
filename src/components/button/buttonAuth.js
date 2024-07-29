import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonAuth = ({title, onPress, color, marginTop}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={[styles.button, {backgroundColor: color}, {marginTop: marginTop}]} 
      onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      },
      button: {
        width: "90%",
        height: 50,
        justifyContent: "center",
        borderRadius: 5,
      },
      buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
      },
});

export default ButtonAuth;