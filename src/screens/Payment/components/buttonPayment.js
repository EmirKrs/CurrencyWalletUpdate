import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native'
import React from 'react'

const ButtonPayment = ({ title, onPress }) => {
  return (
   <>
    <TouchableOpacity
    onPress={onPress}
    style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
   </>

  )
};
const styles = StyleSheet.create({
button:{
backgroundColor: '#686868',
padding: 10,
marginTop: 10,
borderRadius: 15,
width: '40%',
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