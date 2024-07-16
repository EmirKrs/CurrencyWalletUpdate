import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);


  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {

    textRef.zoomIn(3000);
    imageRef.zoomIn(3000);
  };

  return (
    <View style={styles.container}>

        <Animatable.Image
        ref={(ref) => (imageRef = ref)}
        style={styles.image}
        animation="zoomIn"
        duration={1000}
        source={require("../../assets/logo1.png")}>

        </Animatable.Image>

      <Animatable.Text
        ref={(ref) => (textRef = ref)}
        style={styles.text}
        animation="zoomIn"
        duration={1000}>

        Yükleniyor...
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#2A629A",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode:"contain"
  },

});
export default SplashScreen;
