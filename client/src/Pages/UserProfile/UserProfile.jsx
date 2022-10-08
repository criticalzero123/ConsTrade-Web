import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../actions/userActions";

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
      {loading ? <p>Loading...</p> : user && <p>{user.name}</p>}
    </div>
  );
};

export default UserProfile;
