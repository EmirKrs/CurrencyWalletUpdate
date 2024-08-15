import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appSettings from '../../../../settings';

const VoteForm = ({data}) => {
    const [votedData, setVotedData] = useState('');
    const [voteRate, setVoteRate] = useState();

    const postVote = async(voteType) => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/vote/use`;
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            increaseDecreaseType: voteType,
            currencyId: `${data.id}`,
        }),
      });

      const voteInfo = await response.json();

      if (!response.ok) {
        if (voteInfo.Messages) {
            ToastAndroid.show(`${voteInfo.Messages}`, ToastAndroid.SHORT);
          }
      }
      else{
        if(voteType == 2){
            setVoteRate(`%${votedData.decreasesRate} Azalan`);
        }
        else{
            setVoteRate(`%${votedData.increasesRate} Artan`);
        }
        ToastAndroid.show(`${data.code} için ${voteType == 1 ? "Artan" : "Azalan"} oyu verildi`, ToastAndroid.SHORT);
       
      }
      
    } catch (error) {
      console.error('Post Vote Error:', error);
    }
    
    };

    const fetchVote = async() => {
    const apiUrl = `${appSettings.CurrencyExchangeWalletApiUrl}/vote/${data.id}`;
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      });

      const voteData = await response.json();
      setVotedData(voteData);
      setVoteRate(`%${voteData.increasesRate} Artan`);

      if (!response.ok) {
        throw new Error('Vote Fetch Error');
      }
      
    } catch (error) {
      console.error('Vote Fetch Error:', error);
    } 
    };

    useEffect(() => {
        fetchVote();
    }, []); 
    


  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
        <Text style={styles.voteCount}>Oy Oranı</Text>
        <Text style={styles.voteCount}>{voteRate}</Text>
        </View>


      <View style={styles.voteContainer}>
        <TouchableOpacity style={styles.buttonIncrease} onPress={() => postVote(1)}>
          <Text style={styles.buttonText}>Artar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDecrease} onPress={() => postVote(2)}>
          <Text style={styles.buttonText}>Azalır</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F3F8F8',
      },
      textContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      },
      voteContainer: {
        flexDirection: 'row',
        marginRight: 10,
      },
      buttonDecrease: {
        backgroundColor: '#D37676',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      },
      buttonIncrease: {
        backgroundColor: '#A5DD9B',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      voteCount: {
        fontSize: 16,
      },
});

export default VoteForm;