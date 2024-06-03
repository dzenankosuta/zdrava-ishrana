import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const StoriesTabStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    width: "90%",
    alignSelf: "center",
    paddingTop: moderateScale(15, 0.2),
    minHeight: 500,
  },
});

export default StoriesTabStyles;
