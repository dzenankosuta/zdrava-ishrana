import { Dimensions, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const HomeTabStyles = StyleSheet.create({
  headerContainer: {
    height: moderateScale(140, 0.2),
    paddingHorizontal: moderateScale(20, 0.2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    resizeMode: "contain",
    width: 110,
    height: 110,
  },
  headerTitle: {
    alignSelf: "center",
    fontSize: moderateScale(28, 0.2),
    fontWeight: "600",
    textAlign: "right",
    fontFamily: "PopinsRegular",
  },
  mainContainer: {
    borderTopLeftRadius: moderateScale(35, 0.2),
    borderTopRightRadius: moderateScale(35, 0.2),
    padding: moderateScale(20, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  recommendationContainer: {
    width: "95%",
    marginVertical: moderateScale(15, 0.2),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  recommendationTitle: {
    marginTop: moderateScale(10, 0.2),
    marginBottom: moderateScale(-20, 0.2),
    fontSize: moderateScale(22, 0.2),
    fontFamily: "PopinsRegular",
  },
  carouselWrapper: {
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  healthRecommendationContainer: {
    marginBottom: moderateScale(15, 0.2),
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  healthRecommendationTitle: {
    alignSelf: "flex-start",
    fontSize: moderateScale(18, 0.2),
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PopinsRegular",
  },
  actionRecommendationContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  actionRecommendationTitle: {
    alignSelf: "flex-start",
    fontSize: moderateScale(18, 0.2),
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PopinsRegular",
  },
  groupIcon: {
    marginVertical: moderateScale(5, 0.2),
  },
  homeImageFirst: {
    marginVertical: moderateScale(15, 0.2),
    width: "100%",
    height: moderateScale(220, 0.2),
    borderRadius: moderateScale(10, 0.2),
  },
});

export default HomeTabStyles;
