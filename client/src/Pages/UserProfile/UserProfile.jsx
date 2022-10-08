import { Card } from "flowbite-react/lib/cjs/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../actions/userActions";
import { firstLetterUpper } from "../../service/userService";

import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import UserProfileTransactionList from "../../Components/UserProfile/UserProfileTransactionList";
import UserProfileReviews from "../../Components/UserProfile/UserProfileReviews";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUserByIdReducer);

  const { user, loading, error } = getUser;

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);
  return (
    <div>
      {error && <p>Something went wrong...</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <>
            <div className="grid grid-cols-3 gap-4 lg:mt-10">
              <div>
                <div className="max-w-sm mb-5">
                  <Card>
                    <div className="flex flex-col items-center pb-10">
                      <img
                        className="mb-3 h-24 w-24 rounded-full shadow-xl"
                        src={user.imagePhotoURL}
                        alt={user.name}
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {user.emailVerified ? (
                          <div className="flex place-items-center">
                            <MdVerified
                              size={20}
                              color={"orange"}
                              className="mr-1"
                            />
                            Semi-Verified
                          </div>
                        ) : (
                          <div className="flex place-items-center">
                            <VscUnverified size={20} className="mr-1" />
                            Not-Verified
                          </div>
                        )}
                      </span>
                      <h5 className="mb-1 text-xl flex text-center font-medium text-gray-900 dark:text-white">
                        {firstLetterUpper(user.name)}
                      </h5>

                      <span className="text-sm text-gray-500 dark:text-gray-400 ">
                        {user.email}
                      </span>
                      <div className="mt-4 flex space-x-3 lg:mt-6">
                        <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
                          Message
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <UserProfileTransactionList />
              </div>
              <div className="col-span-2 mt-24">
                <UserProfileReviews user={user} />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default UserProfile;
