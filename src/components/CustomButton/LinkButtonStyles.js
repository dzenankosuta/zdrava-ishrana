import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const LinkButtonStyles = StyleSheet.create({
  link: {
    margin: moderateScale(5, 0.2),
    padding: moderateScale(3, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
    borderRadius: moderateScale(7, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    fontFamily: "PopinsRegular",
    fontSize: moderateScale(12, 0.2),
  },
});

export default LinkButtonStyles;
