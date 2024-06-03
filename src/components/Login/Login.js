import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useMutation } from "react-query";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import styles from "./LoginStyles";
import { login } from "../../services/oldServices/user";
import ActivityScreen from "../../views/ActivityScreen/ActivityScreen";
import { useTranslation } from "react-i18next";
import { moderateScale } from "react-native-size-matters";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ lang, setAuth }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [forgotPassword, setForgotPassword] = useState(false);
  const incorrectStyles = message !== "" ? colors.notification : colors.text;

  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "554236120911-lnc63f8d0st6806c73rnhrm8p55ss0f7.apps.googleusercontent.com",
    iosClientId:
      "554236120911-2kov0ng0vuiurothkgqjhgkrubi14e9o.apps.googleusercontent.com",
    webClientId:
      "554236120911-gb6cocas2eumga4rcdve68ovfaukh86n.apps.googleusercontent.com",
    expoClientId:
      "554236120911-gb6cocas2eumga4rcdve68ovfaukh86n.apps.googleusercontent.com",
  });

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: "3417479531844510",
    });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  useEffect(() => {
    if (
      responseFacebook &&
      responseFacebook.type === "success" &&
      responseFacebook.authentication
    ) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${encodeURIComponent(
            responseFacebook.authentication.accessToken
          )}&fields=id,name,email,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [responseFacebook]);

  async function handlePressAsync() {
    const result = await promptAsyncFacebook();
    if (result.type !== "success") {
      Alert.alert("Uh oh!", "Something went wrong!");
      return;
    }
  }

  async function handleSignInWithGoogle() {
    // const user = await AsyncStorage.getItem('@user');
    // if (!user) {
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
    }
    // } else {
    //   setUserInfo(JSON.parse(user));
    // }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/userinfo/v2/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // console.log(error);
    }
  };

  const { mutate: doAuth, isLoading } = useMutation((values) => login(values), {
    onSuccess: (res) => {
      // console.log(res.data);
      setMessage("");
    },
    onError: (error) => {
      // console.log(error);
      if (error.response.status === 500) {
        setMessage(t("server_error"));
      }
      // setMessage(t('incorrect_credentials'));
      // console.log(error.response.data.message);
      setMessage(error.response.data.message);
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSite = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert(`${t("error_opening_site")} ${url}`);
    }
  };

  return (
    <>
      {isLoading && <ActivityScreen message={t("logging")} />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={150}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={"handled"}
          style={[styles.scroll, { display: isLoading ? "none" : "flex" }]}
        >
          <Formik
            initialValues={{ email: "", password: "", language: lang }}
            onSubmit={(values) => {
              values.language = lang;
              doAuth(values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required(t("required_email"))
                .email(t("wrong_format_email")),
              // .max(250, t('max_email')),
              password: Yup.string().required(t("required_password")),
              // .max(20, t('max_password')),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => {
              return (
                <SafeAreaView style={[styles.safeArea]}>
                  <Text style={[styles.message, { color: incorrectStyles }]}>
                    {message}
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                        borderBottomColor: colors.placeholder,
                      },
                    ]}
                    onChangeText={(value) => setFieldValue("email", value)}
                    value={values.email}
                    placeholder={t("enter_email")}
                    placeholderTextColor={colors.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={handleBlur("email")}
                  />
                  <Text
                    style={[
                      styles.errors,
                      {
                        color: colors.darkBorder,
                        marginBottom: moderateScale(20, 0.2),
                      },
                    ]}
                  >
                    {errors.email && touched.email && errors.email} {}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={[
                        styles.textInput,
                        {
                          color: colors.text,
                          borderBottomColor: colors.placeholder,
                          paddingRight: moderateScale(30, 0.2),
                        },
                      ]}
                      onChangeText={(value) => setFieldValue("password", value)}
                      value={values.password}
                      placeholder={t("enter_password")}
                      placeholderTextColor={colors.placeholder}
                      keyboardType="password"
                      secureTextEntry={!showPassword}
                      password={true}
                      onBlur={handleBlur("password")}
                    />
                    <TouchableOpacity
                      onPress={toggleShowPassword}
                      style={{ position: "absolute", right: 0, bottom: 3 }}
                    >
                      <Text>
                        {showPassword ? (
                          <IoniconsIcon
                            size={22}
                            name="md-eye-off"
                            color={colors.placeholder}
                          />
                        ) : (
                          <IoniconsIcon
                            size={22}
                            name="md-eye"
                            color={colors.placeholder}
                          />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.errors, { color: colors.darkBorder }]}>
                    {errors.password && touched.password && errors.password}
                  </Text>
                  <TouchableOpacity
                    style={[styles.forgotPassword]}
                    activeOpacity={0.8}
                    underlayColor={"transparent"}
                    onPress={() => setAuth("forgotPassword")}
                  >
                    <Text
                      style={{
                        color: colors.darkBorder,
                        fontSize: moderateScale(12, 0.2),
                      }}
                    >
                      {t("forgot_password")}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.buttonWrapper}>
                    <CustomButton text={t("login_in")} onPress={handleSubmit} />
                  </View>
                  <Text style={[styles.or, { color: colors.darkBorder }]}>
                    {t("or")}
                  </Text>
                  <View style={[styles.web]}>
                    <TouchableOpacity
                      style={[styles.page]}
                      activeOpacity={0.8}
                      underlayColor={"transparent"}
                      onPress={() => promptAsync()}
                      // disabled={}
                    >
                      {/* <Image
                        style={[styles.img]}
                        source={require('../../../assets/Icons/google_logo.png')}
                      /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.page]}
                      activeOpacity={0.8}
                      underlayColor={"transparent"}
                      onPress={handlePressAsync}
                    >
                      {/* <Image
                        style={[styles.img]}
                        source={require('../../../assets/Icons/facebook_logo.png')}
                      /> */}
                    </TouchableOpacity>
                  </View>
                  {/* <Text>{JSON.stringify(userInfo, null, 2)}</Text> */}
                  {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
                </SafeAreaView>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
