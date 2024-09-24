import { Text, TouchableOpacity } from "react-native";
import React from "react";

const TextButton = ({ title, onPress, color = "#686868", marginTop = 5, fontSize = 16 }) => {
  return (
    <TouchableOpacity style={{ marginTop: marginTop }} onPress={onPress}>
      <Text style={{ color: color, fontSize: fontSize }}>{title}</Text>
    </TouchableOpacity>
  );
};
export default TextButton;
