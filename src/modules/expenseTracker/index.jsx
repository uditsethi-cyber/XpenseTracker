import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExpenseTrackerContext from "./store/context";
import Main from "./components/Main";
import { Box } from "@mui/material";
import ExpenseModal from "./components/ExpenseModal";

const ExpenseTracker = () => {
  const initialWalletStore = {
    walletBalance: 5000,
    expenses: 0,
  };
  const [walletStore, setWalletStore] = useState(initialWalletStore);
  const initialEditExpense = {
    title: "",
    price: "",
    category: "",
    date: "",
  };
  const editExpense = useRef(initialEditExpense);
  const [expenseList, setExpenseList] = useState([]);
  const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false);
  useEffect(() => {
    if (!isExpenseModelOpen) {
      console.log("Here", initialEditExpense);
      editExpense.current = initialEditExpense;
    }
  }, [isExpenseModelOpen]);

  const handleEditExpense = (expense) => {
    editExpense.current = expense;
  };

  return (
    <ExpenseTrackerContext.Provider
      value={{
        walletStore,
        setWalletStore,
        expenseList,
        setExpenseList,
        setIsExpenseModelOpen,
        handleEditExpense,
      }}
    >
      <Box
        sx={{
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Hero />
        <Main />
        <ExpenseModal
          isOpen={isExpenseModelOpen}
          closeModel={() => setIsExpenseModelOpen(false)}
          editDataRef={editExpense}
        />
      </Box>
    </ExpenseTrackerContext.Provider>
  );
};

export default ExpenseTracker;
