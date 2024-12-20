import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import useLocalStorage from './hooks/useLocalStorage';
import expenseData from './components/expenseData';
import './app.css';

const App = () => {
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId', '');
  const [expenseItem, setExpenseItem] = useLocalStorage('expenseItem', {
    title: '',
    category: '',
    amount: '',
  });
  const [expense, setExpense] = useLocalStorage('expense', expenseData);

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            editingRowId={editingRowId}
            expense={expense}
            setExpense={setExpense}
            expenseItem={expenseItem}
            setEditingRowId={setEditingRowId}
            setExpenseItem={setExpenseItem}
          />
          {expense.length > 0 && (
            <ExpenseTable
              expense={expense}
              setExpense={setExpense}
              setExpenseItem={setExpenseItem}
              setEditingRowId={setEditingRowId}
              editingRowId={editingRowId}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default App;
