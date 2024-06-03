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
    width: "100%",
    marginLeft: "20%",
    marginTop: moderateScale(20, 0.2),
    marginBottom: moderateScale(40, 0.2),
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
  success: {
    width: "80%",
    textAlign: "center",
    fontSize: moderateScale(16, 0.2),
    fontFamily: "PopinsBoldItalic",
    marginVertical: moderateScale(50, 0.2),
  },
  checkWrapper: {
    width: "92%",
    height: moderateScale(20, 0.2),
    marginTop: moderateScale(10, 0.2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  solveWrapper: {
    paddingLeft: moderateScale(10, 0.2),
    width: "80%",
    height: moderateScale(35, 0.2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkTabs: {
    height: moderateScale(45, 0.2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 0.2,
  },
});

export default RegisterStyles;
