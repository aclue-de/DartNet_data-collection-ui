import { createSlice } from "@reduxjs/toolkit";

export enum AppState {
  Init,
  NewThrow,
  ConfirmNewThrow,
}

export const { reducer: appStateReducer, actions: appStateActions } =
  createSlice({
    name: "appState",
    initialState: AppState.Init,
    reducers: {
      nextState: (state) => {
        const next = state + 1;
        if (Object.values(AppState).includes(next)) {
          return next;
        }
        return state;
      },
      previousState: (state) => {
        const previous = state - 1;
        if (Object.values(AppState).includes(previous)) {
          return previous;
        }
        return state;
      },
    }
  });
