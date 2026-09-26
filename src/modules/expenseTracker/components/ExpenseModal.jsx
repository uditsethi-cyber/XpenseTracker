import { useContext, useState } from "react";
import Modal from "react-modal";
import ExpenseTrackerContext from "../store/context";
import "../styles/modal.css";
import { Grid } from "@mui/material";
Modal.setAppElement("#root");
import { useSnackbar } from "notistack";

const ExpenseModal = ({ isOpen, closeModel }) => {
  const initialEntryObject = {
    title: "",
    price: "",
    category: "",
    date: "",
  };
  const [expenseEntry, setExpanseEntry] = useState(initialEntryObject);
  const { walletStore, setWalletStore } = useContext(ExpenseTrackerContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setExpanseEntry({ ...expenseEntry, [name]: val });
  };

  const handleExpense = () => {
    const newAvailBal = +walletStore.walletBalance - expenseEntry?.price;
    if (
      !expenseEntry?.price ||
      !expenseEntry?.title ||
      !expenseEntry?.category ||
      !expenseEntry?.date
    ) {
      enqueueSnackbar("Please Fill All the fields", {
        variant: "error",
      });
      return;
    } else if (newAvailBal < 0) {
      enqueueSnackbar("Available Balance is not enough", {
        variant: "error",
      });
      return;
    }
    setWalletStore({
      ...walletStore,
      walletBalance: +walletStore.walletBalance - expenseEntry?.price,
    });
    closeModel();
    setExpanseEntry(initialEntryObject);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModel}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Expenses</h2>

        <Grid container size={12} spacing={2} className="content">
          <Grid item size={{ xs: 12, md: 6 }}>
            <input
              type="text"
              placeholder="Title"
              value={expenseEntry?.title}
              onChange={(e) => handleInputChange(e)}
              name="title"
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <input
              type="number"
              placeholder="Price"
              value={expenseEntry?.price}
              onChange={(e) => handleInputChange(e)}
              name="price"
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <select
              value={expenseEntry?.category}
              onChange={(e) => handleInputChange(e)}
              name="category"
            >
              <option value={""}>Select category</option>
              <option value={"Food"}>Food</option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Travel"}>Travel</option>
            </select>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <input
              type="date"
              value={expenseEntry?.date}
              onChange={(e) => handleInputChange(e)}
              name="date"
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <button
              onClick={handleExpense}
              className="primary-button"
              type="submit"
              style={{
                width: "100%",
              }}
            >
              Add Expense
            </button>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <button onClick={closeModel}>Cancel</button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default ExpenseModal;
