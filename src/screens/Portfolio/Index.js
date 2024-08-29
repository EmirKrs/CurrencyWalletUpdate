import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { portfolios } from "../../api/services/portfolioService";

//Components
import Item from "./Components/item";
import Header from "./Components/header";
import Message from "./Components/Message";
import useLoadingOverlay from "../../hooks/useLoadingOverlay";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState("");
  useLoadingOverlay(loading);
  
  useFocusEffect(
    useCallback(() => {
      fetchPortfolios();
    }, [])
  );

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await portfolios();
      setPortfolioData(response);
    } catch (error) {
      console.error("Fetch Portfolio: ", error);
    } finally {
    setLoading(false);
    }
  };

  if (portfolioData && portfolioData.length <= 0) {
    return <Message />;
  }

  return (
    <View style={styles.flatListContainer}>
      <Header />
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
