import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appSettings from "../../../settings";
import { useFocusEffect } from "@react-navigation/native";

//Components
import Item from "./Components/item";
import Header from "./Components/header";
import Message from "./Components/Message";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState("");

 useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchPortfolios();
    }, [])
  ); 

  // Fetch işlemi splash screen e atıalcak. Yönlendirme ise Splash screende fetch bittiğinde
  // navigation.navigate('Portfolio', { data: result }); bu şekilde yapılacak
  // bu ekranda ise route props olarak alınacak,  const { data } = route.params;
  const fetchPortfolios = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/portfolios`;
    const token = await AsyncStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPortfolioData(data);

      if (!response.ok) {
        throw new Error("Portfolio Fetch Failed");
      }
    } catch (error) {
      console.error("Portfolio Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }
  if(portfolioData && portfolioData.length <= 0) {
    return(
      <Message/>
    );
  }

  return (
    <View style={styles.flatListContainer}>
     <Header/>
      <FlatList
        data={portfolioData}
        keyExtractor={(item) => item.currencyId}
        renderItem={({ item }) => <Item item={item} />}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  flatListContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default Index;
