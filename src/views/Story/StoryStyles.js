import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const StoryStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: moderateScale(20, 0.2),
    fontSize: moderateScale(20, 0.2),
    textAlign: "center",
    fontFamily: "PopinsRegular",
  },
  img: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: moderateScale(15, 0.2),
  },
  text: {
    fontSize: moderateScale(14, 0.2),
    margin: moderateScale(20, 0.2),
    marginBottom: moderateScale(150, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default StoryStyles;
