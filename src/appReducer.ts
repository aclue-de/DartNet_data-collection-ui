import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { collectionNavigationStateReducer } from "./features/collectionNavigationReducer";
import { labellingNavigationStateReducer } from "./features/labellingNavigationReducer";
import { appNavigationStateReducer } from "./features/appNavigationReducer";
import { newThrowSlice } from "./features/newThrowReducer";
import { labelingApi } from "./features/labeling/labelingApiSlice";

export const appReducer = combineReducers({
  collectionNavigationState: collectionNavigationStateReducer,
  labellingNavigationState: labellingNavigationStateReducer,
  appNavigationState: appNavigationStateReducer,
  newThrowState: newThrowSlice.reducer,
  [labelingApi.reducerPath]: labelingApi.reducer,
});

export type AppReducerState = ReturnType<typeof appReducer>;

export const useAppSelector = <T>(fn: (state: AppReducerState) => T) =>
  useSelector<AppReducerState, T>(fn);
