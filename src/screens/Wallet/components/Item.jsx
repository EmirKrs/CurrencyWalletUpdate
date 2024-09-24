import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { formatNumber } from "../../../utils/numberUtils";

const Item = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.currencyCode}>{item.currencyCode} ({item.currencySymbol})</Text>
        <Text style={styles.currencyName}>{item.currencyName}</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Adet</Text>
          <Text style={styles.contentTitle}>Fiyat</Text>
          <Text style={styles.contentTitle}>Toplam</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{item.unit}</Text>
          <Text style={styles.content}>{formatNumber(item.unitPrice)}₺</Text>
          <Text style={styles.content}>{formatNumber(item.totalAmount)}₺</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
    padding: 16,
    margin: 8,
    shadowColor: "#686868",
    shadowOpacity: 0.1,
    elevation: 4,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tableContainer: {
    justifyContent: "center",
    flexDirection: "column",
    width: "70%",
  },
  titleContainer: {
    flexDirection: "column",
    width: "33%",
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  currencyName: {
    fontSize: 14,
    color: "#686868",
  },
  contentTitle: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",
    width: "25%",
  },
  content: {
    fontSize: 14,
    color: "#686868",
    textAlign: "center",
    width: "25%",
  },
});

export default Item;
