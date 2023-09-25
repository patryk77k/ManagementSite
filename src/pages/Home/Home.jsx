import { useCollection } from "../../hook/useCollection";
import { useAuthContext } from "../../hook/useAuthContext";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const Home = () => {
  const { user } = useAuthContext();
  const { documents } = useCollection("transactions", ["uid", "==", user.uid]);
  console.log(documents);
  return (
    <div className="container">
      <div className="content">
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className="sidebar">
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
