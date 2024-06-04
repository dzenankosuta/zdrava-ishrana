import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const StoriesTabStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  showProfile: {
    paddingTop: moderateScale(60, 0.2),
    paddingBottom: moderateScale(10, 0.2),
    paddingHorizontal: moderateScale(30, 0.2),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  borderName: {
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(80, 0.2),
    height: moderateScale(80, 0.2),
    borderWidth: 1,
    borderRadius: moderateScale(15, 0.2),
  },
  textInitials: {
    fontSize: moderateScale(32, 0.2),
    fontFamily: "PopinsRegular",
  },
  profileWrapper: {
    justifyContent: "center",
    paddingHorizontal: moderateScale(35, 0.2),
    alignItems: "center",
  },
  profileTextWrapper: {
    justifyContent: "center",
    gap: moderateScale(5, 0.2),
    paddingLeft: moderateScale(10, 0.2),
  },
  text: {
    fontSize: moderateScale(14, 0.2),
    textAlign: "center",
    fontFamily: "PopinsRegular",
  },
  backgroundWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: moderateScale(300, 0.2),
    height: moderateScale(300, 0.2),
    opacity: 0.5,
  },
  buttonWrapper: {
    bottom: moderateScale(20, 0.2),
    marginTop: moderateScale(20, 0.2),
    flexDirection: "row",
    justifyContent: "center",
    gap: moderateScale(30, 0.2),
  },
  button: {
    width: moderateScale(150, 0.2),
    height: moderateScale(60, 0.2),
    borderRadius: moderateScale(10, 0.2),
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(5, 0.2),
  },
});

export default StoriesTabStyles;
