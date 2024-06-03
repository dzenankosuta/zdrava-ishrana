import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const ForgotPasswordStyles = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginTop: moderateScale(50, 0.2),
    marginBottom: moderateScale(30, 0.2),
    fontSize: moderateScale(24, 0.2),
  },
  message: {
    width: '80%',
    textAlign: 'center',
    fontSize: moderateScale(14, 0.2),
    fontStyle: 'italic',
    marginBottom: moderateScale(10, 0.2),
  },
  textInput: {
    width: '80%',
    borderBottomWidth: 0.7,
    paddingVertical: moderateScale(5, 0.2),
  },
  errors: {
    width: '80%',
    textAlign: 'center',
    fontSize: moderateScale(12, 0.2),
    fontStyle: 'italic',
  },
  buttonWrapper: {
    width: '100%',
    marginLeft: '20%',
    marginTop: moderateScale(30, 0.2),
  },
  forgotPassword: {
    marginTop: moderateScale(4, 0.2),
    marginRight: '10%',
    alignSelf: 'flex-end',
  },
  notRegistered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(40, 0.2),
  },
  textNotRegistered: {
    marginVertical: moderateScale(20, 0.2),
    fontSize: moderateScale(12, 0.2),
  },
  web: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: moderateScale(10, 0.2),
  },
  page: {
    height: moderateScale(50, 0.2),
  },
  img: {
    width: moderateScale(50, 0.2),
    height: moderateScale(50, 0.2),
    marginHorizontal: moderateScale(30, 0.2),
  },
  success: {
    width: '80%',
    textAlign: 'center',
    fontSize: moderateScale(16, 0.2),
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginVertical: moderateScale(50, 0.2),
  },
});

export default ForgotPasswordStyles;
