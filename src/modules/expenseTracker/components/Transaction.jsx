import { lightGreen } from "@mui/material/colors";
import { PiPizza } from "react-icons/pi";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FaPencil } from "react-icons/fa6";
import { useContext } from "react";
import ExpenseTrackerContext from "../store/context";

const Transaction = ({ expense, index }) => {
  const {
    walletStore,
    setWalletStore,
    expenseList,
    setExpenseList,
    setIsExpenseModelOpen,
    handleEditExpense,
  } = useContext(ExpenseTrackerContext);
  const handleDeleteExpense = (expense) => {
    const newList = [];
    let deleted = false;
    for (let i = 0; i < expenseList.length; i++) {
      if (
        expense?.category !== expenseList[i].category ||
        expense?.title !== expenseList[i].title ||
        expense?.price !== expenseList[i].price ||
        expense?.date !== expenseList[i].date ||
        deleted
      ) {
        newList.push(expense);
      } else {
        deleted = true;
        setWalletStore({
          ...walletStore,
          walletBalance: +walletStore?.walletBalance + +expense?.price,
          expenses: Number(walletStore?.expenses) - Number(expense?.price),
        });
      }
    }
    setExpenseList(newList);
  };
  const handleEdit = (expense) => {
    handleEditExpense(expense, index);
    setIsExpenseModelOpen(true);
  };
  return (
    <div className="transaction-container">
      <div className="item">
        <span>
          {expense?.category === "Food" ? (
            <PiPizza />
          ) : expense?.category === "Entertainment" ? (
            <MdOutlineLiveTv />
          ) : (
            <FaCar />
          )}
        </span>
        <div className="item-details">
          <span>{expense?.title}</span>
          <span
            style={{
              color: lightGreen,
            }}
          >
            {expense?.date}
          </span>
        </div>
      </div>
      <div className="action">
        <span>{"₹" + expense?.price}</span>
        <span onClick={() => handleDeleteExpense(expense)}>
          <RxCrossCircled />
        </span>
        <span onClick={() => handleEdit(expense)}>
          <FaPencil />
        </span>
      </div>
    </div>
  );
};

export default Transaction;
