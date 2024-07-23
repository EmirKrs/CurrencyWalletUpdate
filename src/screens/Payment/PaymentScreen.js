import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
//Components
import InputPayment from "./components/inputPayment";
import ButtonPayment from "./components/buttonPayment";

const PaymentScreen = () => {
  const [payment, setPayment] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardSecure, setCardSecure] = useState("");

  const handlePay = () => {

  };

  return (
    <View style={styles.container}>
      <InputPayment
        value={payment}
        title={"Tutar"}
        onChangeText={(payment) => setPayment(payment)}
      />

      <InputPayment
        value={cardNumber}
        title={"Kart Numarası"}
        onChangeText={(cardNumber) => setCardNumber(cardNumber)}
      />

      <InputPayment
        value={cardDate}
        title={"Son Kullanma Tarihi"}
        onChangeText={(cardDate) => setCardDate(cardDate)}
      />

      <InputPayment
        value={cardSecure}
        title={"Güvenlik Numarası"}
        onChangeText={(cardSecure) => setCardSecure(cardSecure)}
      />

      <ButtonPayment
      title={'Öde'}
      onPress={handlePay}/>
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
});

export default PaymentScreen;
