import { View, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, ToastAndroid,} from "react-native";
import React, { useEffect, useState } from "react";
//Components
import ModalComponent from "./Components/modal";
import DetailItem from "./Components/detailItem";
import Header from "./Components/Header";
import ButtonForm from "./Components/ButtonForm";
import Chart from "./Components/Chart";
import ListTitle from "./Components/ListTitle";
import VoteForm from "./Components/VoteForm";
import { currencyChart, currencyDaily,} from "../../api/services/currenciesService";
import { formatNumber } from "../../utils/numberUtils";

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

  useEffect(() => {
    fetchCurrencyData();
    fetchChartData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await currencyDaily(data.id);
      setCurrencyData(response);
    } catch (error) {
      console.error("Currency Fetch Error:", error);
      ToastAndroid.show('Liste verileri yüklenirken bir hata oluştu.',ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
   
  const fetchChartData = async () => {
    try {
      const response = await currencyChart(data.code);
      setChartData(response);
    } catch (error) {
      console.error("Chart Fetch Error:", error);
      ToastAndroid.show('Chart verileri yüklenirken bir hata oluştu.',ToastAndroid.SHORT);
    }
  };


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
