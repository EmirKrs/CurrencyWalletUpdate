import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ chartData }) => {
  return (
    <View style={styles.chartsContainer}>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width}
        height={240}
        verticalLabelRotation={-30}
        yAxisLabel="₺"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#F3F8F8",
          backgroundGradientFrom: "#F3F8F8",
          backgroundGradientTo: "#F3F8F8",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#F3F8F8",
          },
        }}
        bezier
        style={{
          marginVertical: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartsContainer: {
    backgroundColor: "#FFFFFF",
  },
});

export default Chart;
