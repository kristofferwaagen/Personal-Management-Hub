import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import "../styles/components/SpendingLineGraph.scss";

const DAYS = 30;

const generateDateArray = () => {
  const dates = [];
  const today = new Date();
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const SpendingLineGraph = () => {
  const expenses = useSelector((state) => state.expenses);
  const budget = useSelector((state) => state.budget);
  const currency = useSelector((state) => state.currency);

  const dates = generateDateArray();
  const dailyBudget = budget / DAYS;

  const cumulativeSpend = {};
  let runningTotal = 0;

  dates.forEach((date) => {
    const dayExpenses = expenses.filter((e) => e.date === date);
    const dayTotal = dayExpenses.reduce((sum, e) => sum + e.amount, 0);
    runningTotal += dayTotal;
    cumulativeSpend[date] = runningTotal;
  });

  const data = dates.map((date, index) => ({
    date,
    spent: cumulativeSpend[date] || 0,
    budget: dailyBudget * (index + 1),
  }));

  return (
    <div className="spending-graph">
      <h2>Spending vs. Budget (Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip formatter={(value) => `${value} ${currency}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="spent"
            stroke="#2B3937"
            name="Actual Spending"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="#A2D2FF"
            name="Budget Pace"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingLineGraph;
