import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, ToastAndroid,} from "react-native";
import { allCurrencies } from "../../api/services/currenciesService";
import Item from "./components/Item";

const Index = ({ navigation }) => {
  const [currenciesData, setCurrenciesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    setLoading(true);
    fetchCurrenciesData();
  }, []);

  const fetchCurrenciesData = async () => {
    try {
      const response = await allCurrencies();
        setCurrenciesData(response);
    } catch (error) {
      console.error("All Currencies Fetch Error:", error);
      ToastAndroid.show('Veriler yüklenirken bir hata oluştu.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
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
      <View style={styles.textContainer}>
        <Text style={styles.text}>Son Güncelleme : {formattedTime}</Text>
      </View>
      <FlatList
        data={currenciesData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 14,
    color: "#686868",
  },
});

export default Index;
