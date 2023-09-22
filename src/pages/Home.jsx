import React, { useEffect } from "react";
import TransactionForm from "./TransactionForm";
import { useCollection } from "../hook/useCollection";

const Home = () => {
  const { data } = useCollection("books"); //zwracam tylko data, funkcji nie potrzebuje do otrzymania danych

  return (
    <div>
      <TransactionForm />
      {data.map((doc) => (
        <p key={doc.id}>{doc.title}</p>
      ))}
    </div>
  );
};

export default Home;
