import { useContext } from 'react';
import './Filter.css';
import ExpenseContext from '../contexts/ExpenseContext';

const Filter = () => {
  const { years, filterYear, setFilterYear, filterMonth, setFilterMonth } = useContext(ExpenseContext);

  return (
    <div className="filter">
      <label>Year: </label>
      <select value={filterYear} onChange={(e) => setFilterYear(Number(e.target.value))}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <label>Month: </label>
      <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
        <option value="all">All</option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;