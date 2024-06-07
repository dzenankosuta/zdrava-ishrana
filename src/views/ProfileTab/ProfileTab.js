import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import styles from "./ProfileTabStyles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../store/authSlice";
import { useMutation } from "react-query";
import { deleteUser } from "../../services/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { store } from "../../../store";

const ProfileTab = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { token, firstName, lastName, email, id } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [message, setMessage] = useState("");

  console.log("token", token);
  console.log("IDD", id);
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("email", email);
  const logout = async () => {
    AsyncStorage.multiRemove(["auth_token", "userData"]).then(() => {
      store.dispatch(authSlice.actions.logout());
    });
  };

  const { mutate: deleteThisUser, isLoading } = useMutation(
    () => deleteUser(id),
    {
      onSuccess: (res) => {
        setMessage("");
        logout();
      },
      onError: (error) => {
        if (error.response.status === 500) {
          setMessage(t("server_error"));
        }
        setMessage(error.message);
      },
    }
  );
  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
      <ConfirmModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
        title={t("delete_profile_title")}
        info={t("delete_profile_info")}
        confirm={deleteThisUser}
      />
      <View style={[styles.showProfile, {}]}>
        <View style={[styles.borderName, { borderColor: colors.primary }]}>
          {firstName && lastName && (
            <Text style={[styles.textInitials, { color: colors.primary }]}>
              {firstName[0] + lastName[0]}
            </Text>
          )}
        </View>
        <View style={styles.profileWrapper}>
          <View style={[styles.profileTextWrapper]}>
            {firstName && lastName && (
              <Text style={[styles.text, { color: colors.text }]}>
                {firstName + " " + lastName}
              </Text>
            )}
            {email && (
              <Text style={[styles.text, { color: colors.text }]}>{email}</Text>
            )}
          </View>
        </View>
      </View>
      {message !== "" && (
        <Text style={[styles.errorDelete, { color: colors.notification }]}>
          {message}
        </Text>
      )}
      <View style={[styles.backgroundWrapper]}>
        <Image
          source={require("../../../assets/Images/logo.png")}
          style={[styles.background]}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <CustomButton
            text={t("delete_profile")}
            type={"primary"}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            text={t("logout")}
            type={"secondary"}
            onPress={logout}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileTab;
