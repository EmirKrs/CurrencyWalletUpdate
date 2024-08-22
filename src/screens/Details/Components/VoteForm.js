import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid,} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchVoteService, postVoteService,} from "../../../api/services/voteService";

const VoteForm = ({ data,}) => {
  const [votedData, setVotedData] = useState("");
  const [voteRate, setVoteRate] = useState('%00.00 Artan');

  const postVoteFetch = async (voteType) => {
    try {
      const body = {
        increaseDecreaseType: voteType,
        currencyId: data.id,
      };

      const response = await postVoteService(body);

      if (response.isSuccess) {
        if (voteType == 2) {
          setVoteRate(`%${votedData.decreasesRate} Azalan`);
        } else {
          setVoteRate(`%${votedData.increasesRate} Artan`);
        }
        ToastAndroid.show(`${data.code} için ${voteType == 1 ? "Artan" : "Azalan"} oyu verildi`,ToastAndroid.SHORT);
      } else if (response.Messages) {
        ToastAndroid.show(`${response.Messages}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        return;
      }
      console.error("FetchLogin Error:", error);
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await fetchVoteService(data.id);
      setVotedData(response);
      setVoteRate(`%${response.increasesRate} Artan`);
    } catch (error) {
      if (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        return;
      }
      console.error("Vote Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.voteCount}>Oy Oranı</Text>
        <Text style={styles.voteCount}>{voteRate}</Text>
      </View>

      <View style={styles.voteContainer}>
        <TouchableOpacity
          style={styles.buttonIncrease}
          onPress={() => postVoteFetch(1)}
        >
          <Text style={styles.buttonText}>Artar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDecrease}
          onPress={() => postVoteFetch(2)}
        >
          <Text style={styles.buttonText}>Azalır</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F3F8F8",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    
  },
  voteContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  buttonDecrease: {
    backgroundColor: "#D37676",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonIncrease: {
    backgroundColor: "#A5DD9B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  voteCount: {
    fontSize: 16,
  },
});

export default VoteForm;
