import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ForgotButton = ({title, color, onPress,}) => {
  return (
    <TouchableOpacity
    style={styles.button}
    onPress={onPress}>
    <Text style={[styles.text, {color: color}]}>{title}</Text>
  </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    button:{
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        color: '#686868',
    }
});

export default ForgotButton;