import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native'
import React from 'react'

const ButtonPayment = ({ title, color, onPress }) => {
  return (
   <>
    <TouchableOpacity
    onPress={onPress}
    style={[styles.button, {backgroundColor: color}]}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
   </>

  )
};
const styles = StyleSheet.create({
button:{
padding: 10,
marginTop: 10,
marginHorizontal: 20,
borderRadius: 15,
width: '30%',
alignItems: 'center',
justifyContent: 'center',
},
buttonTitle:{
  fontSize: 18,
  fontWeight: '500',
  color: '#FFFFFF',
}
      
});
export default ButtonPayment;