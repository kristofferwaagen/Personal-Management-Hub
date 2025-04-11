import { useSelector } from "react-redux";
import "../styles/components/BudgetSummaryCard.scss";

const BudgetSummaryCard = () => {
  const budget = useSelector((state) => state.budget);
  const expenses = useSelector((state) => state.expenses);
  const currency = useSelector((state) => state.currency);

  const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = Math.max(0, budget - spent);
  const percentUsed =
    budget > 0 ? Math.min((spent / budget) * 100, 100).toFixed(1) : 0;

  return (
    <div className="budget-card">
      <h2>Budget Summary</h2>
      <ul>
        <li>
          <span>Budget:</span> {budget} {currency}
        </li>
        <li>
          <span>Spent:</span> {spent} {currency}
        </li>
        <li>
          <span>Remaining:</span> {remaining} {currency}
        </li>
        <li>
          <span>% Used:</span> {percentUsed}%
        </li>
      </ul>
      <div className="progress-bar">
        <div className="fill" style={{ width: `${percentUsed}%` }}>
          {percentUsed}%
        </div>
      </div>
    </div>
  );
};

export default BudgetSummaryCard;
