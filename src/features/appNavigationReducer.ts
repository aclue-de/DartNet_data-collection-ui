import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppNavigationState = "init" | "labelling" | "collection"

export const { reducer: appNavigationStateReducer, actions: appNavigationStateActions } =
  createSlice({
    name: "labellingNavigationState",
    initialState: "init" as AppNavigationState,
    reducers: {
      setState: (state, action: PayloadAction<AppNavigationState>) => {
        if (state !== action.payload) {
            return action.payload
        }
        return state;
      },
    }
  });
