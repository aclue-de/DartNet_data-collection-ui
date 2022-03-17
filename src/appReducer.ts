import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { appStateReducer } from "./features/appStateReducer";

export const appReducer = combineReducers({
  appState: appStateReducer,
});

export type AppReducerState = ReturnType<typeof appReducer>;

export const useAppSelector = <T>(fn: (state: AppReducerState) => T) =>
  useSelector<AppReducerState, T>(fn);
