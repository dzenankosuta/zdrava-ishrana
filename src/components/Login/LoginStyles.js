import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const LoginStyles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  safeArea: {
    flex: 1,
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
    marginTop: moderateScale(50, 0.2),
  },
  forgotPassword: {
    marginTop: moderateScale(4, 0.2),
    marginRight: "10%",
    alignSelf: "flex-end",
  },
  or: {
    marginVertical: moderateScale(20, 0.2),
  },
  web: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: moderateScale(10, 0.2),
  },
  page: {
    height: moderateScale(50, 0.2),
  },
  img: {
    width: moderateScale(50, 0.2),
    height: moderateScale(50, 0.2),
    marginHorizontal: moderateScale(30, 0.2),
  },
});

export default LoginStyles;
