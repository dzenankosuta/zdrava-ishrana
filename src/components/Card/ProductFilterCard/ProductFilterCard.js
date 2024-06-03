import { View, Text } from "react-native";
import React from "react";
import styles from "./ProductFilterCardStyles";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

const ProductFilterCard = ({ icon, filterName, onPress }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        activeOpacity={0.8}
        underlayColor={"transparent"}
        style={[
          styles.button,
          {
            backgroundColor: colors.background2,
          },
        ]}
        onPress={onPress}
      >
        <Text>{icon}</Text>
      </TouchableOpacity>
      <Text style={[styles.filterText, { color: colors.text }]}>
        {filterName}
      </Text>
    </View>
  );
};

export default ProductFilterCard;
