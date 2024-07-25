import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appSettings from "../../../../settings";

const ModalComponent = ({
  data,
  visible,
  setModalVisible,
  modalBuyTitle,
  title,
  buy,
  isSale,
  navigation
}) => {
  const [unit, setUnit] = useState("");
  const [currency, setCurrency] = useState('');

  const closeModal = () => {
    setModalVisible(false);
    setUnit('');
    setCurrency('');
  };

  const handleAmountChange = (text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    if(isSale){
      const numericValue = parseFloat(filteredText) || 0;
      setUnit(filteredText);
      setCurrency((numericValue * data.buying).toFixed(2));
    } else {
      const numericValue = parseFloat(filteredText) || 0;
      setUnit(filteredText);
      setCurrency((numericValue * data.selling).toFixed(2));
    }

  };

  const fetchBuyCurrency = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/wallet/buy-currency`;
    const token = await AsyncStorage.getItem('token');

    try{
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          currencyId: `${data.id}`,
          unit: unit,
        }),
      });

      const res = await response.json();
      console.log(res);

      if(!response.ok){
        if (res.Messages?.[0]) {
          ToastAndroid.show(`${res.Messages[0]}`,ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`Beklenmedik bir hata alındı.`, ToastAndroid.SHORT);
        }
        return;
      }
      if (!res.isSuccess) {
        ToastAndroid.show(`${res.Messages[0]}`,ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(`${res.messages[0]}`, ToastAndroid.SHORT);
  
        navigation.navigate("Wallet");
      }

    }catch(error){
      console.error('Buy Currency Error:', error);
    }
  };

  const fetchSellCurrency = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/wallet/sell-currency`;
    const token = await AsyncStorage.getItem('token');

    try{
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          currencyId: `${data.id}`,
          unit: unit,
        }),
      });

      const res = await response.json();


      if(!response.ok){
        if (res.Messages?.[0]) {
          ToastAndroid.show(`${res.Messages[0]}`,ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`Beklenmedik bir hata alındı.`, ToastAndroid.SHORT);
        }
        return;
      }
      if (!res.isSuccess) {
        ToastAndroid.show(`${res.Messages[0]}`,ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(`${res.messages[0]}`, ToastAndroid.SHORT);
        console.log(res);
        navigation.navigate("Wallet");
      }
      

    }catch(error){
      console.error('Sell Currency Error:', error);
    }
  };

  const modalContinueButton = () => {
    if(unit == '' || unit == 0){
      ToastAndroid.show('Adet alanı boş olamaz',ToastAndroid.SHORT);
      return;
    }
    if (modalBuyTitle === "Banka Alış") {
      fetchSellCurrency();
      setModalVisible(false);
    } else {
      fetchBuyCurrency();
      setModalVisible(false);
    }
    setUnit('');
    setCurrency('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
        
      <KeyboardAvoidingView style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>{title}</Text>
            </View>

            <View style={styles.headerView}>
              <View style={styles.headerLeft}>
                <Image
                  style={styles.flags}
                  source={{ uri: data.logoUrl }}
                ></Image>
                <Text style={styles.textCode}>{data.code}</Text>
              </View>

              <View style={styles.headerRight}>
                <Text style={{ fontSize: 16, marginTop: 3 }}>{modalBuyTitle}</Text>
                <Text style={{ fontSize: 16 }}>{buy}₺</Text>
              </View>
            </View>

            <View>
              <View style={styles.inputBody}>
                <Text style={styles.inputText}>Adet</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Adet"
                  maxLength={5}
                  onChangeText={handleAmountChange}
                  value={unit}
                  textAlign="right"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputBody}>
                <Text style={styles.inputText}>Tutar</Text>
                <TextInput
                  style={styles.input}
                  value={`${currency}₺`}
                  textAlign="right"
                  keyboardType="numeric"
                  editable={false}
                />
              </View>

              <View style={styles.buttonBody}>
                <TouchableOpacity onPress={closeModal} style={styles.button}>
                  <Text style={styles.buttonText}>Kapat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={modalContinueButton}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Devam</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    top: "15%",
    backgroundColor: "#F3F8F8",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerView: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerLeft: {
    flexDirection: "row",
  },
  headerRight: {
    alignItems: "flex-end",
    paddingTop: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonBody: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 15,
  },
  inputBody: {
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#686868",
    borderRadius: 14,
    color: "#000000",
  },
  inputText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#686868",
  },
  button: {
    width: "48%",
    borderRadius: 18,
    backgroundColor: "#408BF3",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    padding: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  textCode: {
    fontWeight: "500",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 10,
  },
  flags: {
    width: "35%",
    resizeMode: "cover",
    aspectRatio: 1,
  },
});

export default ModalComponent;
