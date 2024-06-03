import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from 'react-native-size-matters';
import styles from './SelectThemeModalStyles';

const SelectThemeModal = ({
  modalVisible,
  setModalVisible,
  modalTitle,
  themeOption1,
  themeOption2,
  setTheme1,
  setTheme2,
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
            top: moderateScale(20, 0.2),
            left: moderateScale(10, 0.2),
          }}
        >
          <FontAwesome size={20} name="tv" color={colors.primary} />
        </View>
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          {modalTitle}
        </Text>
        <View style={[styles.btnContainer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={'transparent'}
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={setTheme1}
          >
            <Text style={{ color: colors.border }}>{themeOption1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={'transparent'}
            style={[styles.btn, { backgroundColor: colors.border }]}
            onPress={setTheme2}
          >
            <Text style={{ color: colors.primary }}>{themeOption2}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectThemeModal;
