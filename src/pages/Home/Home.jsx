import React, { useEffect } from "react";
import TransactionForm from "../TransactionForm/TransactionForm";
import { useCollection } from "../../hook/useCollection";
import { useFirestore } from "../../hook/useFirestore";

const Home = () => {
  const { data } = useCollection("books"); //zwracam tylko data, funkcji nie potrzebuje do otrzymania danych
  const { deleteDocument } = useFirestore();

  const handleDelete = (id) => {
    deleteDocument(id);
  };

  return (
    <div>
      <TransactionForm />
      {data.map((doc) => (
        <p key={doc.id}>
          {doc.title}
          {doc.name}
          <button onClick={() => handleDelete(doc.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Home;
