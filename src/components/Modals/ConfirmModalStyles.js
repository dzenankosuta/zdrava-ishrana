import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const ConfirmModalStyles = StyleSheet.create({
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
    marginBottom: moderateScale(15, 0.2),
  },
  infoContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
  },
  btnContainer: {
    width: '100%',
    height: moderateScale(50, 0.2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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

export default ConfirmModalStyles;
