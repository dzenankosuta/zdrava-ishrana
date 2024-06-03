import { Dimensions, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const TabStyles = StyleSheet.create({
  tabStyles: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyles: {
    backgroundColor: "#ff0",
    margin: 0,
    marginLeft: 5,
  },
  headerTitle: {
    textAlign: "center",
    marginHorizontal: moderateScale(20, 0.2),
    marginVertical: moderateScale(35, 0.2),
    fontSize: moderateScale(20, 0.2),
  },
  tabContainer: {
    width: Dimensions.get("window").width / 3,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: 40,
    height: 40,
    textAlign: "center",
  },
  tabName: {
    fontSize: 12,
    position: "absolute",
    bottom: 5,
  },
  tabBottomLine: {
    width: "80%",
    borderBottomWidth: 3,
    position: "absolute",
    bottom: 0,
  },
});

export default TabStyles;
