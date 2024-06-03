import { useFonts } from "expo-font";

const useAppFonts = () => {
  const [areFontsLoaded] = useFonts({
    BebasNeue: require("../../assets/fonts/BebasNeue-Regular.ttf"),
    PopinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PopinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    PopinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PopinsExtraLight: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    PopinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PopinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PopinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PopinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
    PopinsBoldItalic: require("../../assets/fonts/Poppins-BoldItalic.ttf"),
    PopinsExtraLightItalic: require("../../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PopinsItalic: require("../../assets/fonts/Poppins-Italic.ttf"),
    PopinsLightItalic: require("../../assets/fonts/Poppins-LightItalic.ttf"),
    PopinsMediumItalic: require("../../assets/fonts/Poppins-MediumItalic.ttf"),
    PopinsSemiBoldItalic: require("../../assets/fonts/Poppins-SemiBoldItalic.ttf"),
  });

  return {
    areFontsLoaded,
  };
};

export default useAppFonts;
