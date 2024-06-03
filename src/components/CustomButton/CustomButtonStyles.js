import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const CustomButtonStyles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: moderateScale(45, 0.2),
    padding: moderateScale(5, 0.2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10, 0.2),
  },
  buttonText: {
    fontSize: moderateScale(14, 0.2),
    fontFamily: "PopinsRegular",
    textAlign: "center",
  },
  secondaryButton: {
    width: "100%",
    minHeight: moderateScale(45, 0.2),
    padding: moderateScale(5, 0.2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10, 0.2),
  },
  secondaryButtonText: {
    fontSize: moderateScale(14, 0.2),
    fontFamily: "PopinsRegular",
    textAlign: "center",
  },
  //   danger: {
  //     backgroundColor: '#fc443a',
  //     width: '100%',
  //     height: moderateScale(45, 0.2),
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderRadius: moderateScale(10, 0.2),
  //   },
});

export default CustomButtonStyles;
