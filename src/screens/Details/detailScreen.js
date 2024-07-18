import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
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

const DetailScreen = ({ route, navigation }) => {
  const data = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBuyTitle, setModalBuyTitle] = useState("");
  const [modalBuy, setModalBuy] = useState("");
  const [loading, setLoading] = useState(true);
  const [currencyData, setCurrencyData] = useState("");
  const [chartData, setChartData] = useState("");

  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  const openModal = (buttonType) => {
    if (buttonType === "Al") {
      setModalTitle("Alış İşlemi Kur Bilgileri");
      setModalBuyTitle("Banka Satış");
      setModalBuy(formatNumber(data.selling));
    } else if (buttonType === "Sat") {
      setModalTitle("Satış İşlemi Kur Bilgileri");
      setModalBuyTitle("Banka Alış");
      setModalBuy(formatNumber(data.buying));
    }

    setModalVisible(true);
  };

  const fetchData = async () => {
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
    fetchData();
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

      <VoteForm
      data={data}/>

      {!!chartData && <Chart chartData={chartData} />}
     

      <ListTitle/>
     
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
        setVisible={setModalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        buyTitle={modalBuyTitle}
        buy={modalBuy}
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
    backgroundColor: '#FFFFFF',
  },

  flatListContainer: {
    height: "25%",
    backgroundColor: "#F3F8F8",
  },
});

export default DetailScreen;
