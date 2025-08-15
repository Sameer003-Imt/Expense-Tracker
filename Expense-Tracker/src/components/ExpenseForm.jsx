import { useContext, useEffect, useState } from 'react';
import './ExpenseForm.css';
import ExpenseContext from '../contexts/ExpenseContext';

const ExpenseForm = () => {
  const { addExpense, updateExpense, currentExpense, categories } = useContext(ExpenseContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (currentExpense) {
      setDescription(currentExpense.description);
      setAmount(currentExpense.amount);
      setCategory(currentExpense.category);
      setDate(currentExpense.date);
    } else {
      setDescription('');
      setAmount('');
      setCategory(categories[0]);
      setDate('');
    }
  }, [currentExpense, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { description, amount: Number(amount), category, date };
    if (currentExpense) {
      expense.id = currentExpense.id;
      updateExpense(expense);
    } else {
      addExpense(expense);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">{currentExpense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
};

export default ExpenseForm;