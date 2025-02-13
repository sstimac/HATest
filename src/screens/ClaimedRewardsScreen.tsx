import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Screen, RewardListItem, EmptyListComponent } from '../components';
import { getCollectedRewards } from '../redux';
import { Reward } from '../types';

const ClaimedRewardsScreen = () => {
  const collectedRewards = useSelector(getCollectedRewards);
  const listEmpty = useMemo(() => collectedRewards.length < 1, [collectedRewards]);

  const renderItem = ({ item }: { item: Reward }) => {
    return (
    <RewardListItem
      item={item}
      claimed={true}
    />
  );
};

  return (
    <Screen>
      <FlatList
        data={collectedRewards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={[style.scrollContainer, listEmpty && style.scrollContainerFlexible]}
      />
    </Screen>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
  },
  scrollContainerFlexible: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClaimedRewardsScreen;
