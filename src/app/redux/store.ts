import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
