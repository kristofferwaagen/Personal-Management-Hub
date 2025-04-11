import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#A1C6A5", "#F7D59C", "#9EADC8", "#F6B3A2", "#DDD3C4"];

const CategoryPieChart = () => {
  const expenses = useSelector((state) => state.expenses);
  const currency = useSelector((state) => state.currency);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} ${currency}`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
