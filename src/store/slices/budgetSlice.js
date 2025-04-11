import { createSlice } from "@reduxjs/toolkit";
import { loadBudget } from "../../utils/storage";

const budgetSlice = createSlice({
  name: "budget",
  initialState: loadBudget(),
  reducers: {
    setBudget(_, action) {
      const newBudget = action.payload;
      localStorage.setItem("budget", newBudget);
      return newBudget;
    },
  },
});

export const { setBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
