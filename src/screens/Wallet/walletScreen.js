import { View, StyleSheet, ToastAndroid, FlatList, Text } from "react-native";
import React from "react";
//Components
import WalletCard from "./components/WalletCard";
import ButtonCard from "./components/buttonCard";
import Item from "./components/item";

const WalletScreen = () => {

  const handleUp = () => {
    ToastAndroid.show("Butona basıldı", ToastAndroid.SHORT);
  };

  const handleDown = () => { 
    ToastAndroid.show('Butona Basıldı', ToastAndroid.SHORT)

  };
  const data = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
    { id: '4', title: 'First Item' },
    { id: '5', title: 'Second Item' },
  ];
  

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
