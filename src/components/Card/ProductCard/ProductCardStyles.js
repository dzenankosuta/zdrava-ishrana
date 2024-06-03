import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const ProductCardStyles = StyleSheet.create({
  card: {
    marginLeft: "5%",
    width: "42.5%",
    minHeight: moderateScale(240, 0.2),
    marginBottom: moderateScale(15, 0.2),
  },
  btn: {
    height: moderateScale(210, 0.2),
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
    justifyContent: "center",
    alignItems: "center",
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
    width: "80%",
    fontFamily: "PopinsRegular",
  },
  productFavoriteBtn: {
    alignSelf: "flex-start",
    width: "20%",
    height: moderateScale(30, 0.2),
    borderRadius: moderateScale(15, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCardStyles;
