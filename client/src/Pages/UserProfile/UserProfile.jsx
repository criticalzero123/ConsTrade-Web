import { Card, Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../actions/userActions";

import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import UserProfileTransactionList from "../../Components/UserProfile/UserProfileTransactionList";
import UserProfileReviews from "../../Components/UserProfile/UserProfileReviews";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMessage, AiFillStar } from "react-icons/ai";
import UserProfileInfo from "../../Components/UserProfile/UserProfileInfo";
import UserProfilePosts from "../../Components/UserProfile/Posts/UserProfilePosts";
import FollowUserProfile from "../../Components/UserProfile/Follow/FollowUserProfile";

const UserProfile = () => {
  const [countFollower, setCountFollower] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUserByIdReducer);
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const { user, loading, error } = getUser;

  useEffect(() => {
    if (user) {
      setCountFollower(user.countFollower);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch, currentUser._id]);

  return (
    <div className="container mx-auto px-0 lg:px-4">
      {error && <p>Something went wrong...</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <>
            <div className="flex justify-center flex-wrap md:grid md:grid-cols-3 gap-4 lg:gap-0 lg:mt-10 h-[90vh] lg:h-[88vh]">
              <div>
                <div className="max-w-sm mb-5  md:block">
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
                      <h5 className="mb-2 text-xl flex text-center font-medium text-gray-900 dark:text-white capitalize">
                        {user.name}
                      </h5>
                      <div className="grid grid-cols-2  w-full text-center border-t pt-2 mx-3 border-t-gray-100">
                        <div className="flex flex-col">
                          <div className="w-full  flex justify-center">
                            <p className="font-poppins">Follower</p>
                          </div>

                          <div className="w-full  flex justify-center">
                            <p className="text-gray-500 hover:text-orange-500 cursor-pointer  max-w-fit">
                              {countFollower}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="w-full  flex justify-center">
                            <p className="font-poppins">Following</p>
                          </div>

                          <div className="w-full  flex justify-center">
                            <p className="text-gray-500 hover:text-orange-500 cursor-pointer  max-w-fit">
                              {user.countFollowing ? user.countFollowing : 0}
                            </p>
                          </div>
                        </div>
                      </div>

                      {currentUser._id !== id && (
                        <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-6 w-full px-10 md:px-0 lg:px-10">
                          <Link
                            to={`/messages/user/${user._id}`}
                            className="flex cursor-pointer justify-center place-items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                          >
                            <AiOutlineMessage className="mr-2" size={20} />
                            Message
                          </Link>
                          <FollowUserProfile
                            id={id}
                            currentUserId={currentUser._id}
                            user={user}
                            onFollowAction={() =>
                              setCountFollower(countFollower + 1)
                            }
                            onUnFollowAction={() =>
                              setCountFollower(countFollower - 1)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
              <div className="col-span-2 shadow-lg md:h-[88vh] h-screen w-full">
                <Tabs.Group>
                  <Tabs.Item title="Profile" icon={FaUserCircle}>
                    <UserProfileInfo user={user} />
                  </Tabs.Item>
                  <Tabs.Item title="Products" icon={BsFileEarmarkPost}>
                    <UserProfilePosts user={user} />
                  </Tabs.Item>
                  <Tabs.Item title="Transactions" icon={GrTransaction}>
                    <UserProfileTransactionList userId={user._id} />
                  </Tabs.Item>
                  <Tabs.Item title="Reviews" icon={AiFillStar}>
                    <UserProfileReviews user={user} />
                  </Tabs.Item>
                </Tabs.Group>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default UserProfile;
