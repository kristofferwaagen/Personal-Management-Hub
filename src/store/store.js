import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import budgetReducer from "./slices/budgetSlice";
import currencyReducer from "./slices/currencySlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    budget: budgetReducer,
    currency: currencyReducer,
  },
});

export default store;
