import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const AboutUserCardStyles = StyleSheet.create({
  card: {
    alignItems: "center",
    position: "absolute",
    left: 10,
    top: 25,
  },
  xBtn: {
    marginVertical: moderateScale(7, 0.2),
  },
  userImage: {
    width: moderateScale(40, 0.2),
    height: moderateScale(40, 0.2),
    borderRadius: moderateScale(50, 0.2),
    borderWidth: 0.7,
  },
  userText: {
    fontSize: 20,
    fontFamily: "PopinsRegular",
  },
});

export default AboutUserCardStyles;
