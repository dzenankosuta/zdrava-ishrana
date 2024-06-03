import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const DeleteUserModalStyles = StyleSheet.create({
  modalContainer: {
    marginLeft: '5%',
    width: '90%',
    height: moderateScale(180, 0.2),
    borderRadius: moderateScale(25, 0.2),
    padding: moderateScale(16, 0.2),
  },
  modalTitle: {
    width: '95%',
    textAlign: 'center',
    fontSize: moderateScale(18, 0.2),
    marginLeft: moderateScale(15, 0.2),
    marginBottom: moderateScale(7, 0.2),
  },
  btnContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 2,
  },
  btn: {
    width: '40%',
    height: moderateScale(38, 0.2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12, 0.2),
  },
});

export default DeleteUserModalStyles;
