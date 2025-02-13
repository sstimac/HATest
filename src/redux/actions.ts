import { REWARDS_LOADED_ACTION, REWARDS_LOADING_ACTION, REWARDS_LOADED_NEXT_ACTION, COLLECT_REWARD } from './actionTypes';
import { AppDispatch, RootState } from './reducer';
import { api } from '../services';
import { getNextRewardsLink } from './selectors';
import { Reward, Rewards } from '../types';

export const setLoading = (loading: boolean) => {
  return {
    type: REWARDS_LOADING_ACTION,
    payload: loading,
  };
};

export const collectReward = (reward: Reward) => {
  return {
    type: COLLECT_REWARD,
    payload: reward,
  };
};

export const loadRewards = () => {
  return async (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(setLoading(true));

    try {
      const rewards: Rewards = await api.loadRewards();

      dispatch({
        type: REWARDS_LOADED_ACTION,
        payload: rewards,
      });
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };
};

export const loadNextRewards = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const state = getState();
      const nextLink = getNextRewardsLink(state);

      if (!nextLink) {
        return;
      }

      const nextRewards: Rewards = await api.loadNextRewards(nextLink);

      dispatch(setLoading(true));
      dispatch({
        type: REWARDS_LOADED_NEXT_ACTION,
        payload: nextRewards,
      });
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };
};
