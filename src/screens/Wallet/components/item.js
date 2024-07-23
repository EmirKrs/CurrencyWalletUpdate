import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const Item = () => {
  return (
    <View style={styles.card}>
    <Text style={styles.title}>AAAA</Text>
    <Text style={styles.content}>BBBB</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        margin: 8,
        shadowColor: "#686868",
        shadowOpacity: 0.1,
        elevation: 2,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
      },
      content: {
        fontSize: 14,
        color: "#000000",
      },
});

export default Item;