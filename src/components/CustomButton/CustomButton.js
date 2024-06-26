import { useTheme } from "@react-navigation/native";
import React, { useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./CustomButtonStyles";

export const CustomButton = ({
  text,
  onPress,
  type = "primary",
  disabled = false,
}) => {
  const { colors } = useTheme();
  const getButtonStyles = useCallback(() => {
    switch (type) {
      case "primary":
        return { ...styles.button, backgroundColor: colors.primary };
      case "secondary":
        return {
          ...styles.secondaryButton,
          backgroundColor: colors.background2,
        };
      //   case 'danger':
      //     return styles.danger;
      default:
        return { ...styles.button, backgroundColor: colors.primary };
    }
  }, [type, colors]);

  const getButtonTextStyles = useCallback(() => {
    switch (type) {
      case "primary":
        return { ...styles.buttonText, color: colors.link };
      case "secondary":
        return {
          ...styles.secondaryButtonText,
          color: colors.primary,
        };
      //   case 'danger':
      //     return styles.buttonText;
      default:
        return { ...styles.buttonText, color: colors.border };
    }
  }, [type, colors]);

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      activeOpacity={0.8}
      underlayColor={"transparent"}
      onPress={onPress}
      type={styles.button}
      disabled={disabled}
    >
      <Text style={getButtonTextStyles()}>{text}</Text>
    </TouchableOpacity>
  );
};
