import { useContext } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './Charts.css';
import ExpenseContext from '../contexts/ExpenseContext';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Charts = () => {
  const { filteredExpenses, filterMonth, filterYear } = useContext(ExpenseContext);

  // Pie chart data: group by category
  const categoryData = filteredExpenses.reduce((acc, exp) => {
    const cat = acc.find((c) => c.name === exp.category);
    if (cat) {
      cat.value += exp.amount;
    } else {
      acc.push({ name: exp.category, value: exp.amount });
    }
    return acc;
  }, []);

  // Bar chart data: monthly if 'all', daily if specific month
  let barData = [];
  if (filterMonth === 'all') {
    barData = [...Array(12)].map((_, i) => ({
      name: `Month ${i + 1}`,
      amount: filteredExpenses
        .filter((e) => new Date(e.date).getMonth() + 1 === i + 1)
        .reduce((sum, e) => sum + e.amount, 0),
    }));
  } else {
    const daysInMonth = new Date(filterYear, Number(filterMonth), 0).getDate();
    barData = [...Array(daysInMonth)].map((_, i) => ({
      name: `Day ${i + 1}`,
      amount: filteredExpenses
        .filter((e) => new Date(e.date).getDate() === i + 1)
        .reduce((sum, e) => sum + e.amount, 0),
    }));
  }
  // Filter out zero amounts for cleaner chart
  barData = barData.filter((d) => d.amount > 0);

  return (
    <div className="charts">
      <h2>Spending Breakdown</h2>
      <div className="chart-container">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="chart-container">
        <BarChart width={600} height={400} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;