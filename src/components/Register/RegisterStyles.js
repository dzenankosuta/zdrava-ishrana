import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const RegisterStyles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  safeArea: {
    width: "100%",
    alignItems: "center",
  },
  message: {
    width: "80%",
    textAlign: "center",
    fontSize: moderateScale(14, 0.2),
    fontFamily: "PopinsItalic",
    marginBottom: moderateScale(10, 0.2),
  },
  textInput: {
    width: "80%",
    borderBottomWidth: 0.7,
    paddingVertical: moderateScale(5, 0.2),
    fontFamily: "PopinsRegular",
  },
  errors: {
    width: "80%",
    textAlign: "center",
    fontSize: moderateScale(12, 0.2),
    fontFamily: "PopinsItalic",
  },
  buttonWrapper: {
    width: "80%",
    marginVertical: moderateScale(50, 0.2),
  },
  success: {
    width: "80%",
    textAlign: "center",
    fontSize: moderateScale(16, 0.2),
    fontFamily: "PopinsBoldItalic",
    marginVertical: moderateScale(50, 0.2),
  },
});

export default RegisterStyles;
