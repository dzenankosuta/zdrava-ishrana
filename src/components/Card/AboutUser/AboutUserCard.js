import { View, Text, Image } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './AboutUserCardStyles';
import { useTheme } from '@react-navigation/native';

const AboutUserCard = ({ firstName, lastName, imageURL }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card]}>
      {imageURL ? (
        <Image
          style={[styles.userImage, { borderColor: colors.primary }]}
          source={{ uri: imageURL }}
        />
      ) : (
        <FontAwesome size={30} name="user-circle" color={colors.primary} />
      )}
      <Text style={[styles.userText, { color: colors.placeholder }]}>
        {firstName} {lastName[0]}.
      </Text>
    </View>
  );
};

export default AboutUserCard;
