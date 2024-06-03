import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  secondContainer: {
    marginTop: moderateScale(-70, 0.2),
    marginBottom: moderateScale(20, 0.2),
    width: "85%",
    minHeight: moderateScale(400, 0.2),
    borderWidth: 0,
    shadowColor: "#00000080",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerX: {
    position: "absolute",
    marginTop: moderateScale(15, 0.2),
    marginLeft: moderateScale(15, 0.2),
  },
  containerFlags: {
    width: moderateScale(50, 0.2),
    height: moderateScale(30, 0.2),
    marginTop: moderateScale(15, 0.2),
    marginRight: moderateScale(20, 0.2),
    alignSelf: "flex-end",
    borderRadius: moderateScale(5, 0.2),
  },
  flags: {
    width: moderateScale(50, 0.2),
    height: moderateScale(30, 0.2),
    objectFit: "contain",
    borderWidth: 0.5,
  },
  switchingButtons: {
    marginLeft: "10%",
    marginVertical: moderateScale(40, 0.2),
    flexDirection: "row",
    width: "80%",
    height: moderateScale(35, 0.2),
    borderRadius: moderateScale(20, 0.2),
    borderWidth: 1,
  },
  switchingButton: {
    width: "50%",
    borderRadius: moderateScale(20, 0.2),
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    resizeMode: "cover",
    width: "100%",
  },
  img: {
    width: moderateScale(80, 0.2),
    height: moderateScale(80, 0.2),
    position: "absolute",
    top: moderateScale(60, 0.2),
    right: moderateScale(40, 0.2),
  },
  logoText: {
    fontSize: moderateScale(35, 0.2),
    position: "absolute",
    top: moderateScale(140, 0.2),
    right: moderateScale(75, 0.2),
    fontFamily: "PopinsRegular",
  },
});

export default AuthStyles;
