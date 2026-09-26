import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Sector,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#A000FF", "#FFA500", "#FFD700"];

const renderShape = (props) => {
  const { index, ...rest } = props;

  return <Sector {...rest} fill={COLORS[index % COLORS.length]} />;
};

export default function ExpensePieChart({ isAnimationActive = true, data }) {
  const chartData = data.map((item) => ({
    ...item,
    price: Number(item.price),
  }));

  const legendPayload = chartData.map((item, index) => ({
    value: item.category,
    type: "square",
    color: COLORS[index % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="price"
          nameKey="category"
          cx="50%"
          cy="40%"
          outerRadius={100}
          shape={renderShape}
          isAnimationActive={isAnimationActive}
        />

        <Tooltip formatter={(value) => [`₹${value}`, "Expense"]} />

        <Legend payload={legendPayload} verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}
