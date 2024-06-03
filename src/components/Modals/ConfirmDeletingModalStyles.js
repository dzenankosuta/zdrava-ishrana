import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const ConfirmDeletingModalStyles = StyleSheet.create({
  modalContainer: {
    marginLeft: '5%',
    width: '90%',
    height: moderateScale(550, 0.2),
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
    padding: moderateScale(10, 0.2),
    borderTopWidth: 2,
  },
  btnContainer: {
    width: '100%',
    height: moderateScale(100, 0.2),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    borderBottomWidth: 0.7,
    paddingVertical: moderateScale(5, 0.2),
    marginVertical: moderateScale(15, 0.2),
  },
  errors: {
    width: '80%',
    textAlign: 'center',
    fontSize: moderateScale(12, 0.2),
    fontStyle: 'italic',
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

export default ConfirmDeletingModalStyles;
