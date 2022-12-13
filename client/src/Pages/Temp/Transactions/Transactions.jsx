import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

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
    <div className="z-50 w-full h-screen absolute top-0 bg-white p-5">
      {transactions.length !== 0 ? (
        <>
          <h3 className="text-2xl text-center">
            Total Transactions: <strong>{transactions.length}</strong>
          </h3>
          <ol className="list-inside list-decimal">
            {transactions.map((transaction, index) => {
              let _randomNumber = transaction.sellerName.split(" ");

              const random =
                _randomNumber[0].length > 5 ? 5 : _randomNumber[0].length;

              return (
                <li key={index} className=" flex place-items-center">
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
                  <span className="flex place-items-center">
                    ||
                    {[
                      ...Array(random)
                        .fill("")
                        .map((v, index) => (
                          <AiFillStar key={index} size={17} color={"gold"} />
                        )),
                    ]}
                  </span>
                </li>
              );
            })}
          </ol>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Transactions;
