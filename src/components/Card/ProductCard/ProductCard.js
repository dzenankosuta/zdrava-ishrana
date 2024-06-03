import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./ProductCardStyles";
import { useTheme } from "@react-navigation/native";

const ProductCard = ({
  imageUrl,
  title,
  favoriteIcon,
  onPress,
  onFavoritePress,
}) => {
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
        <TouchableOpacity
          activeOpacity={0.8}
          underlayColor={"transparent"}
          style={[
            styles.productFavoriteBtn,
            { backgroundColor: colors.background2 },
          ]}
          onPress={onFavoritePress}
        >
          <Text>{favoriteIcon}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
