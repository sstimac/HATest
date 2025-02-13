import { configureStore, Reducer, UnknownAction, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REWARDS_LOADED_ACTION, REWARDS_LOADED_NEXT_ACTION, REWARDS_LOADING_ACTION, COLLECT_REWARD } from './actionTypes';
import { Reward, Rewards } from '../types';

export interface RewardsState extends Rewards {
  loading: boolean;
}

interface RewardsDataAction {
  type: string;
  payload: Rewards;
}

interface RewardsLoadingAction {
  type: string;
  payload: boolean;
}

type RewardActions = RewardsDataAction | UnknownAction | RewardsLoadingAction;

interface CollectRewardAction {
  type: string
  payload: Reward
}

type CollectRewardActions = CollectRewardAction | UnknownAction;

const initialRewardsState: RewardsState = {
  count: 0,
  next: null,
  previous: null,
  loading: false,
  results: [],
};

const rewards: Reducer<RewardsState, RewardActions> = (state: RewardsState = initialRewardsState, action: RewardActions) => {
  switch (action.type) {
    case REWARDS_LOADED_ACTION:
      return { ...(action as RewardsDataAction).payload, loading: false };
    case REWARDS_LOADED_NEXT_ACTION:
      return {
        count: (action as RewardsDataAction).payload.count,
        next: (action as RewardsDataAction).payload.next,
        previous: (action as RewardsDataAction).payload.previous,
        results: [...state.results, ...(action as RewardsDataAction).payload.results],
        loading: false,
      };
    case REWARDS_LOADING_ACTION:
      return {
        ...state,
        loading: (action as RewardsLoadingAction).payload,
      };
    default:
      return state;
  }
};

// In real life, this reducer would only store the collected reward IDs
// Later on, resolve the reward data via selector / or fetch singular item
const collectedRewards: Reducer<Reward[], CollectRewardActions> = (state: Reward[] = [], action: CollectRewardActions) => {
  switch (action.type) {
    case COLLECT_REWARD:
      return [...state, (action as CollectRewardAction).payload];
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['collectedRewards'],
};
const rootReducer = combineReducers({
  rewards,
  collectedRewards,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store as any);

// Inferred global types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
