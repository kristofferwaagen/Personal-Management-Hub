import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { loadExpenses, loadCurrency } from "../utils/storage";
import "../styles/components/CategoryPieChart.scss";

const COLORS = ["#A4C3B2", "#E6B8A2", "#A2D2FF", "#F6EEE0", "#C0B9DD"];
const CATEGORIES = ["Groceries", "Housing", "Transport", "Leisure", "Other"];

const CategoryPieChart = () => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("NOK");

  useEffect(() => {
    const expenses = loadExpenses();
    const currencyVal = loadCurrency();

    const grouped = CATEGORIES.map((cat) => {
      const total = expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);
      return { name: cat, value: total };
    });

    setData(grouped);
    setCurrency(currencyVal);
  }, []);

  return (
    <div className="category-pie-card">
      <h2>Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} ${currency}`, "Spent"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
