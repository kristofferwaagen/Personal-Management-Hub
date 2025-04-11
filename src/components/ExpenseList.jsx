import { useEffect, useState } from "react";
import { loadExpenses, saveExpenses } from "../utils/storage";
import "../styles/components/ExpenseList.scss";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  const handleDelete = (id) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    saveExpenses(updated);
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>
                {expense.date} - {expense.description} - {expense.amount}{" "}
                {expense.category}
              </span>
              <button onClick={() => handleDelete(expense.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
