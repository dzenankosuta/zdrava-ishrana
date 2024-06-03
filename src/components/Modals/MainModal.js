import { View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  CommonActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from './MainModalStyles';
import MainModalButton from '../CustomButton/MainModalButton';
import { useSelector } from 'react-redux';

const MainModal = ({ modalVisible, openModal, closeModal }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { isAdmin } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const expenseIcon = (
    <Feather size={20} name="dollar-sign" color={colors.background2} />
  );
  const eventIcon = (
    <Ionicons size={22} name="location-outline" color={colors.background2} />
  );
  const reminderIcon = (
    <Octicons size={20} name="bell" color={colors.background2} />
  );
  const appointmentIcon = (
    <Feather size={20} name="edit-3" color={colors.background2} />
  );
  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.8}
      onBackdropPress={closeModal}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'transparent' }]}>
        <View style={[styles.infoContainer]}>
          {isAdmin && (
            <MainModalButton
              icon={expenseIcon}
              screenName={t('expense')}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'business',
                        state: {
                          index: 1,
                          routes: [
                            { name: 'business' },
                            {
                              name: 'New Expense',
                            },
                          ],
                        },
                      },
                    ],
                  })
                );
                closeModal();
              }}
            />
          )}
          <MainModalButton
            icon={eventIcon}
            screenName={t('event')}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'business',
                      state: {
                        index: 1,
                        routes: [
                          { name: 'business' },
                          {
                            name: 'New Event First',
                          },
                        ],
                      },
                    },
                  ],
                })
              );
              closeModal();
            }}
          />
          <MainModalButton
            icon={reminderIcon}
            screenName={t('reminder')}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'reminders',
                      state: {
                        index: 1,
                        routes: [
                          { name: 'reminders' },
                          {
                            name: 'New Reminder',
                          },
                        ],
                      },
                    },
                  ],
                })
              );
              closeModal();
            }}
          />
          <MainModalButton
            icon={appointmentIcon}
            screenName={t('appointment')}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'business',
                      state: {
                        index: 1,
                        routes: [
                          { name: 'business' },
                          {
                            name: 'New Appointment First',
                          },
                        ],
                      },
                    },
                  ],
                })
              );
              closeModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MainModal;
