import { Grid } from "@mui/material";
import React from "react";
import "../styles/main.css";

const Main = () => {
  return (
    <Grid container spacing={2}>
      <Grid item size={{ xs: 12, md: 9 }}>
        <h3>Recent Transactions</h3>
        <div className="transaction-container">No transactions!</div>
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
