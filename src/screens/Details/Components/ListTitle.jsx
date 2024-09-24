import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ListTitle = () => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tarih</Text>
        <Text style={styles.titleText}>Alış</Text>
        <Text style={styles.titleText}>Satış</Text>
      </View>

      <View style={styles.titleSeparator} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  titleSeparator: {
    width: "100%",
    height: 2,
    backgroundColor: "#000000",
  },
});

export default ListTitle;
