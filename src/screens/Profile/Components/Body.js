import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Body = ({ userData }) => {
  return (
    <View style={styles.container}>
      <View style={{ height: "80%", justifyContent: 'space-around',}}>
        <View style={styles.row}>
          <Text style={styles.label}>Ad</Text>
          <Text style={styles.value}>{userData.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Soyad</Text>
          <Text style={styles.value}>{userData.surname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <Text style={styles.value}>{userData.username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{userData.emailAddress}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <Text style={styles.value}>{userData.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.updateBtnContainer}>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    width: "100%",
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#F3F8F8",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
  },
  label: {
    width: "50%",
    color: "#686868",
    fontSize: 18,
  },
  value: {
    flex: 1,
    color: "#000000",
    fontSize: 18,
  },
  updateBtnContainer:{
     height: "20%", 
     justifyContent: 'center', 
     alignItems: 'center'
  },
  updateText: {
    color: "#9BB8CD",
    fontSize: 16,
  },
});

export default Body;
