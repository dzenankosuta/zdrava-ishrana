import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./LinkButtonStyles";
import { useTheme } from "@react-navigation/native";

const LinkButton = ({ store, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      underlayColor={"transparent"}
      style={[styles.link, { backgroundColor: colors.primary }]}
      onPress={onPress}
    >
      <Text style={[styles.linkText, { color: colors.link }]}>{store}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
