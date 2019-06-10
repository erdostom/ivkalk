import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ListItem = props => {
  return <Text style={styles.item}>
    {props.item}
  </Text>
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    fontSize: 18,
    borderWidth: 0.5,
    flexGrow: 9,
  }
})
