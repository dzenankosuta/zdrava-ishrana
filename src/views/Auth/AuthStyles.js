import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  secondContainer: {
    marginTop: moderateScale(50, 0.2),
    width: "100%",
    minHeight: moderateScale(400, 0.2),
  },
  switchingButtons: {
    marginLeft: "10%",
    marginVertical: moderateScale(40, 0.2),
    flexDirection: "row",
    width: "80%",
    height: moderateScale(45, 0.2),
    borderRadius: moderateScale(10, 0.2),
    borderWidth: 1,
  },
  switchingButton: {
    width: "50%",
    borderRadius: moderateScale(10, 0.2),
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    resizeMode: "cover",
    width: "100%",
  },
  logoText: {
    fontSize: moderateScale(35, 0.2),
    position: "absolute",
    top: moderateScale(140, 0.2),
    right: moderateScale(20, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default AuthStyles;
