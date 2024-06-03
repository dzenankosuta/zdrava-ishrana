import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const StoryCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: moderateScale(160, 0.2),
    marginBottom: moderateScale(15, 0.2),
    borderRadius: moderateScale(15, 0.2),
    backgroundColor: "white",
    borderWidth: 0,
    shadowColor: "#00000080",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.84,
    elevation: 5,
    flexDirection: "row",
  },
  img: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: moderateScale(15, 0.2),
    borderBottomLeftRadius: moderateScale(15, 0.2),
    flex: 4,
  },
  storyContainer: {
    flex: 5,
    padding: moderateScale(10, 0.2),
  },
  title: {
    marginBottom: moderateScale(5, 0.2),
    fontSize: moderateScale(16, 0.2),
    textAlign: "center",
    fontFamily: "PopinsRegular",
  },
  text: {
    fontSize: moderateScale(12, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default StoryCardStyles;
