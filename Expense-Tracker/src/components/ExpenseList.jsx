import { useContext } from 'react';
import './ExpenseList.css';
import ExpenseContext from '../contexts/ExpenseContext';

const ExpenseList = () => {
  const { filteredExpenses, deleteExpense, editExpense } = useContext(ExpenseContext);

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.description}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
                <td>
                  <button onClick={() => editExpense(exp)}>Edit</button>
                  <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;