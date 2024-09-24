import { View, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { buyBalance } from "../../api/services/walletService";
//Components
import InputPayment from "./components/InputPayment";
import ButtonPayment from "./components/ButtonPayment";
import HeaderPayment from "./components/HeaderPayment";
import DateModal from "./components/DateModal";

const Index = ({ navigation, route }) => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardSecure, setCardSecure] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { showComponent, buttonType } = route.params || {};

  const handlePay = () => {
    if (
      amount == "" ||
      cardNumber == "" ||
      cardDate == "/" ||
      cardDate == "" ||
      cardSecure == ""
    ) {
      ToastAndroid.show("Lütfen boş alan bırakmayın", ToastAndroid.SHORT);
      return;
    }
    buyBalanceFetch();
  };

  const handleCancel = () => {
    if (buttonType == "wallet") {
      navigation.replace("Tabs", {
        screen: "Wallet",
      });
    } else {
      navigation.replace("Tabs", {
        screen: "Portfolio",
      });
    }
  };

  const handleAmountChange = (text) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const buyBalanceFetch = async () => {
    try {
      const body = {
        amount: amount,
        cardInfo: {
          cardNumber: cardNumber,
          cardHolderName: cardNumber,
          cardSecurityCode: cardSecure,
          cardExpirationYear: 2026,
          cardExpirationMonth: 12,
        },
      };

      const response = await buyBalance(body);
      if (response.isSuccess) {
        ToastAndroid.show(`${response.messages[0]}`, ToastAndroid.LONG);
        navigation.replace("Tabs", {
          screen: "Wallet",
        });
        return;
      }
    } catch (error) {
      if (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        return;
      }
      console.error("Buy Balance Error:", error);
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
          placeHolder={"Tutar"}
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
        <ButtonPayment title={"İptal"} color={"#D37676"} onPress={handleCancel}/>
        <ButtonPayment title={"Öde"} color={"#A5DD9B"} onPress={handlePay} />
      </View>

      <DateModal
        onRequestClose={() => setModalVisible(false)}
        setCardDate={setCardDate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
});

export default Index;