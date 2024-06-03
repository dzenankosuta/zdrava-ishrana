import { View, Text } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import styles from './InfoModalStyles';

const InfoModal = ({ modalVisible, setModalVisible, title, info }) => {
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
            top: moderateScale(15, 0.2),
            left: moderateScale(10, 0.2),
          }}
        >
          <Feather size={25} name="info" color={colors.primary} />
        </View>
        <Text style={[styles.modalTitle, { color: colors.text }]}>{title}</Text>

        <View style={[styles.infoContainer, { borderTopColor: colors.border }]}>
          <Text style={{ color: colors.text }}>{info}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
