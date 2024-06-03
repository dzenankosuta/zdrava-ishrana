import { View, ScrollView, Linking, Alert } from "react-native";
import React from "react";
import styles from "./StoriesTabStyles";
import StoryCard from "../../components/Card/StoryCard/StoryCard";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const StoriesTab = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSite = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert(`${t("error_opening_site")} ${url}`);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          // display: gettingStories ? "none" : "flex",
        },
      ]}
    >
      <View style={[styles.cardWrapper]}></View>
    </ScrollView>
  );
};

export default StoriesTab;
