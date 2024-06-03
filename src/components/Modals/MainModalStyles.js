import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const MainModalStyles = StyleSheet.create({
  modalContainer: {
    marginLeft: '40%',
    width: '60%',
    height: moderateScale(200, 0.2),
    borderRadius: moderateScale(5, 0.2),
    padding: moderateScale(16, 0.2),
    position: 'absolute',
    bottom: moderateScale(90, 0.2),
  },
  infoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: moderateScale(8, 0.2),
  },
});

export default MainModalStyles;
