import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Item = ({ item, navigation }) => {
  const [favoriteColor, setFavoriteColor] = useState("black");
  const [favoriteIconType, setFavoriteIconType] = useState("star-outline");

  const maxLenght = 16;

  const shortenName = (name) => {
    if (name.length > maxLenght) {
      return name.substring(0, maxLenght - 3) + "..."; // Son üç karakteri '...' olarak değiştir
    }
    return name;
  };

  const formatNumber = (number) => {
    return number.toFixed(4);
  };

  const handleFavorite = () => {
    const newColor = favoriteColor === "black" ? "#FF7F3E" : "black";
    const newIconType =
      favoriteIconType === "star-outline" ? "star" : "star-outline";
    setFavoriteIconType(newIconType);
    setFavoriteColor(newColor);
  };
  //formatNumber(item.buying)
  //formatNumber(item.selling)

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", item)}
        style={styles.button}
      >
        <View style={styles.headerTopContainer}>
          <View style={styles.itemTopContainer}>
            <View style={styles.flagContainer}>
              <Image
                style={styles.flags}
                // default url'i appsettings.json dosyasından import et.
                source={{
                  uri: item.logoUrl ?? "https://flagsapi.com/BE/flat/64.png",
                }}>
                </Image>
            </View>

            <View style={styles.topTextContainer}>
              <Text style={styles.textCode}>{item.code}</Text>
              <Text style={styles.textName}>{shortenName(item.name)}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleFavorite}>
              <Ionicons
                name={favoriteIconType}
                size={22}
                color={favoriteColor}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.itemDownContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Alış</Text>
            <Text style={styles.textNum}>{formatNumber(item.buying)}₺</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Satış</Text>
            <Text style={styles.textNum}>{formatNumber(item.selling)}₺</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#F3F8F8",
  },
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTopContainer: {
    marginBottom: 2,
    flexDirection: "row",
  },
  topTextContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 2,
  },
  itemDownContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 14,
    color: "#4B4B4B",
    marginBottom: 6,
  },
  textNum: {
    fontSize: 14,
    color: "#000000",
  },
  textName: {
    fontSize: 12,
    color: "#686868",
  },
  textCode: {
    fontSize: 18,
    color: "#000000",
  },
  button: {
    width: "100%",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#D2D2D2",
  },
  flagContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
  flags: {
    width: 20,
    height: 30,
    resizeMode: "cover",
    aspectRatio: 1.5,
  },
});

export default Item;
