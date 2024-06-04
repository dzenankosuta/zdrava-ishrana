import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from "react-native-size-matters";
import styles from "./ConfirmModalStyles";

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  title,
  info,
  confirm,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.5}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View
        style={[styles.modalContainer, { backgroundColor: colors.background }]}
      >
        <View
          style={{
            position: "absolute",
            top: moderateScale(20, 0.2),
            left: moderateScale(20, 0.2),
          }}
        >
          <Feather size={25} name="check" color={colors.primary} />
        </View>
        <Text style={[styles.modalTitle, { color: colors.text }]}>{title}</Text>

        <View style={[styles.infoContainer, { borderTopColor: colors.border }]}>
          <Text style={{ color: colors.text, textAlign: "center" }}>
            {info}
          </Text>
        </View>
        <View style={[styles.btnContainer]}>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={"transparent"}
            style={[styles.btn, { backgroundColor: colors.dangerous }]}
            onPress={confirm}
          >
            <Text style={{ color: colors.link }}>{t("yes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={"transparent"}
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: colors.link }}>{t("no")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
