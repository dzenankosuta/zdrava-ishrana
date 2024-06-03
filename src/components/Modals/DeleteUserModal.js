import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import styles from './DeleteUserModalStyles';

const DeleteUserModal = ({
  modalVisible,
  setModalVisible,
  modalTitle,
  deleteUser,
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
            position: 'absolute',
            top: moderateScale(25, 0.2),
            left: moderateScale(10, 0.2),
          }}
        >
          <Feather size={25} name="trash-2" color={colors.primary} />
        </View>
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          {modalTitle}
        </Text>

        <View style={[styles.btnContainer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={'transparent'}
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={deleteUser}
          >
            <Text style={{ color: colors.border }}>{t('yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={'transparent'}
            style={[styles.btn, { backgroundColor: colors.border }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: colors.primary }}>{t('no')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteUserModal;
