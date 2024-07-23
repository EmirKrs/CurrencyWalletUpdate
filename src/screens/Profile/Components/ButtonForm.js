import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react';
import appSettings from '../../../../settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ButtonForm = ({navigation}) => {

  const handleLogout = () => {
    fetchLogout();
    ToastAndroid.show('Çıkış Yapıldı', ToastAndroid.SHORT);
    navigation.replace('Login');
  }

  const fetchLogout = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/auth/logout`;
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      });
      await AsyncStorage.removeItem('token');

      if (!response.ok) {
        throw new Error('Logout Fetch Error');
      }
      
    } catch (error) {
      console.error('Logout Fetch Error:', error);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}
      onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}>
        <Text style={styles.buttonText}>Hesap Sil</Text>
      </TouchableOpacity>
    </View>

    
  )
};

const styles = StyleSheet.create({
    container: {
        height: '15%',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#F3F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button:{
        backgroundColor: '#B06161',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '35%',
        marginHorizontal: 15,
    },
    buttonText:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ButtonForm