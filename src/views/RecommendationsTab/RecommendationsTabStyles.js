import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale } from "react-native-size-matters";

const RecommendationsTabStyles = StyleSheet.create({
  header: {
    height:
      Platform.OS === "ios" ? moderateScale(50, 0.2) : moderateScale(90, 0.2),
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerTitleStyle: {
    marginLeft: "15%",
    paddingBottom: moderateScale(10, 0.2),
    fontSize:
      Platform.OS === "ios" ? moderateScale(17, 0.2) : moderateScale(20, 0.2),
    fontFamily: "PopinsRegular",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  dotsBtn: {
    marginTop: moderateScale(90, 0.2),
    width: moderateScale(50, 0.2),
    height: moderateScale(50, 0.2),
    borderRadius: moderateScale(25, 0.2),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.2,
  },
  firstContainer: {
    height: moderateScale(140, 0.2),
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchAddContainer: {
    marginTop: moderateScale(20, 0.2),
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: moderateScale(15, 0.2),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(40, 0.2),
    paddingVertical: moderateScale(8, 0.2),
    paddingHorizontal: moderateScale(13, 0.2),
    borderWidth: 0.1,
  },
  addBtn: {
    width: moderateScale(40, 0.2),
    height: moderateScale(40, 0.2),
    borderRadius: moderateScale(15, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    width: "85%",
    height: moderateScale(40, 0.2),
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    height: moderateScale(40, 0.2),
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  cardWrapper: {
    marginTop: moderateScale(15, 0.2),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modalSelected: {
    width: "100%",
    height: moderateScale(40, 0.2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagginationWrapper: {
    width: "100%",
    height: moderateScale(60, 0.2),
    marginVertical: moderateScale(20, 0.2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(10, 0.2),
  },
  pageBtn: {
    width: moderateScale(50, 0.2),
    height: moderateScale(50, 0.2),
    borderRadius: moderateScale(15, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  pageBtnText: {
    fontSize: moderateScale(16, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default RecommendationsTabStyles;
