import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const ProductStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    margin: 0,
    width: "100%",
    height: moderateScale(350, 0.2),
    borderBottomLeftRadius: moderateScale(35, 0.2),
    borderBottomRightRadius: moderateScale(35, 0.2),
    borderWidth: 0,
    shadowColor: "#000000ff",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.84,
    elevation: 5,
  },
  img: {
    alignSelf: "center",
    width: "100%",
    height: moderateScale(350, 0.2),
    borderBottomLeftRadius: moderateScale(35, 0.2),
    borderBottomRightRadius: moderateScale(35, 0.2),
  },
  favoriteContainer: {
    position: "absolute",
    top: moderateScale(10, 0.2),
    right: moderateScale(5, 0.2),
  },
  productFavoriteBtn: {
    width: moderateScale(40, 0.2),
    height: moderateScale(40, 0.2),
    borderRadius: moderateScale(20, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginHorizontal: moderateScale(20, 0.2),
    marginTop: moderateScale(15, 0.2),
    fontSize: moderateScale(20, 0.2),
    textAlign: "center",
    fontFamily: "PopinsSemiBold",
  },
  population: {
    marginBottom: moderateScale(15, 0.2),
    fontSize: moderateScale(14, 0.2),
    textAlign: "center",
    fontFamily: "PopinsRegular",
  },
  subTitle: {
    marginHorizontal: moderateScale(20, 0.2),
    marginBottom: moderateScale(10, 0.2),
    fontSize: moderateScale(14, 0.2),
    fontFamily: "PopinsSemiBold",
  },
  text: {
    fontSize: moderateScale(14, 0.2),
    marginHorizontal: moderateScale(20, 0.2),
    marginBottom: moderateScale(25, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default ProductStyles;
