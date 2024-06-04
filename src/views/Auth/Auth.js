import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from "react-native-size-matters";
import styles from "./AuthStyles";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";

const Auth = () => {
  const { colors } = useTheme();
  const [auth, setAuth] = useState("login");
  const { t } = useTranslation();

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={{ backgroundColor: colors.background }}
    >
      <View style={[styles.container]}>
        <Image
          source={require("../../../assets/Images/smoothie.jpg")}
          style={styles.background}
        />
        <Text style={[styles.logoText, { color: colors.primary }]}>
          {t("home_title")}
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
          <View
            style={[
              styles.switchingButtons,
              {
                borderColor: colors.border,
                display: "flex",
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
                  color: auth === "signup" ? colors.text : colors.link,
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
                  color: auth === "signup" ? colors.link : colors.text,
                }}
              >
                {t("sign_up")}
              </Text>
            </TouchableOpacity>
          </View>
          {auth === "signup" ? <Register /> : <Login setAuth={setAuth} />}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Auth;
