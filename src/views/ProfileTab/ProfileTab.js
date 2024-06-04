import { View, ScrollView, Linking, Alert } from "react-native";
import React from "react";
import styles from "./ProfileTabStyles";
import { useTranslation } from "react-i18next";

const ProfileTab = () => {
  const { t } = useTranslation();

  const handleSite = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert(`${t("error_opening_site")} ${url}`);
    }
  };

  return <ScrollView style={[styles.container, {}]}></ScrollView>;
};

export default ProfileTab;
