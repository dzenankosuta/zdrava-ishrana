import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./ActionProductCardStyles";
import { useTheme } from "@react-navigation/native";

const ActionProductCard = ({ imageUrl, title, favoriteIcon, onPress }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        activeOpacity={0.8}
        underlayColor={"transparent"}
        style={[styles.btn]}
        onPress={onPress}
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          style={[styles.img]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={[styles.productInfo]}>
        <Text style={[styles.productTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default ActionProductCard;
