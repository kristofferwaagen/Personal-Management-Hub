// EXPENSES
export const loadExpenses = () => {
  return JSON.parse(localStorage.getItem("expenses")) || [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// BUDGET
export const loadBudget = () => {
  return Number(localStorage.getItem("budget")) || 0;
};

export const saveBudget = (budget) => {
  localStorage.setItem("budget", budget);
};

// CURRENCY
export const loadCurrency = () => {
  return localStorage.getItem("currency") || "NOK";
};

export const saveCurrency = (currency) => {
  localStorage.setItem("currency", currency);
};
