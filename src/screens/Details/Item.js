import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import appSettings from "../../../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item, navigation }) => {
  const [favoriteColor, setFavoriteColor] = useState("black");
  const [favoriteIconType, setFavoriteIconType] = useState("star-outline");


  useEffect(() => {
    if(item.hasPortfolio){
      setFavoriteColor('#FF7F3E');
      setFavoriteIconType('star');
    }
  }, []);
  
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

  const favoritePostFetch = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/portfolios/${item.id}`;
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data.messages);
      
      ToastAndroid.show(`${item.code} para birimi portföye eklendi`, ToastAndroid.SHORT);
  
      if (!response.ok) {
        throw new Error('Favorite POST Failed');
      }
      
    } catch (error) {
      console.error('Favorite POST Error:', error);
    }

  };

  const favoriteDeleteFetch = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/portfolios/${item.id}`;
    const token = await AsyncStorage.getItem('token');
    
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      ToastAndroid.show(`${item.code} para birimi portföyden kaldırıldı`, ToastAndroid.SHORT);
  
      if (!response.ok) {
        throw new Error('Favorite DELETE Failed');
      }
      
    } catch (error) {
      console.error('Favorite DELETE Error:', error);
    }

  };
  
  const handleFavorite = () => {
   
    if(favoriteColor == 'black'){
      setFavoriteColor('#FF7F3E');
      setFavoriteIconType('star');
      favoritePostFetch();

    }else{
      setFavoriteColor('black');
      setFavoriteIconType('star-outline');
      favoriteDeleteFetch();
    }
    /*const newColor = favoriteColor === "black" ? "#FF7F3E" : "black";
    const newIconType = favoriteIconType === "star-outline" ? "star" : "star-outline";
    setFavoriteIconType(newIconType);
    setFavoriteColor(newColor); */
  };

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
                source={{
                  uri: item.logoUrl ?? `${appSettings.DefaultCurrencyLogoUrl}`,
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
