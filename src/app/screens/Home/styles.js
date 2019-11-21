import { StyleSheet } from 'react-native';
import { green } from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333'
  },
  mainButton: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 3
  },
  background: {
    flex: 1,
    width: '100%'
  },
  grid: {
    flex: 1,
    width: '100%'
  },
  squared: {
    flex: 1,
    height: 180,
    borderColor: 'gray',
    borderWidth: 1
  },
  highlight: {
    borderColor: 'red'
  },
  screenshotTaken: {
    margin: 10,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 10
  }
});
