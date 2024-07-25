import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const Item = ({item}) => {

  
  return (
    <View style={styles.card}>

      <View style={styles.titleContainer}>
      <Text style={styles.title}>{item.currencyCode}</Text>
      <Text style={styles.currencyName}>{item.currencyName}</Text>
      </View>

      <View style={{flexDirection: 'column', width: '70%',}}>
      <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Adet</Text>
    <Text style={styles.contentTitle}>Sembol</Text>
    <Text style={styles.contentTitle}>Fiyat</Text>
    <Text style={styles.contentTitle}>Toplam</Text>
      </View>

      <View style={styles.contentContainer}>
      <Text style={styles.content}>{item.unit}</Text>
    <Text style={styles.content}>{item.currencySymbol}</Text>
    <Text style={styles.content}>{item.unitPrice}₺</Text>
    <Text style={styles.content}>{item.totalAmount}₺</Text>
      </View>
      </View>

  </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderRadius: 20,
        padding: 16,
        margin: 8,
        shadowColor: "#686868",
        shadowOpacity: 0.1,
        elevation: 4,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
      },
      currencyName: {
        fontSize: 14,
        color: "#686868",
      },
      contentContainer:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      content: {
        fontSize: 14,
        color: "#000000",
        marginLeft: 20,
      },
      contentTitle:{
        fontSize: 12,
        color: "#000000",
      },
      titleContainer: {
        width: '30%',
        flexDirection: 'column',
      }
});

export default Item;