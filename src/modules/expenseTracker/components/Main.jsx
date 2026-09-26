import { Grid } from "@mui/material";
import React, { useContext } from "react";
import "../styles/main.css";
import ExpenseTrackerContext from "../store/context";
import Transaction from "./transaction";

const Main = () => {
  const { expenseList } = useContext(ExpenseTrackerContext);
  console.log(expenseList);
  return (
    <Grid container spacing={2}>
      <Grid item size={{ xs: 12, md: 9 }}>
        <h3>Recent Transactions</h3>
        <div className="transaction-parent-container">
          {!expenseList?.length ? (
            <span>No transactions!</span>
          ) : (
            <>
              {expenseList?.map((expense) => (
                <Transaction key={expense?.date} expense={expense} />
              ))}
            </>
          )}
        </div>
      </Grid>
      <Grid item size={{ xs: 12, md: 3 }}>
        <h3>Top Expenses</h3>
        <div className="expense-container">
          <div>Food: </div>
          <div>Entertainment: </div>
          <div>Travel: </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;
