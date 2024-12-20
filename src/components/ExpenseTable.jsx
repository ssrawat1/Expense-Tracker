import { useState } from 'react';
import useFilter from '../hooks/useFilter';
import ContextMenu from './ContextMenu';

const ExpenseTable = ({ expense, setExpense, setExpenseItem, setEditingRowId, editingRowId }) => {
  const [sortCallback, setsortCallback] = useState(() => () => {});
  /* callback because it wll set the return value of the function */
  const [rowId, setRowId] = useState('');
  const [menuPosition, setMenuPosition] = useState({});
  const totalAmount = expense
    .reduce((prevItem, currItem) => prevItem + currItem.amount, 0)
    .toFixed(2);

  const [filteredData, setQuery, query] = useFilter(expense, (expense) => expense.category);
  console.log(query);
  console.log(expense);

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        filteredData={filteredData}
        setMenuPosition={setMenuPosition}
        setExpense={setExpense}
        rowId={rowId}
        expense={expense}
        setExpenseItem={setExpenseItem}
        setEditingRowId={setEditingRowId}
      />
      <table
        className="expense-table"
        onClick={() => {
          if (menuPosition.left) setMenuPosition({});
        }}
      >
        <thead>
          <tr>
            <th className="amount-column">
              <div className="amount-container">
                <span>Title</span>
                <div>
                  <div
                    className="up-arrow"
                    title="Sort by Ascending"
                    onClick={() =>
                      setsortCallback(() => (a, b) => a.title.localeCompare(b.title))
                    } /* usecallback becuz if we directly set the fucntiion then it will set the return value of fn. */
                  ></div>
                  <div
                    className="down-arrow"
                    title="Sort by Descending"
                    onClick={() => setsortCallback(() => (a, b) => b.title.localeCompare(a.title))}
                  ></div>
                </div>
              </div>
            </th>

            <th>
              <select value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
              </select>
            </th>
            <th className="amount-column">
              <div className="amount-container">
                <span>Amount</span>
                <div>
                  <div
                    className="up-arrow"
                    title="Sort by Ascending"
                    onClick={() =>
                      setsortCallback(() => (a, b) => a.amount - b.amount)
                    } /* usecallback becuz if we directly set the fucntiion then it will set the return value of fn. */
                  ></div>
                  <div
                    className="down-arrow"
                    title="Sort by Descending"
                    onClick={() => setsortCallback(() => (a, b) => b.amount - a.amount)}
                  ></div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 &&
            filteredData.sort(sortCallback).map(({ id, title, category, amount }) => (
              <tr
                key={id}
                title="Double-Click to Add/Delete Expense"
                className={id === editingRowId ? 'editing-row' : ''}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                  setRowId(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount.toFixed(2).toLocaleString('en-in')}</td>
              </tr>
            ))}
          {expense.length && (
            <tr>
              <th>TOTAL</th>
              <th className="sort-btn" onClick={() => setsortCallback(() => () => {})}>
                Clear Sort
              </th>
              <th>₹{totalAmount.toLocaleString('en-in')}</th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTable;
