import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import styles from "./StoryStyles";
import { useTheme } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const Story = ({ route }) => {
  const { state } = route.params;
  const { colors } = useTheme();

  if (state.storyURL) {
    return (
      <WebView
        source={{
          uri: state.storyURL,
        }}
      />
    );
  }
  return (
    <>
      <ScrollView style={[styles.container]}>
        <Text style={[styles.title, { color: colors.text }]}>
          {state.storyTitle}
        </Text>
        <Image
          source={{
            uri: state.storyImage,
          }}
          style={[styles.img]}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {state.storyText}
        </Text>
      </ScrollView>
    </>
  );
};

export default Story;
