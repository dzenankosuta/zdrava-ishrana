import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Feather from "react-native-vector-icons/Feather";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { moderateScale } from "react-native-size-matters";
import { getLanguages } from "../../services/oldServices/languages";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import styles from "./AuthStyles";

const Auth = () => {
  const { colors } = useTheme();
  const [auth, setAuth] = useState("login");
  const [imgFlag, setImgFlag] = useState("en");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const changeLanguage = async () => {
    const locale = await AsyncStorage.getItem("lang");
    const availableLanguages = await getLanguages().then(
      (language) => language
    );
    if (locale === "sr") {
      await AsyncStorage.setItem("lang", "en");
      i18n.changeLanguage("en");
      setCurrentLanguage(
        availableLanguages.find((lang) => lang.iso_code === "en").iso_code
      );
      // setImgFlag('en');
    } else {
      await AsyncStorage.setItem("lang", "sr");
      i18n.changeLanguage("sr");
      setCurrentLanguage(
        availableLanguages.find((lang) => lang.iso_code === "sr").iso_code
      );
      // setImgFlag('sr');
    }
  };
  useEffect(() => {
    async function getLanguageAndSetFlag() {
      try {
        const locale = await AsyncStorage.getItem("lang");
        if (locale) {
          const availableLanguages = await getLanguages().then(
            (language) => language
          );
          setCurrentLanguage(
            availableLanguages.find((lang) => lang.iso_code === locale).iso_code
          );
          // console.log({ currentLanguage });
          // setImgFlag(currentLanguage);
        } else {
          setCurrentLanguage("en");
          // setImgFlag('en');
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    getLanguageAndSetFlag();
  }, []);
  // console.log(imgFlag);
  // console.log({ currentLanguage });
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={{ backgroundColor: colors.background2 }}
    >
      <View style={[styles.container]}>
        {/* <Image
          source={require("../../../assets/Backgrounds/back_auth.png")}
          style={styles.background}
        />
        <Image
          source={require("../../../assets/Images/logo_pozitiv.png")}
          style={[styles.img]}
        /> */}
        <Text style={[styles.logoText, { color: colors.background2 }]}>
          Letiapp
        </Text>
        <ScrollView
          style={[
            styles.secondContainer,
            {
              backgroundColor: colors.background,
              borderRadius: moderateScale(25, 0.2),
            },
          ]}
          keyboardShouldPersistTaps={"handled"}
        >
          <TouchableOpacity
            style={[
              styles.containerX,
              { display: auth === "forgotPassword" ? "flex" : "none" },
            ]}
            activeOpacity={0.7}
            underlayColor={"transparent"}
            onPress={() => setAuth("login")}
          >
            <Feather size={30} name="x" color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerFlags]}
            activeOpacity={0.7}
            underlayColor={"transparent"}
            onPress={changeLanguage}
          >
            {/* <Image
              style={[styles.flags, { borderColor: colors.border }]}
              source={
                currentLanguage === "sr"
                  ? require(`../../../assets/Flags/flag_square_sr.png`)
                  : require(`../../../assets/Flags/flag_square_en.png`)
              }
            /> */}
          </TouchableOpacity>
          <View
            style={[
              styles.switchingButtons,
              {
                borderColor: colors.border,
                display: auth === "forgotPassword" ? "none" : "flex",
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.switchingButton,
                {
                  backgroundColor:
                    auth === "signup" ? colors.background : colors.primary,
                },
              ]}
              activeOpacity={0.9}
              underlayColor={"transparent"}
              onPress={() => setAuth("login")}
            >
              <Text
                style={{
                  color: auth === "signup" ? colors.text : colors.border,
                }}
              >
                {t("login")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switchingButton,
                {
                  backgroundColor:
                    auth === "signup" ? colors.primary : colors.background,
                },
              ]}
              activeOpacity={0.9}
              underlayColor={"transparent"}
              onPress={() => setAuth("signup")}
            >
              <Text
                style={{
                  color: auth === "signup" ? colors.border : colors.text,
                }}
              >
                {t("sign_up")}
              </Text>
            </TouchableOpacity>
          </View>
          {auth === "signup" ? (
            <Register lang={currentLanguage} />
          ) : auth === "forgotPassword" ? (
            <ForgotPassword lang={currentLanguage} setAuth={setAuth} />
          ) : (
            <Login lang={currentLanguage} setAuth={setAuth} />
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Auth;
