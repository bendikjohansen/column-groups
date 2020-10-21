import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

export interface DataItem {
  id: string;
  name: string;
}

export type DataObjectType = {
  city: string;
  machines: DataItem[];
 };

interface DataType {
  list: DataObjectType[];
}

const initialState: DataType = {
  list: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, { payload }: PayloadAction<DataObjectType[]>) => {
      state.list = payload;
    }
  },
});

export const fetchData = (): AppThunk => async (dispatch) => {
  const url = 'https://kroppsanalyse-api.azurewebsites.net/api/ordertest/getall';
  const response = await fetch(url);
  const data = await response.json();


  const createAction = dataSlice.actions.setData;
  dispatch(createAction(data));
}

export const selectDataList = (state: RootState) => state.data.list;

export default dataSlice.reducer;
