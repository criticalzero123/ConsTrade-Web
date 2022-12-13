import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiH1 } from "react-icons/ri";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get("/api/transactions/getAllTransactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="z-50 w-full h-screen absolute top-0 bg-white">
      {transactions.length !== 0 ? (
        <>
          <h3 className="text-2xl text-center">
            Total Transactions: <strong>{transactions.length}</strong>
          </h3>
          <ol className="list-inside list-decimal">
            {transactions.map((transaction, index) => (
              <li key={index}>
                <span className="text-sm text-gray-500 mr-2 ">
                  ({transaction.product.preferTrade})
                </span>
                {transaction.sellerName} {" -> "} {transaction.buyerName}
                <span className="text-sm text-gray-500 ml-2 ">
                  || {transaction.product.title}
                </span>
                <span className="text-sm text-gray-500 ml-2 ">
                  || Get Wanted: {transaction.getWanted}
                </span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Transactions;
