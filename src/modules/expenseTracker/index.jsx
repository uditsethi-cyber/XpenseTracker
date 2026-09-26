import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExpenseTrackerContext from "./store/context";
import Main from "./components/Main";
import { Box } from "@mui/material";

const ExpenseTracker = () => {
  const initialWalletStore = {
    walletBalance: 5000,
    expenses: 0,
  };
  const [walletStore, setWalletStore] = useState(initialWalletStore);
  return (
    <ExpenseTrackerContext.Provider
      value={{
        walletStore,
        setWalletStore,
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
      </Box>
    </ExpenseTrackerContext.Provider>
  );
};

export default ExpenseTracker;
