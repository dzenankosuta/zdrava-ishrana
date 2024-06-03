import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const RecommendationCardStyles = StyleSheet.create({
  card: {
    width: "95%",
    minHeight: moderateScale(130, 0.2),
    marginVertical: moderateScale(15, 0.2),
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
  imgContainer: {
    flex: 4,
    backgroundColor: "#ffffff",
    borderTopRightRadius: moderateScale(15, 0.2),
    borderBottomRightRadius: moderateScale(15, 0.2),
    borderTopLeftRadius: moderateScale(50, 0.2),
    borderBottomLeftRadius: moderateScale(50, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    resizeMode: "contain",
    width: "80%",
    height: "80%",
  },
  storyContainer: {
    flex: 5,
    padding: moderateScale(10, 0.2),
  },
  title: {
    marginBottom: moderateScale(5, 0.2),
    fontSize: moderateScale(16, 0.2),
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "PopinsRegular",
  },
  text: {
    fontSize: moderateScale(13, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default RecommendationCardStyles;
