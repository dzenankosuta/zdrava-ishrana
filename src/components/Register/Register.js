import React, { useRef, useState } from "react";
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
import styles from "./RegisterStyles";
import { signup } from "../../services/user";
import ActivityScreen from "../../views/ActivityScreen/ActivityScreen";
import { useTranslation } from "react-i18next";
import { moderateScale } from "react-native-size-matters";

const Register = ({ lang }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const incorrectStyles =
    message !== "" && message !== t("successful_registration")
      ? colors.notification
      : colors.text;
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { mutate: doSignup, isLoading } = useMutation(
    (values) => signup(values),
    {
      onSuccess: (res) => {
        const data = { ...res };
        setMessage(t("successful_registration"));
      },
      onError: (error) => {
        if (error.response.status === 500) {
          setMessage(t("server_error"));
        }
        setMessage(error.message);
      },
    }
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            }}
            onSubmit={(values) => {
              doSignup({
                firstName: values.first_name,
                lastName: values.last_name,
                email: values.email,
                password: values.password,
              });
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required(t("required_email"))
                .email(t("wrong_format_email")),
              password: Yup.string()
                .required(t("required_password"))
                .min(6, t("min_password"))
                .max(20, t("max_password")),
              confirm_password: Yup.string()
                .required(t("required_confirm_password"))
                .min(8, t("min_confirm_password"))
                .max(20, t("max_confirm_password"))
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
                    placeholder={t("enter_first_name")}
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                    onBlur={handleBlur("first_name")}
                    ref={firstNameRef}
                    onSubmitEditing={() => lastNameRef.current.focus()}
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
                    ref={lastNameRef}
                    onSubmitEditing={() => emailRef.current.focus()}
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
                    ref={emailRef}
                    onSubmitEditing={() => passwordRef.current.focus()}
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
                      autoCapitalize="none"
                      ref={passwordRef}
                      onSubmitEditing={() => confirmPasswordRef.current.focus()}
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
                      autoCapitalize="none"
                      ref={confirmPasswordRef}
                    />
                    <TouchableOpacity
                      onPress={toggleShowConfirmPassword}
                      style={{ position: "absolute", right: 0, bottom: 3 }}
                    >
                      <Text>
                        {showConfirmPassword ? (
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
                    {errors.confirm_password &&
                      touched.confirm_password &&
                      errors.confirm_password}
                  </Text>
                  <View style={styles.buttonWrapper}>
                    <CustomButton
                      text={t("sign_up")}
                      onPress={() => {
                        handleSubmit();
                      }}
                    />
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

export default Register;
