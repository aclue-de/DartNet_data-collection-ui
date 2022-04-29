import { createSlice } from "@reduxjs/toolkit";

export enum LabellingNavigationState {
  Init
}

export const { reducer: labellingNavigationStateReducer, actions: labellingNavigationStateActions } =
  createSlice({
    name: "labellingNavigationState",
    initialState: LabellingNavigationState.Init,
    reducers: {
      nextState: (state) => {
        const next = state + 1;
        if (Object.values(LabellingNavigationState).includes(next)) {
          return next;
        }
        return state;
      },
      previousState: (state) => {
        const previous = state - 1;
        if (Object.values(LabellingNavigationState).includes(previous)) {
          return previous;
        }
        return state;
      },
      resetState: (_) => {
        return LabellingNavigationState.Init;
      },
    }
  });
