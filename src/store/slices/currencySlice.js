import { createSlice } from "@reduxjs/toolkit";
import { loadCurrency, saveCurrency } from "../../utils/storage";

const currencySlice = createSlice({
  name: "currency",
  initialState: loadCurrency(),
  reducers: {
    setCurrency(state, action) {
      saveCurrency(action.payload);
      return action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
