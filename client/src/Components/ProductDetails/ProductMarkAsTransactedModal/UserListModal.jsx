import React, { useState } from "react";

import { Modal, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../../actions/userActions";

import { IoCloseCircleOutline } from "react-icons/io5";
import { markAstransactedPopUpWithBuyerInApp } from "../../../firebase/transactionHelper";

const UserListModal = ({ onCloseModal, show, product }) => {
  //searching
  const [userSearch, setUserSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const [userSelected, setUserSelected] = useState(null);

  const userQuery = useSelector((state) => state.searchUserReducer);
  const { users, loading } = userQuery;

  const dispatch = useDispatch();
  const userSearchHandler = (e) => {
    const query = e.target.value;
    setUserSearch(query);

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        if (query.toString().trim() !== "") {
          dispatch(searchUser(query));
        }
      }, 500)
    );
  };

  const onConfirm = () => {
    markAstransactedPopUpWithBuyerInApp(
      product._id,
      userSelected._id,
      product.userId,
      dispatch
    );
  };

  return (
    <Modal show={show} size="md" popup={true} onClose={onCloseModal}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Find the User
          </h3>

          <div>
            <TextInput
              id="text"
              placeholder="name..."
              required={true}
              value={userSearch}
              onChange={userSearchHandler}
            />

            {/* User List */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              users &&
              product &&
              userSearch.length !== 0 &&
              (users.length !== 0 ? (
                <div className="h-[20vh] overflow-auto mt-2">
                  {users
                    .filter((user) => user._id !== product.userId)
                    .map((user) => (
                      <div
                        key={user._id}
                        className="flex place-items-center bg-gray-200 py-1 px-2 rounded-lg mb-2 hover:cursor-pointer hover:bg-gray-400"
                        onClick={() => {
                          setUserSearch("");
                          setUserSelected(user);
                        }}
                      >
                        <img
                          src={user.imagePhotoURL}
                          alt={user.name}
                          className="h-10 w-10 rounded-full "
                        />
                        <div className="px-1"></div>
                        <div>
                          <p className="capitalize">{user.name}</p>{" "}
                          <p>{user.email}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>No user found...</p>
              ))
            )}
            {/* Show User Selected */}
            {userSelected && userSearch.length === 0 && (
              <div className="flex place-items-center justify-between bg-gray-200 py-1 px-2 rounded-lg mt-2">
                <div className="flex place-items-center ">
                  <img
                    src={userSelected.imagePhotoURL}
                    alt={userSelected.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="px-1"></div>
                  <div>
                    <p
                      className="capitalize hover:text-red-500 w-fit cursor-pointer"
                      onClick={() =>
                        window.open(`/user/${userSelected._id}`, "_blank")
                      }
                    >
                      {userSelected.name}
                    </p>{" "}
                    <p>{userSelected.email}</p>
                  </div>
                </div>
                <IoCloseCircleOutline
                  size={25}
                  onClick={() => setUserSelected(null)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className={`px-5 py-2 hover:bg-gray-200 border ${
                !userSelected && "text-gray-300"
              }`}
              disabled={userSelected ? false : true}
              onClick={onConfirm}
            >
              Confirm
            </button>
            <div className="px-2"></div>
            <button
              className="px-5 py-2 hover:bg-gray-200 border"
              onClick={onCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserListModal;
