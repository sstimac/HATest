import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RewardListScreen, ClaimedRewardsScreen } from './screens';
import { store, persistor } from './redux';

const RootStack = createBottomTabNavigator({
  screens: {
    RewardListScreen: RewardListScreen,
    ClaimedRewardsScreen: ClaimedRewardsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
