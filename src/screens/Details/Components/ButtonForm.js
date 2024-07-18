import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ButtonForm = ({openModal}) => {

    
  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity 
    onPress={() => openModal('Al')} 
    style={styles.button}>
      <Text style={styles.buttonText}>Al</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => openModal('Sat')} 
    style={styles.button}>
      <Text style={styles.buttonText}>Sat</Text>
    </TouchableOpacity>
  </View>
  )
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 30,
      },
      button: {
        width: "40%",
        height: 40,
        padding: 8,
        borderRadius: 5,
        backgroundColor: "#9BB8CD",
        justifyContent: 'center'
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
      },
});

export default ButtonForm;