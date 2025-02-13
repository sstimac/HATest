import { useDispatch as useNativeDispatch, useSelector as useNativeSelector } from 'react-redux';
import type { AppDispatch, RootState } from './reducer';

export const useDispatch = useNativeDispatch.withTypes<AppDispatch>();
export const useSelector = useNativeSelector.withTypes<RootState>();
