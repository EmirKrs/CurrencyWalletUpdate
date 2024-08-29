import { View, StyleSheet, Modal } from "react-native";
import React from "react";
import { ActivityIndicator} from "react-native-paper";
import { useSelector } from "react-redux";

const LoadingOverlay = () => {

  const visible = useSelector((state) => state.loading.isVisible);
  
  return (
    <Modal
      animationType="none"
      visible={visible}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingOverlay;
