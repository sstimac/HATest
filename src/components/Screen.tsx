import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

const Screen = ({ children }: PropsWithChildren) => {
  return (
    <View style={style.container}>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Screen;
