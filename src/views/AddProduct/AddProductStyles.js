import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const AddProductStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  addProductTitle: {
    marginTop: moderateScale(10, 0.2),
    marginBottom: moderateScale(20, 0.2),
    fontSize: moderateScale(22, 0.2),
    fontFamily: "PopinsRegular",
    textAlign: "center",
  },
  textInput: {
    marginVertical: moderateScale(10, 0.2),
    height: moderateScale(40, 0.2),
    width: "90%",
    borderBottomWidth: 0.7,
    paddingVertical: moderateScale(5, 0.2),
    fontFamily: "PopinsRegular",
  },
  image: {
    width: moderateScale(200, 0.2),
    height: moderateScale(200, 0.2),
  },
  buttonWrapper: {
    width: "90%",
    marginVertical: moderateScale(20, 0.2),
  },
  mainButtonWrapper: {
    width: "90%",
    alignSelf: "center",
    marginVertical: moderateScale(10, 0.2),
  },
});

export default AddProductStyles;
