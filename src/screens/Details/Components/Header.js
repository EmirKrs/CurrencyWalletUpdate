import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Header = ({ data }) => {
  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  return (
    <View style={styles.headerContainer}>
      <View>
        <View style={styles.LeftContainer}>
          <Image style={styles.flags} source={{ uri: data.logoUrl }} />

          <Text style={styles.headerCodeText}>{data.code}</Text>
        </View>
        <Text style={styles.headerNameText}>{data.name}</Text>
      </View>

      <View style={styles.RightContainer}>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.headerRightText}>Banka Alış</Text>
          <Text style={styles.headerRightText}>Banka Satış</Text>
          <Text style={styles.headerRightText}>Günlük Fark</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 16 }}>{formatNumber(data.buying)}₺</Text>
          <Text style={{ fontSize: 16 }}>{formatNumber(data.selling)}₺</Text>
          <Text style={{ fontSize: 16 }}>%{formatNumber(data.rate)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    padding: 10,
    paddingRight: 20,
    backgroundColor: "#F3F8F8",
  },
  LeftContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },

  RightContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerCodeText: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 15,
    fontWeight: "500",
  },
  headerNameText: {
    fontSize: 14,
    color: "#686868",
    marginLeft: 6,
    marginTop: 2,
  },
  headerRightText: {
    fontSize: 16,
    marginRight: 15,
    color: "#686868",
  },
  flags: {
    width: "40%",
    resizeMode: "cover",
    aspectRatio: 1.5,
  },
});

export default Header;
