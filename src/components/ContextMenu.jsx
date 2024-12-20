import React from "react";

const ContextMenu = ({
  menuPosition,
  rowId,
  setMenuPosition,
  setExpense,
  setExpenseItem,
  expense,
  setEditingRowId,
}) => {
  if (!menuPosition.left || !menuPosition.top) return;
  const editItem = expense?.find((item) => item.id == rowId);
  const { title, category, amount } = editItem;
  return (
    <div className="context-menu" style={menuPosition}>
      <div
        className="edit-btn"
        onClick={(e) => {
          e.preventDefault();
          setExpenseItem({ title, category, amount });
          setEditingRowId(rowId);
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        className="delete-btn"
        onClick={(e) => {
          e.preventDefault();
          setMenuPosition({});
          setExpense((prevState) => prevState.filter((expenseItem) => expenseItem.id !== rowId));
        }}
      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
