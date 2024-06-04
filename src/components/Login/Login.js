import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@react-navigation/native";
import { useMutation } from "react-query";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import styles from "./LoginStyles";
import { login } from "../../services/user";
import ActivityScreen from "../../views/ActivityScreen/ActivityScreen";
import { useTranslation } from "react-i18next";
import { moderateScale } from "react-native-size-matters";

const Login = ({ lang, setAuth }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [forgotPassword, setForgotPassword] = useState(false);
  const incorrectStyles = message !== "" ? colors.notification : colors.text;

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
                            name="eye-off"
                            color={colors.placeholder}
                          />
                        ) : (
                          <IoniconsIcon
                            size={22}
                            name="eye"
                            color={colors.placeholder}
                          />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.errors, { color: colors.darkBorder }]}>
                    {errors.password && touched.password && errors.password}
                  </Text>
                  <View style={styles.buttonWrapper}>
                    <CustomButton text={t("login")} onPress={handleSubmit} />
                  </View>
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
