import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { formatNumber } from '../../../utils/numberUtils';

const DetailItem = ({item}) => {

  const getOnlyDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('tr-TR')
  };

  return (
    <View style= {styles.container}>
      <View style= {styles.itemContainer}>
      <Text style={{fontSize: 14}}>{getOnlyDate(item.date)}</Text>
      <Text style={{fontSize: 14, marginRight: 10}}>{formatNumber(item.buying)}₺</Text>
      <Text style={{fontSize: 14, marginRight: 10}}>{formatNumber(item.selling)}₺</Text>
      </View>
      <View style={styles.seperator}></View>
      </View>
   
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: "#D2D2D2",
  }
});
export default DetailItem;