import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";

const ModalComponent = ({
  data,
  visible,
  setVisible,
  onClose,
  title,
  buyTitle,
  buy,
  navigation,
}) => {
  const [money, setMoney] = useState("0,00 TL");
  const [currency, setCurrency] = useState(`0,00 ${data.code}`);

  const handleFocusMoney = () => {
    if (money === "0,00 TL") {
      setMoney(",00 TL");
    }
  };

  const handleFocusCurrency = () => {
    if (currency === `0,00 ${data.code}`) {
      setCurrency(`,00 ${data.code}`);
    }
  };

  const handleChangeMoney = (text) => {
    if (text === "") {
      setMoney("0,00 TL");
    } else {
      // Virgülün solundaki 0'ı silme işlemi
      let newValue = text.replace(/^0+(?!$)/, "");
      setMoney(newValue === "" ? "0" : newValue);
    }
  };

  const handleChangeCurrency = (text) => {
    if (text === "") {
      setCurrency(`0,00 ${data.code}`);
    } else {
      // Virgülün solundaki 0'ı silme işlemi
      let newValue = text.replace(/^0+(?!$)/, "");
      setCurrency(newValue === "" ? "0" : newValue);
    }
  };

  const handleClose = () => {
    onClose();
    setMoney("0,00 TL");
    setCurrency(`0,00 ${data.code}`);
  };

  const modalContinueButton = () => {
    if (buyTitle === "Banka Alış") {
      modalSellProcess();
    } else {
      modalBuyProcess();
    }
  };

  const modalSellProcess = () => {
    setVisible(false);
    navigation.navigate("Wallet");

    Alert.alert(
      "",
      `Satış işlemi ${data.buying} fiyatı üzerinden gerçekleştirildi.`,
      [
        {
          text: "Tamam",
          onPress: () => console.log("Tamam pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const modalBuyProcess = () => {
    setVisible(false);
    navigation.navigate("Wallet");

    Alert.alert(
      "",
      `Alış işlemi ${data.selling} fiyatı üzerinden gerçekleştirildi.`,
      [
        {
          text: "Tamam",
          onPress: () => console.log("Tamam pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
        
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
                <Text style={{ fontSize: 16, marginTop: 3 }}>{buyTitle}</Text>
                <Text style={{ fontSize: 16 }}>{buy}₺</Text>
              </View>
            </View>

            <View>
              <View style={styles.inputBody}>
                <Text style={styles.inputText}>Tutar</Text>
                <TextInput
                  style={styles.input}
                  onFocus={handleFocusMoney}
                  onChangeText={handleChangeMoney}
                  value={money}
                  textAlign="right"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputBody}>
                <Text style={styles.inputText}>Tutar</Text>
                <TextInput
                  style={styles.input}
                  onFocus={handleFocusCurrency}
                  onChangeText={handleChangeCurrency}
                  value={currency}
                  textAlign="right"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.buttonBody}>
                <TouchableOpacity onPress={handleClose} style={styles.button}>
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
