import React, { useEffect, useState } from "react";
import axios from "axios";
const AllUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/users/getAllUser")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="h-screen z-50 absolute top-0 bg-white w-full p-5">
      <div className="text-center text-2xl">
        Total User(s): <strong>{users.length}</strong>
      </div>
      <ol className="list-decimal list-inside">
        {users.map((user) => (
          <li key={user._id} className="capitalize flex place-items-center">
            {user.name}

            <span className="text-sm text-gray-500 ml-3 mr-1">
              ({user.emailVerified ? "Semi-Verified" : "Not-Verified"})
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AllUser;
