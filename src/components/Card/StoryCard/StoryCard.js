import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./StoryCardStyles";
import { useTheme } from "@react-navigation/native";

const StoryCard = ({
  imageUrl,
  title,
  text,
  onPress,
  projectImage = false,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      underlayColor={"transparent"}
      style={[styles.card]}
      onPress={onPress}
    >
      {!!projectImage ? (
        projectImage
      ) : (
        <Image
          source={{
            uri: imageUrl,
          }}
          style={[styles.img]}
        />
      )}

      <View style={[styles.storyContainer]}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={[styles.text, { color: colors.text }]}
          numberOfLines={6}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoryCard;
