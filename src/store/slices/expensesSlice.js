import { createSlice } from "@reduxjs/toolkit";
import { loadExpenses } from "../../utils/storage";

const initialState = loadExpenses();

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action) {
      const newState = [...state, action.payload];
      localStorage.setItem("expenses", JSON.stringify(newState));
      return newState;
    },
    removeExpense(state, action) {
      const newState = state.filter((e) => e.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(newState));
      return newState;
    },
    setExpenses(_, action) {
      localStorage.setItem("expenses", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { addExpense, removeExpense, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
