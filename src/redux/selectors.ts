import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducer';

const getRewardsState = (state: RootState) => state.rewards;

export const getRewards = createSelector(
  [getRewardsState],
  (rewardsState) => rewardsState.results
);

export const getNextRewardsLink = createSelector(
  [getRewardsState],
  (rewardsState) => rewardsState.next
);

export const getRewardsLoading = createSelector(
  [getRewardsState],
  (rewardsState) => rewardsState.loading
);

export const getCollectedRewards = (state: RootState) => state.collectedRewards;
