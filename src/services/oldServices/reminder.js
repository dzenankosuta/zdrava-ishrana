import AsyncStorage from '@react-native-async-storage/async-storage';

const setReminersData = async (data) => {
  await AsyncStorage.setItem('reminders', data);
};

export const addReminder = async (data) => {
  setReminersData(JSON.stringify(data));
};

export const deleteReminders = async () => {
  await AsyncStorage.removeItem('reminders');
};
