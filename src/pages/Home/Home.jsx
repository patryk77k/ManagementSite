import { useCollection } from "../../hook/useCollection";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const Home = () => {
  const { documents } = useCollection("transactions");
  return (
    <div className="container">
      <div className="content">
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className="sidebar">
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
