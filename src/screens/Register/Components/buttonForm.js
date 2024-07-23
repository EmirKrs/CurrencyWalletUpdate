import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonForm = ({navigation , handleRegister}) => {


  return (
    <View style={styles.container}>

    <TouchableOpacity
      style={styles.buttonRegister}
      onPress={handleRegister}>
      <Text style={styles.buttonText}>Kayıt Ol</Text>
    </TouchableOpacity>
    
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      buttonRegister: {
        width: "90%",
        height: 50,
        backgroundColor: "#FF7F3E",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 10,
      },
      buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
      },
});

export default ButtonForm;