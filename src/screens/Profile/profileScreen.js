import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
//Components
import Body from './Components/Body';
import appSettings from '../../../settings';
import ButtonForm from './Components/ButtonForm';
import Header from './Components/Header';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/users/info`;
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();
      setUserData(user);
      setLoading(false);

      if (!response.ok) {
        throw new Error('User Fetch Error');
      }
      
    } catch (error) {
      console.error('User Fetch Error:', error);
    }
  };


  useEffect(()=> {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Header
      userData={userData}/>

      <Body
      userData={userData}/>

      <ButtonForm 
      navigation={navigation}/>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF'
  },


});

export default ProfileScreen;