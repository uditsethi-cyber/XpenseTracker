import { useContext, useState } from "react";
import styles from "../styles/hero.module.css";
import Grid from "@mui/material/Grid";
import Card from "./Card";
import ExpenseTrackerContext from "../store/context";
import AddBalanceModal from "./AddBalanceModal";
import ExpenseModal from "./ExpenseModal";

const Hero = () => {
  const { walletStore } = useContext(ExpenseTrackerContext);
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);
  const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false);
  const incomeHandler = (action) => {
    if (action === "+") setIsAddModelOpen(true);
    else setIsExpenseModelOpen(true);
  };

  return (
    <div className={styles.hero}>
      <Grid container size={12} spacing={2}>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Card
            maintitle="Wallet Balance: "
            buttontitle="+ Add Income"
            amount={walletStore?.walletBalance}
            incomeHandler={() => incomeHandler("+")}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Card
            maintitle="Expenses: "
            buttontitle="+ Add Expense"
            amount={walletStore?.expenses}
            incomeHandler={() => incomeHandler("-")}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}></Grid>
      </Grid>
      <AddBalanceModal
        isOpen={isAddModelOpen}
        closeModel={() => setIsAddModelOpen(false)}
      />
      <ExpenseModal
        isOpen={isExpenseModelOpen}
        closeModel={() => setIsExpenseModelOpen(false)}
      />
    </div>
  );
};

export default Hero;
