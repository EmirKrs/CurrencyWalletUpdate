import { StyleSheet, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//Components
import ButtonForm from "./Components/buttonForm";
import InputForm from "./Components/inputForm";

const LoginScreen = ({ navigation }) => {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [error, setError] = useState('');

  

  const handleLogin = () => {
    
    if (!emailText.trim()) {
      setError('Email alanı boş olamaz.');
      return;
    }

    if (!passwordText.trim()) {
      setError('Şifre alanı boş olamaz.');
      return;
    }
    
    navigation.navigate('Tabs');
    setError('');
  };



  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
      <Image 
      source={require('../../../assets/logo1.png')}
      style= {styles.logo}>
      </Image>
      </View>

      <InputForm 
      emailText={emailText}
      passwordText={passwordText}
      setEmailText={setEmailText}
      setPasswordText={setPasswordText}/>
      
      <Text style={styles.error}>{error}</Text>

      <ButtonForm 
      navigation={navigation}
      handleLogin={handleLogin} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF'
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '35%',
    marginBottom: 30,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
export default LoginScreen;
