import { loadExpenses, saveExpenses } from "./storage";

export function injectMockExpensesIfEmpty() {
  const existing = loadExpenses();
  if (existing.length > 0) return;

  const mockExpenses = generateMockExpenses();
  saveExpenses(mockExpenses);
  console.log("💾 Mock expenses injected.");
}

function generateMockExpenses() {
  const categories = ["Groceries", "Housing", "Transport", "Leisure", "Other"];
  const today = new Date();
  const expenses = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const category = categories[i % categories.length];
    const amount = Math.floor(Math.random() * 200 + 30);
    const description = `${category} expense`;

    expenses.push({
      id: Date.now() + i,
      amount,
      category,
      description,
      date: date.toISOString().split("T")[0],
    });
  }

  return expenses;
}
