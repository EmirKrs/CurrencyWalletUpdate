import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import appSettings from "../../../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import ModalComponent from "./Components/modal";
import DetailItem from "./Components/detailItem";
import Header from "./Components/Header";
import ButtonForm from "./Components/ButtonForm";
import Chart from "./Components/Chart";
import ListTitle from "./Components/ListTitle";
import VoteForm from "./Components/VoteForm";

const Index = ({ route, navigation }) => {
  const data = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBuyTitle, setModalBuyTitle] = useState("");
  const [modalBuy, setModalBuy] = useState("");
  const [loading, setLoading] = useState(true);
  const [currencyData, setCurrencyData] = useState("");
  const [chartData, setChartData] = useState("");
  const [isSale, setIsSale] = useState(true);

  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  const openModal = (buttonType) => {
    if (buttonType == false) {
      setModalTitle("Alış İşlemi Kur Bilgileri");
      setModalBuyTitle("Banka Satış");
      setModalBuy(formatNumber(data.selling));
      setIsSale(false);
    } else if (buttonType == true) {
      setModalTitle("Satış İşlemi Kur Bilgileri");
      setModalBuyTitle("Banka Alış");
      setModalBuy(formatNumber(data.buying));
      setIsSale(true);
    }

    setModalVisible(true);
  };

  /* const fetchCurrencyData = async () => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/currencies/${data.id}?day=15`;
    const token = await AsyncStorage.getItem("token");

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
        setCurrencyData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }; */

  const fetchCurrencyData = async () => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/currencies/${data.id}?day=15`;
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setCurrencyData(data);

      if (!response.ok) {
        throw new Error("Detail Fetch Failed");
      }
    } catch (error) {
      ToastAndroid.show("Detail Fetch İşlemi", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/charts/daily-currency-data?currencyCode=${data.code}&buySellType=1&day=10`;
    const token = await AsyncStorage.getItem("token");

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
      .then((chartData) => {
        setChartData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchCurrencyData();
    fetchChartData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header data={data} />

      <VoteForm data={data} />

      {!!chartData && <Chart chartData={chartData} />}

      <ListTitle />

      <View style={styles.flatListContainer}>
        <FlatList
          data={currencyData.currencySingleDetails}
          keyExtractor={(item, index) => `my-item-${index}`}
          renderItem={({ item }) => <DetailItem item={item} />}
          numColumns={1}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>

      <ButtonForm openModal={openModal} />

      <ModalComponent
        data={data}
        visible={modalVisible}
        setModalVisible={setModalVisible}
        modalBuyTitle={modalBuyTitle}
        title={modalTitle}
        buy={modalBuy}
        isSale={isSale}
        navigation={navigation}
      ></ModalComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  flatListContainer: {
    height: "25%",
    backgroundColor: "#F3F8F8",
  },
});

export default Index;
