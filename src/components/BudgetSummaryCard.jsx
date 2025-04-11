import { useEffect, useState } from "react";
import { loadBudget, loadExpenses, loadCurrency } from "../utils/storage";
import "../styles/components/BudgetSummaryCard.scss";

const BudgetSummaryCard = () => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [currency, setCurrency] = useState("NOK");

  useEffect(() => {
    const budgetValue = loadBudget();
    const expenses = loadExpenses();
    const currencyValue = loadCurrency();

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setBudget(budgetValue);
    setSpent(totalSpent);
    setCurrency(currencyValue);
  }, []);

  const remaining = Math.max(0, budget - spent);
  const percentUsed = budget > 0 ? Math.min((spent / budget) * 100, 100).toFixed(1) : 0;

  return (
    <div className="budget-card">
      <h2>Budget Summary</h2>
      <ul>
        <li><span>Budget:</span> {budget} {currency}</li>
        <li><span>Spent:</span> {spent} {currency}</li>
        <li><span>Remaining:</span> {remaining} {currency}</li>
        <li><span>% Used:</span> {percentUsed}%</li>
      </ul>
      <div className="progress-bar">
        <div className="fill" style={{ width: `${percentUsed}%` }}>{percentUsed}%</div>
      </div>
    </div>
  );
};

export default BudgetSummaryCard;
