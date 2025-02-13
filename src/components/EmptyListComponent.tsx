import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import EmptyListImage from '../assets/empty-list.svg';
import { width } from '../services';

const EmptyListComponent = () => {
  return (
    <View style={style.container}>
      <EmptyListImage
        width={width * 0.9}
        height={width * 0.9}
      />
      <Text>{'No rewards to display just yet :('}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyListComponent;
