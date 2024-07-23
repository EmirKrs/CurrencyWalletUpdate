import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Body = ({ userData }) => {
  return (
    <View style={styles.container}>
      
      <View style={{justifyContent: 'space-around', height: '90%'}}>
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
          <Text style={styles.updateText}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    elevation: 4,
  },
  row: {
    height: '15%',
    padding: 10,
    paddingLeft: 10,
   
  },
  label: {
    color: "#9D9D9D",
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: "#000000",
    fontSize: 18,
  },
  updateBtnContainer:{
     height: '10%',
     justifyContent: 'center', 
     alignItems: 'center'
  },
  updateText: {
    color: "#9BB8CD",
    fontSize: 16,
  },
});

export default Body;
