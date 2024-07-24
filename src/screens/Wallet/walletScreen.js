import { View, StyleSheet, ToastAndroid, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
//Components
import appSettings from "../../../settings";
import WalletCard from "./components/WalletCard";
import ButtonCard from "./components/buttonCard";
import Item from "./components/item";


const WalletScreen = ({navigation}) => {
  const [walletData, setWalletData] = useState('');
  const [loading, setLoading] = useState(true);

  const handleUp = () => {
    ToastAndroid.show("Butona basıldı", ToastAndroid.SHORT);
  };

  const handleDown = () => { 
    ToastAndroid.show('Butona Basıldı', ToastAndroid.SHORT)

  };


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

      if(!response.ok){
        throw new Error('Waller Exist Failed');
      }

      const isExist = await response.json();
      return isExist.isSuccess;

    }catch(error){
      console.error('Wallet Exist Error:', error);
      return false;

    } finally{
      setLoading(false);
    }
  };


  const fetchWallet = async() => {
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

      if (!response.ok) {
        throw new Error('Wallet Fetch Failed');
      }
      
    } catch (error) {
      console.error('Wallet Fetch Error:', error);
    } finally{
      setLoading(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const checkWalletExistence = async () => {
        const walletExist = await fetchWalletExist();

        if (walletExist) {
          await fetchWallet();
        } 
        else{
          navigation.navigate('Payment');
        }
      };
      checkWalletExistence();
    }, [])
  ); 
  

  if(loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <WalletCard 
      data={walletData}/>

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
        <Text style= {styles.text}>Varlıklarım</Text>
      </View>
      
      <FlatList
      data={walletData.details}
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
