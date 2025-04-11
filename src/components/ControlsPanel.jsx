import { useState } from "react";
import {
  loadExpenses,
  saveExpenses,
  loadBudget,
  saveBudget,
  loadCurrency,
  saveCurrency,
} from "../utils/storage";
import "../styles/components/ControlsPanel.scss";

const categories = ["Groceries", "Housing", "Transport", "Leisure", "Other"];
const currencies = ["NOK", "USD", "EUR"];

const ControlsPanel = ({ only = "all", onClose }) => {
  // Form states
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  // Budget + currency
  const [budget, setBudget] = useState(loadBudget());
  const [currency, setCurrency] = useState(loadCurrency());

  const handleAddExpense = () => {
    if (!amount || isNaN(amount)) return alert("Please enter a valid amount.");

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    const updated = [...loadExpenses(), newExpense];
    saveExpenses(updated);

    // Reset form
    setAmount("");
    setDescription("");
    setCategory("Groceries");
    setDate(new Date().toISOString().split("T")[0]);

    if (onClose) onClose(); // Close modal if provided
  };

  const handleRemoveExpense = (id) => {
    const updated = loadExpenses().filter((e) => e.id !== Number(id));
    saveExpenses(updated);
    alert("Expense removed");
  };

  const handleBudgetChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setBudget(value);
    saveBudget(value);
  };

  const handleCurrencyChange = (e) => {
    const value = e.target.value;
    setCurrency(value);
    saveCurrency(value);
  };

  return (
    <section className="controls-panel">
      {(only === "all" || only === "add") && (
        <>
          <h2>Add Expense</h2>
          <div className="form-group">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleAddExpense}>➕ Add</button>
          </div>
        </>
      )}

      {(!only || only === "remove") && (
        <>
          <h2>Remove Expense</h2>
          <select onChange={(e) => handleRemoveExpense(e.target.value)}>
            <option value="">Select an expense</option>
            {loadExpenses().map((expense) => (
              <option key={expense.id} value={expense.id}>
                {expense.description} - {expense.amount} {currency}
              </option>
            ))}
          </select>
        </>
      )}

      {(only === "all" || only === "budget") && (
        <>
          <h2>Budget</h2>
          <input type="number" value={budget} onChange={handleBudgetChange} />
        </>
      )}

      {(only === "all" || only === "currency") && (
        <>
          <h2>Currency</h2>
          <select value={currency} onChange={handleCurrencyChange}>
            {currencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </>
      )}
    </section>
  );
};

export default ControlsPanel;
