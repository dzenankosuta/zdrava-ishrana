import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./RecommendationCardStyles";
import { useTheme } from "@react-navigation/native";

const RecommendationCard = ({ imageUrl, title, text, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      underlayColor={"transparent"}
      style={[
        styles.card,
        {
          backgroundColor: colors.primary,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.storyContainer]}>
        <Text
          style={[styles.title, { color: colors.background2 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={[styles.text, { color: colors.background2 }]}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </View>
      <View style={[styles.imgContainer]}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={[styles.img]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RecommendationCard;
