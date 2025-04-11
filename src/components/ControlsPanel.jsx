import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, removeExpense } from "../store/slices/expensesSlice";
import { setBudget } from "../store/slices/budgetSlice";
import { setCurrency } from "../store/slices/currencySlice";
import "../styles/components/ControlsPanel.scss";

const categories = ["Groceries", "Housing", "Transport", "Leisure", "Other"];
const currencies = ["NOK", "USD", "EUR"];

const ControlsPanel = ({ only = "all", onClose }) => {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses);
  const budget = useSelector((state) => state.budget);
  const currency = useSelector((state) => state.currency);

  // Form states
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const handleAddExpense = () => {
    if (!amount || isNaN(amount)) return alert("Please enter a valid amount.");

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    dispatch(addExpense(newExpense));

    // Reset form
    setAmount("");
    setDescription("");
    setCategory("Groceries");
    setDate(new Date().toISOString().split("T")[0]);

    if (onClose) onClose();
  };

  const handleRemoveExpense = (id) => {
    dispatch(removeExpense(Number(id)));
    if (onClose) onClose();
  };

  const handleBudgetChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch(setBudget(value));
  };

  const handleCurrencyChange = (e) => {
    dispatch(setCurrency(e.target.value));
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
            {expenses.map((expense) => (
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
