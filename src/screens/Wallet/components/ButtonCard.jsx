import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const ButtonCard = ({ title, icon, backgroundColor, onPress }) => {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Card style={styles.littleCard}>
        <Card.Title
          title={title}
          titleStyle={styles.littleCardTitle}
          left={() => (
            <Avatar.Icon
              size={45}
              color={"#FFFFFF"}
              icon={icon}
              style={{ backgroundColor: backgroundColor, borderRadius: 10 }}
            />
          )}
        />
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  littleCard: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonContainer: {
    width: "42%",
    marginVertical: 10,
  },
  littleCardTitle: {
    fontSize: 18,
    paddingTop: 4,
    color: "#7E7E7E",
    fontWeight: "bold",
  },
});

export default ButtonCard;
