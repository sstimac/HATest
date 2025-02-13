import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Screen, RewardListItem } from '../components';
import { loadRewards, useDispatch, getRewards, getRewardsLoading, loadNextRewards, collectReward, getCollectedRewards } from '../redux';
import { Reward } from '../types';

const RewardListScreen = () => {
  const dispatch = useDispatch();
  const rewards = useSelector(getRewards);
  const loading = useSelector(getRewardsLoading);
  const collectedRewards = useSelector(getCollectedRewards);

  useEffect(() => {
    dispatch(loadRewards());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(loadRewards());
  }, [dispatch]);

  const handleEndReached = useCallback(() => {
    dispatch(loadNextRewards());
  }, [dispatch]);

  const handleCollectPress = useCallback((item: Reward) => {
    dispatch(collectReward(item));
  }, [dispatch]);

  const renderItem = ({ item }: { item: Reward }) => {
    const isClaimed = !!collectedRewards.find((reward) => reward.id === item.id);

    return (
    <RewardListItem
      item={item}
      onCollect={handleCollectPress}
      claimed={isClaimed}
    />
  );
};

  return (
    <Screen>
      <FlatList
        data={rewards}
        onRefresh={handleRefresh}
        refreshing={loading}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        onEndReached={handleEndReached}
        contentContainerStyle={style.scrollContainer}
      />
    </Screen>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
  },
});

export default RewardListScreen;
