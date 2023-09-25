import { useFirestore } from "../../hook/useFirestore";
import "./Home.css";

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore();

  return (
    <ul className="transactions">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className="name">{transaction.name}</p>
          <p className="amount">${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
