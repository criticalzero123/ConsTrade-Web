import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTransactionByUserId } from "../../actions/transactionActions";

const UserProfileTransactionList = ({ userId }) => {
  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector(
    (state) => state.getTransactionByUserIdReducer
  );

  useEffect(() => {
    dispatch(getTransactionByUserId(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      {transactions && transactions.length !== 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Transaction
            </h5>
            <div className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 hover:cursor-pointer">
              View all
            </div>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions &&
                transactions.map((transaction) => (
                  <li className="py-3 sm:py-4" key={transaction.name}>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={transaction.imagePhotoURL}
                          alt={transaction.name}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.name}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {transaction.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        See more
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <div>No Transaction</div>
      )}
    </div>
  );
};

export default UserProfileTransactionList;
