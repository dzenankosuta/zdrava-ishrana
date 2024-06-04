import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import styles from "./ProfileTabStyles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import ConfirmModal from "../../components/Modals/ConfirmModal";

const ProfileTab = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <ConfirmModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
        title={t("delete_profile_title")}
        info={t("delete_profile_info")}
        confirm={() => {
          console.log("odee");
        }}
      />
      <View style={[styles.showProfile, {}]}>
        <View style={[styles.borderName, { borderColor: colors.primary }]}>
          <Text style={[styles.textInitials, { color: colors.primary }]}>
            AS
          </Text>
        </View>
        <View style={styles.profileWrapper}>
          <View style={[styles.profileTextWrapper]}>
            <Text style={[styles.text, { color: colors.text }]}>
              Anes Sefovic
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              anes@gmail.com
            </Text>
          </View>
        </View>
      </View>
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
            // onPress={() => {
            //   AsyncStorage.removeItem("auth_token").then(() => {
            //     dispatch(authSlice.actions.logout());
            //   });
            // }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileTab;
