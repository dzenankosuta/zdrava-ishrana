import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import styles from './ConfirmDeletingModalStyles';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { use } from 'i18next';

const ConfirmDeletingModal = ({
  modalVisible,
  setModalVisible,
  title,
  info,
  confirm,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { userData } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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
            left: moderateScale(20, 0.2),
          }}
        >
          <Feather size={25} name="check" color={colors.primary} />
        </View>
        <Text style={[styles.modalTitle, { color: colors.text }]}>{title}</Text>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={'handled'}
          style={[styles.infoContainer, { borderTopColor: colors.border }]}
        >
          <Text style={{ color: colors.text }}>{info}</Text>
        </ScrollView>
        <View style={[styles.btnContainer]}>
          <TextInput
            style={[
              styles.textInput,
              {
                color: colors.text,
                borderBottomColor: colors.placeholder,
              },
            ]}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholder={t('enter_email')}
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error && (
            <Text
              style={[
                styles.errors,
                {
                  color: colors.notification,
                  marginBottom: moderateScale(10, 0.2),
                },
              ]}
            >
              {error}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={'transparent'}
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={() => {
              if (email !== userData.email) {
                setError(t('email_not_match'));
              } else {
                setError('');
                confirm();
              }
            }}
          >
            <Text style={{ color: colors.border }}>{t('confirm')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeletingModal;
