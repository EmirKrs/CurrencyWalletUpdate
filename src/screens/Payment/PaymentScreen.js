import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import appSettings from "../../../settings";
//Components
import InputPayment from "./components/inputPayment";
import ButtonPayment from "./components/buttonPayment";
import HeaderPayment from "./components/headerPayment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardSecure, setCardSecure] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { showComponent } = route.params || {};

  const handlePay = () => {
    if (amount == '' || cardNumber== '' || cardDate == '' || cardSecure== '') {
      ToastAndroid.show("Lütfen boş alan bırakmayın", ToastAndroid.SHORT);
      return;
    }
    buyBalanceFetch();
  };

  const handleCancel = () => {
    navigation.replace('Tabs', {
      screen: 'Wallet',
    });
  };

  const handleModalConfirm = () => {
    setCardDate(`${selectedMonth}/${selectedYear}`);
    setModalVisible(false);
  };

  /*const cardDateChange = (input) => {
    // Girdiyi sadece rakamlara indirgeme
    let formattedInput = input.replace(/[^0-9]/g, '');

    // AA/YY formatına uygun hale getirme
    if (formattedInput.length > 2) {
      let month = formattedInput.slice(0, 2);
      let year = formattedInput.slice(2);

      // Ay kısmını kontrol et
      if (parseInt(month, 10) > 12) {
        month = '12';
      }

      // Yıl kısmını kontrol et
      if (year.length > 2) {
        year = year.slice(0, 2);
      }

      if (parseInt(year, 10) > 30) {
        year = '30';
      }

      formattedInput = `${month}/${year}`;
    }

    setCardDate(formattedInput);
  }; */

 /* const cardNumberChange = (input) => {
    let formattedInput = input.replace(/\D/g, "");

    formattedInput = formattedInput.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedInput);
  }; */

  const buyBalanceFetch = async() => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/wallet/buy-balance`
    const token = await AsyncStorage.getItem('token');

    try{
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          amount: amount,
          cardInfo: {
            cardNumber: cardNumber,
            cardHolderName: cardNumber,
            cardSecurityCode: cardSecure,
            cardExpirationYear: 2026,
            cardExpirationMonth: 12
          }
        }),
      });

      const buyBalance = await response.json();

      if(!response.ok){
        if (buyBalance.Messages?.[0]) {
          ToastAndroid.show(`${buyBalance.Messages[0]}`,ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`Beklenmedik bir hata alındı.`, ToastAndroid.SHORT);
        }
        return;
      }
      if (!buyBalance.isSuccess) {
        ToastAndroid.show(`${buyBalance.Messages[0]}`,ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Ödeme işlemi başarılı", ToastAndroid.SHORT);
        console.log(buyBalance);
        navigation.replace('Tabs', {
          screen: 'Wallet',
        });
      }
    }catch(error){
      console.error('Buy Balance Error:', error);
    }
  };

  const handleAmountChange = (text) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };
  

  return (
    <View style={styles.container}>
      {showComponent && <HeaderPayment />}

      <View style={styles.inputContainer}>
        <InputPayment
          title={"Tutar"}
          value={amount}
          maxLength={9}
          placeHolder={'Tutar'}
          onChangeText={handleAmountChange}
        />

        <InputPayment
          title={"Kart Numarası"}
          value={cardNumber}
          maxLength={16}
          placeHolder={"XXXX XXXX XXXX XXXX"}
          onChangeText={(cardNumber) => setCardNumber(cardNumber)}
        />

        <TouchableOpacity 
        activeOpacity={1}
        onPress={() => setModalVisible(true)}
        >
          <InputPayment
            title={"Son Kullanma Tarihi"}
            value={cardDate}
            maxLength={5}
            editable={false}
            placeHolder={"AA/YY"}
            onChangeText={(cardDate) => setCardDate(cardDate)}
          />
        </TouchableOpacity>

        <InputPayment
          title={"Güvenlik Numarası"}
          value={cardSecure}
          maxLength={3}
          placeHolder={"123"}
          onChangeText={(cardSecure) => setCardSecure(cardSecure)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ButtonPayment
          title={"İptal"}
          color={"#D37676"}
          onPress={handleCancel}
        />

        <ButtonPayment title={"Öde"} color={"#A5DD9B"} onPress={handlePay} />
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ay ve Yıl Seçin</Text>

            <RNPickerSelect
              onValueChange={(value) => setSelectedMonth(value)}
              items={[
                { label: "01", value: "01" },
                { label: "02", value: "02" },
                { label: "03", value: "03" },
                { label: "04", value: "04" },
                { label: "05", value: "05" },
                { label: "06", value: "06" },
                { label: "07", value: "07" },
                { label: "08", value: "08" },
                { label: "09", value: "09" },
                { label: "10", value: "10" },
                { label: "11", value: "11" },
                { label: "12", value: "12" },
              ]}
              placeholder={{ label: "Ay Seçin", value: "" }}
              value={selectedMonth}
            />

            <RNPickerSelect
              onValueChange={(value) => setSelectedYear(value)}
              items={[
                { label: "24", value: "24" },
                { label: "25", value: "25" },
                { label: "26", value: "26" },
                { label: "27", value: "27" },
                { label: "28", value: "28" },
                { label: "29", value: "29" },
                { label: "30", value: "30" },
              ]}
              placeholder={{ label: "Yıl Seçin", value: "" }}
              value={selectedYear}
            />
            <View style={styles.modalButtonContainer}>
            <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}>
                <Text style={styles.modalButtonTitle}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleModalConfirm}
                style={styles.modalButton}>
                <Text style={styles.modalButtonTitle}>Tamam</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },

  //Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: "30%",
    alignItems: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
  },
  modalButton: {
    marginHorizontal: 10,
    backgroundColor: '#ECF8FF',
    width: '35%',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default PaymentScreen;
