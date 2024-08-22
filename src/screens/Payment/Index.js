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
import { buyBalance } from "../../api/services/walletService";

const Index = ({ navigation, route }) => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardSecure, setCardSecure] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  
  const { showComponent, buttonType } = route.params || {};

  const handlePay = () => {
    if (amount == '' || cardNumber== '' || cardDate == '/' || cardDate == '' || cardSecure== '') {
      ToastAndroid.show("Lütfen boş alan bırakmayın", ToastAndroid.SHORT);
      return;
    }
    buyBalanceFetch();
  };

  const handleCancel = () => {
    if(buttonType== 'wallet'){
      navigation.replace('Tabs', {
        screen: 'Wallet',
      });
    }else{
      navigation.replace('Tabs', {
        screen: 'Portfolio',
      });
    }
  };

  const handleModalConfirm = () => {
    setCardDate(`${selectedMonth}/${selectedYear}`);
    setModalVisible(false);
  };

  const handleAmountChange = (text) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const buyBalanceFetch = async() => {
    try{
      const body = {
        amount: amount,
          cardInfo: {
            cardNumber: cardNumber,
            cardHolderName: cardNumber,
            cardSecurityCode: cardSecure,
            cardExpirationYear: 2026,
            cardExpirationMonth: 12
          }
      };
      
      const response = await buyBalance(body);
      if (response.isSuccess) {
        ToastAndroid.show(`${response.messages[0]}`, ToastAndroid.LONG);
        navigation.replace('Tabs', {
          screen: 'Wallet',
        });
        return;
      }
    }
    catch(error) {
      if (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        return;
      } 
      console.error('Buy Balance Error:', error);
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
    marginTop: 5,
  },
  modalButton: {
    marginHorizontal: 10,
    backgroundColor: '#9BB8CD',
    width: '35%',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Index;
