import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import Item from "./components/Item";
import appSettings from '../../../settings';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = ({ navigation, }) => {

  const [currenciesData, setCurrenciesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });


  useEffect(() => {
    setLoading(true);
    fetchCurrenciesData();
  }, []);

  /*const fetchCurrenciesData = async () => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/currencies`;
    const token = await AsyncStorage.getItem('token');

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
       
        return response.json();
      })
      .then((data) => {
        setCurrenciesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

      setRefresh(false);
  };  */

  const fetchCurrenciesData = async() => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/currencies`;
    const token = await AsyncStorage.getItem('token');

    try{
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
        setCurrenciesData(data);
        setLoading(false);

      if (!response.ok) {
        throw new Error("Home Fetch Failed");
      }
    }
     catch (error) {
      ToastAndroid.show("Home Fetch İşlemi", ToastAndroid.SHORT);
    }
    setRefresh(false);
  }; 

  const onRefresh = () => {
    setRefresh(true);
    fetchCurrenciesData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  } 

  return (
    <View style={styles.flatListContainer}>
      <View style = {styles.textContainer}>
        <Text style = {styles.text}>Son Güncelleme : {formattedTime}</Text>
      </View>
      <FlatList
        data={currenciesData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Item item={item} navigation={navigation}/>}
        numColumns={2}
        refreshControl={
          <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}/>
        }
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF'
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 14,
    color: '#686868',
  },
});

export default Index;
