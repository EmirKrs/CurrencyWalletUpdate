import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const DateModal = ({ onRequestClose, modalVisible, setModalVisible, setCardDate }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleModalConfirm = () => {
    setCardDate(`${selectedMonth}/${selectedYear}`);
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={onRequestClose}
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
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonTitle}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleModalConfirm}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonTitle}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#9BB8CD",
    width: "35%",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});
export default DateModal;
