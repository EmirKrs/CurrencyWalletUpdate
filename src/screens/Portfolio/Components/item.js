import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { formatNumber } from '../../../utils/numberUtils';

const Item = ({ item,}) => {

  return (
      <View style= {styles.itemContainer}>
        <View style={styles.currencyInfo}>
        <Text style={styles.textCode}>{item.currencyCode}</Text>
        <Text style={styles.textName}>{item.currencyName}</Text>
        </View>
        <View style={styles.currencyData}>
        <Text style={styles.content}>{formatNumber(item.buying)}₺</Text>
        <Text style={styles.content}>{formatNumber(item.selling)}₺</Text>
        <Text style={styles.content}>%{item.rate}</Text>
        </View>
      </View> 
  )
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        elevation: 3,
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
      fontWeight: '500',
      color: '#000000',
    },
    textName:{
      fontSize: 14,
      color: '#686868',
    },
    content:{
      fontSize: 16,
      color: '#686868',
      marginLeft: 10,
    }
});

export default Item;