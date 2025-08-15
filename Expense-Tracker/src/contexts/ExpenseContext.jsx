import { createContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    expense.id = crypto.randomUUID();
    setExpenses([...expenses, expense]);
  };

  const updateExpense = (updated) => {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
    setCurrentExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const editExpense = (expense) => {
    setCurrentExpense(expense);
  };

  const filteredExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    const yMatch = d.getFullYear() === filterYear;
    const mMatch = filterMonth === 'all' || d.getMonth() + 1 === Number(filterMonth);
    return yMatch && mMatch;
  });

  const years = [
    ...new Set([new Date().getFullYear(), ...expenses.map((e) => new Date(e.date).getFullYear())]),
  ].sort();

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        editExpense,
        currentExpense,
        filterYear,
        setFilterYear,
        filterMonth,
        setFilterMonth,
        filteredExpenses,
        years,
        categories,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;