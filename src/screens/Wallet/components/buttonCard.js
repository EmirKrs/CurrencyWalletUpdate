import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const ButtonCard = ({ title, icon, backgroundColor, onPress }) => {
  return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <Card style={styles.littleCard}>
          <Card.Title
            title={title}
            titleStyle={styles.littleCardTitle}
            left={() => (
              <View style={styles.iconContainer}>
                <Avatar.Icon
                  size={45}
                  color={"#FFFFFF"}
                  icon={icon}
                  style={{ backgroundColor: backgroundColor, borderRadius: 10 }}
                />
              </View>
            )}
          />
        </Card>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  littleCard: {
    elevation: 4,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonContainer: {
    width: "40%",
    borderRadius: 10,
    marginVertical: 10,
  },
  littleCardTitle: {
    marginLeft: 5,
    paddingTop: 3,
    fontSize: 18,
    color: '#7E7E7E',
    fontWeight: "bold",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default ButtonCard;
