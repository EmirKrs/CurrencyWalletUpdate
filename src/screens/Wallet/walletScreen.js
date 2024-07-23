import { View, StyleSheet, ToastAndroid, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import appSettings from "../../../settings";
import WalletCard from "./components/WalletCard";
import ButtonCard from "./components/buttonCard";
import Item from "./components/item";
import { useFocusEffect } from "@react-navigation/native";


const WalletScreen = ({navigation}) => {
  const [walletData, setWalletData] = useState('');
  const [isWalletExist, setIsWalletExist] = useState(false);
  const [loading, setLoading] = useState('');

  const handleUp = () => {
    ToastAndroid.show("Butona basıldı", ToastAndroid.SHORT);
  };

  const handleDown = () => { 
    ToastAndroid.show('Butona Basıldı', ToastAndroid.SHORT)

  };
  /*
  useEffect(()=> {
    fetchWallet();
  }, []); */

/*  const fetchWallet = async() => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/wallet`;
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      });

      const walletData = await response.json();
      setWalletData(walletData);
      console.log(walletData);
      setLoading(false);

      if (!response.ok) {
        throw new Error('Wallet Fetch Failed');
      }
      
    } catch (error) {
      console.error('Wallet Fetch Error:', error);
    } 
  };
*/

  const fetchWalletExist = async() => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/wallet/is-exist`
    const token = await AsyncStorage.getItem('token');

    try{
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, 
        },
      });

      const isExist = await response.json();
      setIsWalletExist(isExist.isSuccess);
      console.log(isExist.isSuccess);
      setLoading(false);

      if(!response.ok){
        throw new Error('Waller Exist Failed');
      }

    }catch(error){
      console.error('Wallet Exist Error:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWalletExist(); 
      
      if (!isWalletExist) {
        navigation.navigate('Payment');
      }
    }, [])
  );

  /*
  useEffect(() => {
    fetchWalletExist();

      const responseFromAPI = false; // Örnek: API'den true döndüğünü varsayalım
      setIsWalletExist(false);

      
      if (!responseFromAPI) {
        
      }
  }, []); */



  const data = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
    { id: '4', title: 'First Item' },
    { id: '5', title: 'Second Item' },
  ];

  if(loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <WalletCard />

      <View style={styles.buttonContainer}>
        <ButtonCard
          title={"Yükle"}
          icon={"arrow-up"}
          backgroundColor={"#A5DD9B"}
          onPress={handleUp}
        />
        <ButtonCard
          title={"Çek"}
          icon={"arrow-down"}
          backgroundColor={"#D37676"}
          onPress={handleDown}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style= {styles.text}>Hesap Geçmişi</Text>
      </View>
      
      <FlatList
      data={data}
      renderItem={() => <Item />}
      keyExtractor={item => item.id}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF'
  },
  text:{
    fontSize: 16,
    marginBottom: 5,
    color: '#7E7E7E',
  },
  textContainer: {
    margin: 10,
    justifyContent: 'center',
  }
});

export default WalletScreen;
