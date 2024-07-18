import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Item = ({ item }) => {

  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  return (
    <View style= {styles.container}>
      <View style= {styles.itemContainer}>
        <View style={styles.currencyInfo}>
        <Text style={styles.textCode}>{item.currencyCode}</Text>
        <Text style={styles.textName}>{item.currencyName}</Text>
        </View>
        <View style={styles.currencyData}>
        <Text style={styles.text}>{formatNumber(item.buying)}₺</Text>
        <Text style={styles.text}>{formatNumber(item.selling)}₺</Text>
        <Text style={styles.text}>%{item.rate}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#F3F8F8',
    },
    currencyInfo:{
      width: '30%',
      
    },
    currencyData:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '65%',
    },
    textCode:{
      fontSize: 18,
      color: '#000000',
    },
    textName:{
      fontSize: 14,
      color: '#686868',
    },
    text:{
      fontSize: 14,
      color: '#686868',
      marginLeft: 10,
    }
});

export default Item;