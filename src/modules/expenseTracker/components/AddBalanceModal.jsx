import { useContext, useState } from "react";
import Modal from "react-modal";
import ExpenseTrackerContext from "../store/context";
import "../styles/modal.css";

Modal.setAppElement("#root");

const AddBalanceModal = ({ isOpen, closeModel }) => {
  const [amount, setAmount] = useState("");
  const { walletStore, setWalletStore } = useContext(ExpenseTrackerContext);

  const handleAddBalance = () => {
    setWalletStore({
      ...walletStore,
      walletBalance: +amount + +walletStore.walletBalance,
    });
    closeModel();
    setAmount("");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModel}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Balance</h2>
        <div className="content">
          <input
            type="number"
            placeholder="Income Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={handleAddBalance}
            className="primary-button"
            type="submit"
          >
            Add Balance
          </button>

          <button onClick={closeModel}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default AddBalanceModal;
