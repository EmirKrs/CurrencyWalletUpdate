import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const WalletCard = ({data}) => {

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.card}>
      <View style={styles.balanceContainer}>
      <Ionicons 
      name="server" 
      size={24} 
      color="#686868"
      style={{marginRight: 5}} />
      <Text style={styles.balance}>Balance</Text>
    </View>
      
      <Text style={styles.title}>{formatNumber(data.walletBalance)}</Text>
      <Text style={styles.content}>{formatNumber(data.availableBalance)} ₺</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
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
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: '#000'
  },
  content: {
    fontSize: 20,
    color: "#686868",
  },
  balance: {
    fontSize: 22,
    color: "#686868",
  },
  gradient: {
    borderRadius: 50, // İkonunuzun etrafında yuvarlak kenarlar isterseniz bu değeri ayarlayabilirsiniz
    padding: 10,
  },
  icon: {
    backgroundColor: 'transparent', // İkon arka planını şeffaf yaparak gradient'in görünmesini sağlar
  },
});

export default WalletCard;
