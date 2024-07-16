import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalComponent from "./modal";
import {LineChart} from "react-native-chart-kit";
import appSettings from "../../../settings";
import DetailItem from "./detailItem";

const DetailScreen = ({ route, navigation, }) => {
  const data = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBuyTitle, setModalBuyTitle] = useState('');
  const [modalBuy, setModalBuy] = useState('');
  const [loading, setLoading] = useState(true);
  const [currencyData, setCurrencyData] = useState('');
  const [chartData, setChartData] = useState('');

 
  

  const formatNumber = (number) => {
   
    return number.toFixed(2);;
  };


  const openModal = (buttonType) => {

    if (buttonType === 'Al') {
      setModalTitle('Alış İşlemi Kur Bilgileri');
      setModalBuyTitle('Banka Satış');
      setModalBuy(formatNumber(data.selling));
    } 
    else if (buttonType === 'Sat') {
      setModalTitle('Satış İşlemi Kur Bilgileri');
      setModalBuyTitle('Banka Alış');
      setModalBuy(formatNumber(data.buying));
    }

    setModalVisible(true);

  }; 

  useEffect(() => {
    fetchData();
    fetchChartData();
  }, []);

  const fetchData = async () => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/currencies/${data.id}?day=15`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appSettings.Token}`,
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

  //const closeModal = () => setModalVisible(false); 

  const fetchChartData = async () => {
    const url = `${appSettings.CurrencyExchangeWalletApiUrl}/charts/daily-currency-data?currencyCode=${data.code}&buySellType=1&day=10`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appSettings.Token}`
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


  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
        <View style= {styles.headerLeft}>
          <Image 
          style={styles.flags}
          source={{uri: data.logoUrl}}/>

          <Text style={styles.headerCodeText}>{data.code}</Text> 
        </View>
        <Text style={styles.headerNameText}>{data.name}</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={{justifyContent: 'center'}}>
          <Text style={styles.headerRightText}>Banka Alış</Text>
          <Text style={styles.headerRightText}>Banka Satış</Text>
          <Text style={styles.headerRightText}>Günlük Fark</Text>
 
          </View>
          <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>{formatNumber(data.buying)}₺</Text>
          <Text style={{fontSize: 16}}>{formatNumber(data.selling)}₺</Text>
          <Text style={{fontSize: 16}}>%{formatNumber(data.rate)}</Text>
          </View>
        </View>
      </View>

      {!!chartData && (
          <View style= {styles.chartsContainer}>
          <LineChart
        data={chartData}
        width={Dimensions.get("window").width} 
        height={240}
        verticalLabelRotation={-30}
        yAxisLabel="₺"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#F3F8F8",
          backgroundGradientFrom: "#F3F8F8",
          backgroundGradientTo: "#F3F8F8",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#F3F8F8"
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
          </View>
    )}

  


      <View style= {{justifyContent: 'space-around', flexDirection: 'row', marginVertical: 5, marginTop: 5, marginLeft: 10,}}>
        <Text style = {{fontSize: 16, fontWeight: '500'}}>Tarih</Text>
        <Text style = {{fontSize: 16, fontWeight: '500'}}>Alış</Text>
        <Text style = {{fontSize: 16, fontWeight: '500'}}>Satış</Text>
      </View>
      <View style={{   width: '100%', height: 2, backgroundColor: "#000000",}}></View>
     
      <View style={styles.flatListContainer}>

      <FlatList
        data={currencyData.currencySingleDetails}
        keyExtractor={(item, index) => `my-item-${index}`}
        renderItem={({ item }) => <DetailItem item={item}/>}
        numColumns={1}
        contentContainerStyle={{paddingBottom: 10}}
      />
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={() => openModal('Al')} 
        style={styles.button}>
          <Text style={styles.buttonText}>Al</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => openModal('Sat')} 
        style={styles.button}>
          <Text style={styles.buttonText}>Sat</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent 
      data={data} 
      visible={modalVisible} 
      setVisible={setModalVisible}
      onClose={() => setModalVisible(false)} 
      title={modalTitle}
      buyTitle={modalBuyTitle}
      buy={modalBuy}
      navigation={navigation}>
      </ModalComponent>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    paddingRight: 20,
    backgroundColor: '#F3F8F8',
  },
  headerLeft: {
    flexDirection: 'row',
    marginLeft: 5,
  },

  headerRight: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  chartsContainer: {
    backgroundColor: '#FFFFFF',
  },
  flatListContainer:{  
    height: '30%',
    justifyContent: 'space-between',
    backgroundColor: '#F3F8F8',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  button: {
    width: "45%",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#2A629A",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  headerCodeText: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 15,
    fontWeight: '500',
  },
  headerNameText: {
    fontSize: 14,
    color: '#686868',
    marginLeft: 6,
    marginTop: 2,
  },
  headerRightText: {
    fontSize: 16,
    marginRight: 15,
    color: '#686868',
  },
  flags: {
    width: '40%',
    resizeMode: "cover",
    aspectRatio: 1.5,
  },
});

export default DetailScreen;
