import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  dropdown: {
    height: 35,
    width: 195,
    borderColor: Colors.gray1,
    backgroundColor: Colors.gray1,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  selectedDropdownItemContainer: {
    backgroundColor: Colors.orange,
  },
  selectedDropdownItem: {
    color: Colors.white,
    fontWeight: '700',
  },
  dropdownItemContainer: {
    padding: 10,
  },
  dropdownItem: {
    fontSize: 12,
  },
});
