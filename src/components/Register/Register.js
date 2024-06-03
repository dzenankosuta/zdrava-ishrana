import React, { useState } from "react";
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
import { useTheme } from "@react-navigation/native";
import { useMutation } from "react-query";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import styles from "./RegisterStyles";
import { signup } from "../../services/oldServices/user";
import ActivityScreen from "../../views/ActivityScreen/ActivityScreen";
import { useTranslation } from "react-i18next";
import { moderateScale } from "react-native-size-matters";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ lang }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [messageTerms, setMessageTerms] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const incorrectStyles =
    message !== "" && message !== t("successful_registration")
      ? colors.notification
      : colors.text;

  const [number1, setNumber1] = useState(Math.floor(Math.random() * 10) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = useState("");
  const [captchaResult, setCaptchaResult] = useState("");

  const generateCaptcha = () => {
    setNumber1(Math.floor(Math.random() * 10) + 1);
    setNumber2(Math.floor(Math.random() * 10) + 1);
    setUserAnswer("");
    setCaptchaResult("");
  };

  const checkAnswer = () => {
    const expectedAnswer = number1 + number2;
    if (parseInt(userAnswer) === expectedAnswer) {
      setCaptchaResult(t("correct"));
    } else {
      setCaptchaResult(t("incorrect"));
    }
  };

  const { mutate: doSignup, isLoading } = useMutation(
    (values) => signup(values),
    {
      onSuccess: (res) => {
        const data = { ...res };
        setMessage(t("successful_registration"));
        // setMessage(data.data.status);
        // console.log(data.data.status);
        // console.log(data.data);
      },
      onError: (error) => {
        // const data = { ...error };
        if (error.response.status === 500) {
          setMessage(t("server_error"));
        }
        setMessage(error.response.data.message);
        // console.log(data.response.data.message);
        // console.log(error.response);
      },
    }
  );

  const handleSite = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert(`${t("error_opening_site")} ${url}`);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  if (message === t("successful_registration")) {
    return (
      <View style={[styles.safeArea]}>
        <Text style={[styles.success, { color: colors.text }]}>{message}</Text>
      </View>
    );
  }
  return (
    <>
      {isLoading && <ActivityScreen message={t("registering")} />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={50}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={"handled"}
          style={[styles.scroll, { display: isLoading ? "none" : "flex" }]}
        >
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirm_password: "",
              theme: "lite",
              language: lang,
            }}
            onSubmit={(values) => {
              doSignup(values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required(t("required_email"))
                .email(t("wrong_format_email"))
                .max(250, t("max_email")),
              password: Yup.string()
                .required(t("required_password"))
                .min(8, t("min_password"))
                .max(20, t("max_password"))
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/,
                  t("special_requirement_password")
                ),
              confirm_password: Yup.string()
                .required(t("required_confirm_password"))
                .min(8, t("min_confirm_password"))
                .max(20, t("max_confirm_password"))
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/,
                  t("special_requirement_confirm_password")
                )
                .when("password", (password, field) =>
                  password
                    ? field
                        .required(t("required_confirm_password"))
                        .oneOf([Yup.ref("password")], t("same_passwords"))
                    : field
                ),
              first_name: Yup.string()
                .required(t("required_first_name"))
                .min(2, t("min_first_name"))
                .max(100, t("max_first_name")),
              last_name: Yup.string()
                .required(t("required_last_name"))
                .min(2, t("min_last_name"))
                .max(100, t("max_last_name")),
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
                    onChangeText={(value) => setFieldValue("first_name", value)}
                    value={values.first_name}
                    // placeholder={`${t('Fill in your name')}`}
                    placeholder={t("enter_first_name")}
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                    onBlur={handleBlur("first_name")}
                  />
                  <Text
                    style={[
                      styles.errors,
                      {
                        color: colors.darkBorder,
                        marginBottom: moderateScale(10, 0.2),
                      },
                    ]}
                  >
                    {errors.first_name &&
                      touched.first_name &&
                      errors.first_name}
                    {}
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                        borderBottomColor: colors.placeholder,
                      },
                    ]}
                    onChangeText={(value) => setFieldValue("last_name", value)}
                    value={values.last_name}
                    placeholder={t("enter_last_name")}
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                    onBlur={handleBlur("last_name")}
                  />
                  <Text
                    style={[
                      styles.errors,
                      {
                        color: colors.darkBorder,
                        marginBottom: moderateScale(10, 0.2),
                      },
                    ]}
                  >
                    {errors.last_name && touched.last_name && errors.last_name}
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
                        marginBottom: moderateScale(10, 0.2),
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
                  <Text
                    style={[
                      styles.errors,
                      {
                        color: colors.darkBorder,
                        marginBottom: moderateScale(10, 0.2),
                      },
                    ]}
                  >
                    {errors.password && touched.password && errors.password}
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
                      onChangeText={(value) =>
                        setFieldValue("confirm_password", value)
                      }
                      value={values.confirm_password}
                      placeholder={t("enter_confirm_password")}
                      placeholderTextColor={colors.placeholder}
                      keyboardType="password"
                      secureTextEntry={!showConfirmPassword}
                      password={true}
                      onBlur={handleBlur("confirm_password")}
                    />
                    <TouchableOpacity
                      onPress={toggleShowConfirmPassword}
                      style={{ position: "absolute", right: 0, bottom: 3 }}
                    >
                      <Text>
                        {showConfirmPassword ? (
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
                    {errors.confirm_password &&
                      touched.confirm_password &&
                      errors.confirm_password}
                  </Text>
                  <View style={[styles.checkWrapper]}>
                    <CheckBox
                      checked={isChecked}
                      onPress={handleCheckBox}
                      containerStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 0,
                        width: 30,
                        height: 45,
                      }}
                      checkedColor={colors.primary}
                      uncheckedColor={colors.darkBorder}
                    />
                    <Text style={{ color: colors.text }}>
                      {t("accept_terms")}
                      {"  "}
                    </Text>
                    <TouchableOpacity
                      style={{}}
                      activeOpacity={0.8}
                      underlayColor={"transparent"}
                      onPress={async () => {
                        const locale = await AsyncStorage.getItem("lang");
                        handleSite(`https://letiapp.in.rs/terms/${locale}`);
                      }}
                    >
                      <Text style={{ color: colors.primary }}>
                        {t("terms_and_conditions")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      styles.errors,
                      {
                        color: colors.notification,
                      },
                    ]}
                  >
                    {messageTerms}
                  </Text>
                  <View></View>
                  <View>
                    <View
                      style={[
                        styles.solveWrapper,
                        { backgroundColor: colors.infoBackground },
                      ]}
                    >
                      <Text style={{ color: colors.text }}>
                        {t("solve")} {number1} + {number2} ={" "}
                      </Text>
                      <TextInput
                        style={{ width: "70%" }}
                        value={userAnswer}
                        onChangeText={setUserAnswer}
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={[styles.checkTabs, { borderColor: colors.border }]}
                    >
                      <TouchableOpacity
                        style={{}}
                        activeOpacity={0.8}
                        underlayColor={"transparent"}
                        onPress={checkAnswer}
                      >
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: moderateScale(14, 0.2),
                          }}
                        >
                          {t("check")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{}}
                        activeOpacity={0.8}
                        underlayColor={"transparent"}
                        onPress={generateCaptcha}
                      >
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: moderateScale(14, 0.2),
                          }}
                        >
                          {t("generate_new")}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color:
                            captchaResult === t("correct")
                              ? "#00D100"
                              : colors.notification,
                          fontSize: moderateScale(14, 0.2),
                        }}
                      >
                        {captchaResult}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttonWrapper}>
                    <CustomButton
                      text={t("sign_up_in")}
                      onPress={() => {
                        if (!isChecked) {
                          setMessageTerms(t("must_accept_terms"));
                        } else {
                          setMessageTerms("");
                          handleSubmit();
                        }
                      }}
                      disabled={captchaResult !== t("correct")}
                    />
                  </View>
                  {/* <Text style={[styles.or, { color: colors.darkBorder }]}>
                    {t('or')}
                  </Text> */}
                  {/* <View style={[styles.web]}>
                    <TouchableOpacity
                      style={[styles.page]}
                      activeOpacity={0.8}
                      underlayColor={'transparent'}
                      onPress={() => handleSite('https://www.google.com')}
                    >
                      <Image
                        style={[styles.img]}
                        source={require('../../../assets/Icons/google_logo.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.page]}
                      activeOpacity={0.8}
                      underlayColor={'transparent'}
                      onPress={() => handleSite('https://www.facebook.com')}
                    >
                      <Image
                        style={[styles.img]}
                        source={require('../../../assets/Icons/facebook_logo.png')}
                      />
                    </TouchableOpacity>
                  </View> */}
                </SafeAreaView>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;
