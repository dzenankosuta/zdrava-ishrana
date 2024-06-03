import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const ProductFilterCardStyles = StyleSheet.create({
  card: {
    marginVertical: moderateScale(7, 0.2),
    marginRight: moderateScale(15, 0.2),
    minWidth: moderateScale(90, 0.2),
    maxWidth: moderateScale(110, 0.2),
    minHeight: moderateScale(90, 0.2),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    width: moderateScale(90, 0.2),
    height: moderateScale(90, 0.2),
    borderRadius: moderateScale(35, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontFamily: "PopinsRegular",
    fontSize: moderateScale(12, 0.2),
  },
});

export default ProductFilterCardStyles;
