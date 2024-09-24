import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ButtonForm = ({openModal}) => {

    
  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity 
    onPress={() => openModal(false)} 
    style={styles.button}>
      <Text style={styles.buttonText}>Al</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => openModal(true)} 
    style={styles.button}>
      <Text style={styles.buttonText}>Sat</Text>
    </TouchableOpacity>
  </View>
  )
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: 20,
      },
      button: {
        width: "40%",
        height: 40,
        padding: 8,
        borderRadius: 15,
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