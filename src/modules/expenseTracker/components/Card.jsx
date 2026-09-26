import styles from "../styles/card.module.css";

const Card = ({ maintitle, buttontitle, amount, incomeHandler }) => {
  return (
    <div className={styles.card}>
      <span>
        {maintitle} <span className={styles.amount}>{amount}</span>
      </span>
      <button
        className={
          buttontitle === "+ Add Income" ? "primary-button" : "secondary-button"
        }
        onClick={incomeHandler}
      >
        {buttontitle}
      </button>
    </div>
  );
};

export default Card;
