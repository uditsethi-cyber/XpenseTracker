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
  const [walletStore, setWalletStore] = useState(() => {
    const localStorageWallet = localStorage.getItem("walletStore");

    if (localStorageWallet) {
      return JSON.parse(localStorageWallet);
    }

    return initialWalletStore;
  });
  const initialEditExpense = {
    title: "",
    price: "",
    category: "",
    date: "",
  };
  const editExpense = useRef(initialEditExpense);
  const editIndex = useRef();
  const [expenseMap, setExpenseMap] = useState([]);
  const [expenseList, setExpenseList] = useState(() => {
    const localStorageExpenseList = localStorage.getItem("expenseList");

    if (localStorageExpenseList) {
      return JSON.parse(localStorageExpenseList);
    }

    return [];
  });
  const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false);
  useEffect(() => {
    if (!isExpenseModelOpen) {
      editExpense.current = initialEditExpense;
    }
  }, [isExpenseModelOpen]);

  const handleEditExpense = (expense, index) => {
    editExpense.current = expense;
    editIndex.current = index;
  };

  useEffect(() => {
    localStorage.setItem("walletStore", JSON.stringify(walletStore));
    localStorage.setItem("expenses", JSON.stringify(walletStore?.expenses));
    localStorage.setItem("balance", JSON.stringify(walletStore?.walletBalance));
  }, [walletStore]);
  useEffect(() => {
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
    const expMap = {
      Food: 0,
      Travel: 0,
      Entertainment: 0,
    };
    expenseList?.forEach((expense) => {
      expMap[expense?.category] += expense?.price;
    });
    const expMapArr = [];
    for (let [key, val] of Object.entries(expMap)) {
      expMapArr.push({
        category: key,
        price: val,
      });
    }
    setExpenseMap(expMapArr);
  }, [expenseList]);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        walletStore,
        setWalletStore,
        expenseList,
        setExpenseList,
        setIsExpenseModelOpen,
        handleEditExpense,
        expenseMap,
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
          editIndexRef={editIndex}
        />
      </Box>
    </ExpenseTrackerContext.Provider>
  );
};

export default ExpenseTracker;
