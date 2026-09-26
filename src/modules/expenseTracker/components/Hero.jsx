import React, { useContext } from "react";
import styles from "../styles/hero.module.css";
import Grid from "@mui/material/Grid";
import Card from "./Card";
import ExpenseTrackerContext from "../store/context";

const Hero = () => {
  const { walletStore } = useContext(ExpenseTrackerContext);
  const incomeHandler = () => {};
  return (
    <div className={styles.hero}>
      <Grid container size={12} spacing={2}>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Card
            maintitle="Wallet Balance: "
            buttontitle="+ Add Income"
            amount={walletStore?.walletBalance}
            incomeHandler={() => incomeHandler()}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Card
            maintitle="Expenses: "
            buttontitle="+ Add Expense"
            amount={walletStore?.expenses}
            incomeHandler={() => incomeHandler()}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}></Grid>
      </Grid>
    </div>
  );
};

export default Hero;
