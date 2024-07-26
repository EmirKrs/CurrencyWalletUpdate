import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const WalletCard = ({data}) => {

  const formatNumber = (num) => {
    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
      <Ionicons 
      name="server" 
      size={24} 
      color="#686868"
      style={{marginRight: 5}} />
      <Text style={styles.title}>Balance</Text>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between'}}>
    <Text style={styles.text}>Varlık</Text>
    <Text style={styles.balance}>{formatNumber(data.walletBalance)} ₺</Text>

    </View>
      
    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%',  justifyContent: 'space-between'}}>
    <Text style={styles.text}>Bakiye</Text>
    <Text style={styles.wallet}>{formatNumber(data.availableBalance)} ₺</Text>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    margin: 8,
    marginBottom: 20,
    height: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: '#000',

  },
  wallet:{
    fontSize: 20,
    color: "#686868",
 
  },
  text:{
    fontSize: 18,
    color: "#686868",
  },
  title: {
    fontSize: 22,
    color: "#686868",
  },
});

export default WalletCard;
