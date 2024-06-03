import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const ActionProductCardStyles = StyleSheet.create({
  card: {
    marginVertical: moderateScale(7, 0.2),
    marginRight: moderateScale(15, 0.2),
    width: moderateScale(100, 0.2),
    minHeight: moderateScale(160, 0.2),
    marginBottom: moderateScale(15, 0.2),
  },
  btn: {
    height: moderateScale(130, 0.2),
    borderRadius: moderateScale(15, 0.2),
    backgroundColor: "#ffffff",
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
    borderRadius: moderateScale(15, 0.2),
  },
  productInfo: {
    marginTop: moderateScale(5, 0.2),
    minHeight: moderateScale(30, 0.2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(5, 0.2),
  },
  productTitle: {
    width: "100%",
    fontSize: moderateScale(12, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default ActionProductCardStyles;
