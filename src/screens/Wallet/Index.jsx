import { View, StyleSheet, ToastAndroid, FlatList, Text,} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { wallet, walletIsExist } from "../../api/services/walletService";
import useLoadingOverlay from "../../hooks/useLoadingOverlay";
//Components
import WalletCard from "./components/WalletCard";
import ButtonCard from "./components/ButtonCard";
import Item from "./components/Item";



const Index = ({ navigation }) => {
  const [walletData, setWalletData] = useState("");
  const [loading, setLoading] = useState(true);
  useLoadingOverlay(loading);

  const handleAddMoney = () => {
    navigation.navigate("Payment", {showComponent: false, buttonType: "wallet",});
  };

  const handleWithdrawMoney = () => {
    ToastAndroid.show("Bu özellik geliştirme aşamasında", ToastAndroid.SHORT);
  };

  const fetchWalletExist = async () => {
    try {
      setLoading(true);
      const response = await walletIsExist();
      return response.isSuccess;
    } catch (error) {
      console.error("Wallet Exist Error:", error);
      return false;
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await wallet();
      setWalletData(response);
    } catch (error) {
      console.error("Wallet Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const checkWalletExistence = async () => {
        try {
          const walletExist = await fetchWalletExist();
          if (walletExist) {
            await fetchWallet();
          } else {
            navigation.navigate('Payment', { showComponent: true });
          }
        } catch (error) {
          console.error('Check Wallet Error:', error);
        }
      };
      checkWalletExistence();
    }, [])
  );

  return (
    <View style={styles.container}>
      <WalletCard data={walletData} />
      <View style={styles.buttonContainer}>
        <ButtonCard
          title={"Yükle"}
          icon={"arrow-up"}
          backgroundColor={"#A5DD9B"}
          onPress={handleAddMoney}
        />
        <ButtonCard
          title={"Gönder"}
          icon={"arrow-down"}
          backgroundColor={"#D37676"}
          onPress={handleWithdrawMoney}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Varlıklarım</Text>
      </View>

      <FlatList
        data={walletData.details}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />
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
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
    color: "#7E7E7E",
  },
  textContainer: {
    marginLeft: 15,
    marginVertical: 10,
    justifyContent: "center",
  },
});

export default Index;
