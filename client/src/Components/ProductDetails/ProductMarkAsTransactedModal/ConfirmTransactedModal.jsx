import React, { useState } from "react";

import { Modal } from "flowbite-react";
import UserListModal from "./UserListModal";

import { useDispatch, useSelector } from "react-redux";
import { markAstransactedPopUpNotApp } from "../../../firebase/transactionHelper";

const ConfirmTransactedModal = ({ show, onCloseModal }) => {
  const [showUserList, setShowUserList] = useState(false);

  const getProduct = useSelector((state) => state.getProductByIdReducer);
  const { product } = getProduct;

  const dispatch = useDispatch();

  const handleYesClick = () => {
    setShowUserList(!showUserList);
  };

  const handleNoClick = () => {
    markAstransactedPopUpNotApp(product._id, product.userId, dispatch);
  };

  return (
    <div>
      <Modal show={show} size="md" popup={true} onClose={onCloseModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-5 pb-4 sm:pb-6 lg:px-5 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Does the transaction made in the app?
            </h3>
            <div className="flex justify-end">
              <button
                className="px-5 py-2 hover:bg-green-400 border bg-green-500 rounded-lg"
                onClick={handleYesClick}
              >
                Yes
              </button>
              <div className="px-1"></div>
              <button
                className="px-5 py-2 hover:bg-red-400 border bg-red-500 rounded-lg"
                onClick={handleNoClick}
              >
                No
              </button>
              <div className="px-1"></div>
              <button
                className="px-5 py-2 hover:bg-gray-200 border rounded-lg"
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {showUserList && (
        <UserListModal
          show={showUserList}
          onCloseModal={onCloseModal}
          product={product}
        />
      )}
    </div>
  );
};

export default ConfirmTransactedModal;
