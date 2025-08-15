import { ExpenseProvider } from './contexts/ExpenseContext';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';
import Charts from './components/Charts';

function App() {
  return (
    <ExpenseProvider>
      <div className="app">
        <h1>Expense Tracker</h1>
        <Filter />
        <ExpenseForm />
        <ExpenseList />
        <Charts />
      </div>
    </ExpenseProvider>
  );
}

export default App;