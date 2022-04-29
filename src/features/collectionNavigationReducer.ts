import { createSlice } from "@reduxjs/toolkit";

export enum CollectionNavigationState {
  Init,
  NewThrow,
  ConfirmNewThrow,
}

export const { reducer: collectionNavigationStateReducer, actions: collectionNavigationStateActions } =
  createSlice({
    name: "collectionNavigationpState",
    initialState: CollectionNavigationState.Init,
    reducers: {
      nextState: (state) => {
        const next = state + 1;
        if (Object.values(CollectionNavigationState).includes(next)) {
          return next;
        }
        return state;
      },
      previousState: (state) => {
        const previous = state - 1;
        if (Object.values(CollectionNavigationState).includes(previous)) {
          return previous;
        }
        return state;
      },
      resetState: (_) => {
        return CollectionNavigationState.Init;
      },
    }
  });
