import { useState } from "react";
import TitleField from "./TitleField";
import AmountField from "./AmountField";
import SelectField from "./SelectField";

const ExpenseForm = ({expenseItem,setExpenseItem,editingRowId,setEditingRowId,setExpense,}) => {
  const [error, setError] = useState("");

  const validateConfig = {
    title: [
      { required: true, message: "Please enter a title" },
      { minLength: 2, message: "Min 2 characters for title." },
    ],
    category: [{ required: true, message: "Please enter a category" }],
    amount: [{ required: true, message: "Please enter a amount" }],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const capitalizeTitle = (string) => {
    return string
      .split(/\s+/)
      .filter((word) => word !== " ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const validateFields = () => {
    let validationError = "";
    const titleRegex = /^[A-Za-z0-9\s,-]+$/;
    Object.entries(expenseItem).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          validationError = rule.message;
          return true;
        } else if (rule.minLength && value.length < rule.minLength) {
          validationError = rule.message;
          return true;
        } else if (key === "title" && !titleRegex.test(value)) {
          validationError = "Title can only contain letters, numbers, commas, and hyphens.";
          return true;
        } else if (key === "amount" && (isNaN(value) || +value <= 0)) {
          validationError = "Amount must be positive Number.";
          return true;
        }
        return false;
      });
    });

    return validationError;
  };

  /* Add Transactions: */

  const addTransaction = (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const { amount, category, title } = expenseItem;
    if (editingRowId) {
      setExpense((prevExpense) =>
        prevExpense.map((prevExpense) =>
          prevExpense.id === editingRowId
            ? { ...prevExpense, title: capitalizeTitle(title), category, amount: +amount }
            : prevExpense
        )
      );
      setExpenseItem({ amount: "", title: "", category: "" });
      setEditingRowId("");
      return;
    }

    setExpense((prevExpense) => [
      ...prevExpense,
      { id: crypto.randomUUID(), title: capitalizeTitle(title), category, amount: +amount },
    ]);
    setExpenseItem({ amount: "", title: "", category: "" });
  };

  return (
    <form className="expense-form" onSubmit={addTransaction}>
      <TitleField
        id="title"
        name="title"
        value={expenseItem.title}
        onChange={handleChange}
        label="Title"
      />
      <SelectField
        id="category"
        name="category"
        value={expenseItem.category}
        onChange={handleChange}
        label="Category"
        defaultOption="Select Category"
        options={["Grocery", "Shopping", "Bills", "Education", "Health"]}
      />
      <AmountField label="Amount" id="amount" value={expenseItem.amount} onChange={handleChange} />
      <button type="submit" className={editingRowId ? "save-btn" : "add-btn"}>
        {editingRowId ? "Save" : "Add"}
      </button>
      {error && <h3 className="error-message">{error}</h3>}
    </form>
  );
};

export default ExpenseForm;
